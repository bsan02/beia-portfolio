"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { forceSimulation, forceCollide, forceManyBody, forceX, forceY } from "d3-force";
import clsx from "clsx";
import Placeholder from "./Placeholder";
import type { GalleryItem } from "@/data/leadership";

type SimNode = GalleryItem & { x: number; y: number; vx?: number; vy?: number };

// Space reserved at the bottom of the canvas for the tag bar, and margins so
// tiles never render underneath it or spill past the edges of the canvas.
const RESERVED_BOTTOM = 110;
const MARGIN_TOP = 20;
const MIN_TILE_H = 36;
const MAX_TILE_H = 84;
const TILE_ASPECT = 1.25; // width / height
const GAP_FACTOR = 1.2; // >1 leaves breathing room between tiles

function computeTileMetrics(count: number, width: number, height: number) {
  const usableW = Math.max(width - 40, 150);
  const usableH = Math.max(height - RESERVED_BOTTOM - MARGIN_TOP, 150);
  const area = usableW * usableH;
  const perItem = area / Math.max(count, 1);
  const idealRadius = Math.sqrt(perItem / (2 * Math.sqrt(3) * GAP_FACTOR));
  let h = idealRadius / 0.8;
  h = Math.min(Math.max(h, MIN_TILE_H), MAX_TILE_H);
  const w = h * TILE_ASPECT;
  const radius = Math.hypot(w / 2, h / 2);
  return { w, h, radius };
}

function layoutNodes(items: GalleryItem[], width: number, height: number, radius: number) {
  const minX = radius;
  const maxX = Math.max(width - radius, minX + 1);
  const minY = Math.max(radius * 0.7, 16);
  const maxY = Math.max(height - RESERVED_BOTTOM - radius * 0.7, minY + 1);
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  const nodes: SimNode[] = items.map((item) => ({
    ...item,
    x: centerX + (Math.random() - 0.5) * (maxX - minX) * 0.9,
    y: centerY + (Math.random() - 0.5) * (maxY - minY) * 0.9,
  }));

  const sim = forceSimulation(nodes)
    .force("x", forceX(centerX).strength(0.05))
    .force("y", forceY(centerY).strength(0.05))
    .force("charge", forceManyBody().strength(-60))
    .force("collide", forceCollide(radius))
    .stop();

  for (let i = 0; i < 240; i += 1) {
    sim.tick();
    for (const n of nodes) {
      n.x = Math.min(Math.max(n.x, minX), maxX);
      n.y = Math.min(Math.max(n.y, minY), maxY);
    }
  }

  return nodes.map((n) => ({
    ...n,
    px: (n.x / width) * 100,
    py: (n.y / height) * 100,
  }));
}

