"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { forceSimulation, forceCollide, forceManyBody, forceX, forceY } from "d3-force";
import clsx from "clsx";
import Placeholder from "./Placeholder";
import type { GalleryItem } from "@/data/leadership";

type SimNode = GalleryItem & { x: number; y: number; vx?: number; vy?: number };

function layoutCluster(items: GalleryItem[], width: number, height: number) {
  const nodes: SimNode[] = items.map((item) => ({
    ...item,
    x: width / 2 + (Math.random() - 0.5) * width * 0.2,
    y: height / 2 + (Math.random() - 0.5) * height * 0.2,
  }));

  const sim = forceSimulation(nodes)
    .force("x", forceX(width / 2).strength(0.08))
    .force("y", forceY(height / 2).strength(0.08))
    .force("charge", forceManyBody().strength(-140))
    .force("collide", forceCollide(56))
    .stop();

  for (let i = 0; i < 200; i += 1) sim.tick();

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

  const clustered = useMemo(() => {
    if (!selectedTag) return [];
    const filtered = items.filter((i) => i.tags.includes(selectedTag));
    return layoutCluster(filtered, size.width, size.height);
  }, [selectedTag, items, size.width, size.height]);

  const clusteredMap = new Map(clustered.map((n) => [n.id, n]));
  const dark = Boolean(selectedTag);

  const centroid = clustered.length
    ? {
        x: clustered.reduce((sum, n) => sum + n.px, 0) / clustered.length,
        y: clustered.reduce((sum, n) => sum + n.py, 0) / clustered.length,
      }
    : null;

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative h-[70vh] min-h-[480px] w-full overflow-hidden rounded-2xl border transition-colors duration-500",
        dark ? "border-white/10 bg-[#0b0a08]" : "border-line bg-card/30"
      )}
    >
      {dark && centroid && (
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          {clustered.map((n) => (
            <line
              key={n.id}
              x1={`${centroid.x}%`}
              y1={`${centroid.y}%`}
              x2={`${n.px}%`}
              y2={`${n.py}%`}
              stroke="#c8511b"
              strokeWidth={1}
              strokeOpacity={0.55}
            />
          ))}
        </svg>
      )}

      {items.map((item) => {
        const node = clusteredMap.get(item.id);
        const inCluster = Boolean(node);
        const x = dark ? (node ? node.px : item.x) : item.x;
        const y = dark ? (node ? node.py : item.y) : item.y;
        const dimmed = dark && !inCluster;

        return (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setFocused(item)}
            aria-label={`Open ${item.title}`}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: 0, top: 0 }}
            animate={{
              left: `${x}%`,
              top: `${y}%`,
              opacity: dimmed ? 0.08 : 1,
              scale: dimmed ? 0.8 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            whileHover={dimmed ? undefined : { scale: 1.08 }}
          >
            <Placeholder hue={item.hue} className="h-16 w-20 rounded-lg shadow-lg sm:h-20 sm:w-28" />
          </motion.button>
        );
      })}

      <AnimatePresence>
        {dark && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTag(null)}
            className="absolute right-4 top-4 rounded-full border border-white/20 px-3 py-1 text-xs text-white/80 hover:border-white/50 hover:text-white"
          >
            close ×
          </motion.button>
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 overflow-x-auto px-4 py-4 sm:justify-center">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={clsx(
              "shrink-0 rounded-full border px-4 py-1.5 text-xs font-mono transition-colors sm:text-sm",
              selectedTag === tag
                ? "border-accent bg-accent text-white"
                : dark
                ? "border-white/20 text-white/70 hover:border-white/50"
                : "border-line text-foreground/70 hover:border-accent hover:text-accent"
            )}
          >
            {tag}
          </button>
        ))}
        <button
          onClick={() => setAboutOpen(true)}
          aria-label="About this gallery"
          className={clsx(
            "ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs",
            dark ? "border-white/20 text-white/70" : "border-line text-foreground/70"
          )}
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
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
            onClick={() => setFocused(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-background p-6 text-foreground"
            >
              <Placeholder hue={focused.hue} className="h-40 w-full rounded-xl" />
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
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
            onClick={() => setAboutOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl bg-background p-8 text-foreground"
            >
              <h3 className="font-serif text-2xl italic">About this gallery</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                Every node here is a real chapter of leadership, mentorship, or community — from
                partnership building at Intern Ship to a cross-institutional NSF mentoring network
                spanning 7 universities. Select a tag to see how these chapters connect.
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