export default function ClusterGallery({
  items,
  tags,
}: {
  items: GalleryItem[];
  tags: string[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 900, height: 480 });
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [focused, setFocused] = useState<GalleryItem | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const allMetrics = useMemo(
    () => computeTileMetrics(items.length, size.width, size.height),
    [items.length, size.width, size.height]
  );
  const allLayout = useMemo(
    () => layoutNodes(items, size.width, size.height, allMetrics.radius),
    [items, size.width, size.height, allMetrics.radius]
  );
  const allLayoutMap = new Map(allLayout.map((n) => [n.id, n]));

  const filteredForTag = useMemo(
    () => (selectedTag ? items.filter((i) => i.tags.includes(selectedTag)) : []),
    [items, selectedTag]
  );
  const clusterMetrics = useMemo(
    () => computeTileMetrics(filteredForTag.length || 1, size.width, size.height),
    [filteredForTag.length, size.width, size.height]
  );
  const clustered = useMemo(
    () =>
      selectedTag ? layoutNodes(filteredForTag, size.width, size.height, clusterMetrics.radius) : [],
    [selectedTag, filteredForTag, size.width, size.height, clusterMetrics.radius]
  );

  const clusteredMap = new Map(clustered.map((n) => [n.id, n]));
  const active = Boolean(selectedTag);

  const centroid = clustered.length
    ? {
        x: clustered.reduce((sum, n) => sum + n.px, 0) / clustered.length,
        y: clustered.reduce((sum, n) => sum + n.py, 0) / clustered.length,
      }
    : null;

  return (
    <div
      ref={containerRef}
      className="relative h-[70vh] min-h-[480px] w-full overflow-hidden rounded-2xl border border-line bg-card/30"
    >
      {active && centroid && (
        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full">
          {clustered.map((n) => (
            <line
              key={n.id}
              x1={`${centroid.x}%`}
              y1={`${centroid.y}%`}
              x2={`${n.px}%`}
              y2={`${n.py}%`}
              stroke="#c8511b"
              strokeWidth={1}
              strokeOpacity={0.4}
            />
          ))}
        </svg>
      )}

      {items.map((item) => {
        const clusterNode = clusteredMap.get(item.id);
        const inCluster = Boolean(clusterNode);
        const fallback = allLayoutMap.get(item.id);
        const x = clusterNode ? clusterNode.px : fallback ? fallback.px : item.x;
        const y = clusterNode ? clusterNode.py : fallback ? fallback.py : item.y;
        const dimmed = active && !inCluster;
        const metrics = inCluster ? clusterMetrics : allMetrics;
        const isHovered = hoveredId === item.id;

        return (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setFocused(item)}
            onHoverStart={() => setHoveredId(item.id)}
            onHoverEnd={() => setHoveredId((current) => (current === item.id ? null : current))}
            onFocus={() => setHoveredId(item.id)}
            onBlur={() => setHoveredId((current) => (current === item.id ? null : current))}
            aria-label={`Open ${item.title}`}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: 0, top: 0, zIndex: isHovered ? 10 : 1 }}
            animate={{
              left: `${x}%`,
              top: `${y}%`,
              width: metrics.w,
              height: metrics.h,
              opacity: dimmed ? 0.12 : 1,
              scale: dimmed ? 0.85 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            whileHover={dimmed ? undefined : { scale: 1.06 }}
          >
            <Placeholder
              hue={item.hue}
              src={item.image}
              alt={item.title}
              className="h-full w-full rounded-lg shadow-lg"
            />
          </motion.button>
        );
      })}

      <AnimatePresence>
        {active && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTag(null)}
            className="absolute right-4 top-4 z-20 rounded-full border border-line bg-background/90 px-3 py-1 text-xs text-foreground/70 hover:border-accent hover:text-accent"
          >
            close ×
          </motion.button>
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center gap-2 overflow-x-auto bg-gradient-to-t from-background via-background/95 to-transparent px-4 pb-4 pt-8 sm:justify-center">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={clsx(
              "shrink-0 rounded-full border px-4 py-1.5 text-xs font-mono transition-colors sm:text-sm",
              selectedTag === tag
                ? "border-accent bg-accent text-white"
                : "border-line text-foreground/70 hover:border-accent hover:text-accent"
            )}
          >
            {tag}
          </button>
        ))}
        <button
          onClick={() => setAboutOpen(true)}
          aria-label="About this gallery"
          className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-xs text-foreground/70"
        >
          i
        </button>
      </div>

      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
            onClick={() => setFocused(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full w-full max-w-md flex-col overflow-y-auto rounded-2xl bg-background p-6 text-foreground"
            >
              {focused.image ? (
                <Placeholder
                  hue={focused.hue}
                  src={focused.image}
                  alt={focused.title}
                  fit="contain"
                  className="h-[50vh] w-full rounded-xl bg-black/5"
                />
              ) : (
                <Placeholder hue={focused.hue} className="h-40 w-full rounded-xl" />
              )}
              <h3 className="mt-4 font-serif text-2xl italic">{focused.title}</h3>
              <p className="text-sm text-accent">
                {focused.org} · {focused.period}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">{focused.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {focused.tags.map((t) => (
                  <span key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
                    {t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setFocused(null)}
                className="mt-6 text-sm font-mono text-muted hover:text-accent"
              >
                close ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aboutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
            onClick={() => setAboutOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-background p-8 text-foreground"
            >
              <h3 className="font-serif text-2xl italic">About this gallery</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                Every node here is a real chapter — conferences, community work, teaching,
                internships, and hands-on projects. Select a tag to see how these chapters
                connect.
              </p>
              <p className="mt-4 text-xs text-muted">Tags: {tags.join(", ")}</p>
              <button
                onClick={() => setAboutOpen(false)}
                className="mt-6 text-sm font-mono text-muted hover:text-accent"
              >
                close ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
