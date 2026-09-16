import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Builds | Beia Cabrera Sanchez",
};

export default function BuildsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Builds</p>
      <h1 className="mt-4 font-serif text-4xl italic sm:text-5xl">Things I{"'"}ve made.</h1>
      <p className="mt-4 max-w-xl text-muted">
        From a pipelined CPU to trust infrastructure securing GPU workloads: the projects I{"'"}ve
        built, broken, and rebuilt.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <div key={project.slug} className="flex flex-col gap-3 rounded-2xl border border-line p-6">
            <p className="font-mono text-xs text-muted">{project.period}</p>
            <h3 className="font-serif text-xl italic">{project.title}</h3>
            <p className="text-sm text-foreground/90">{project.summary}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.stack.map((s) => (
                <span key={s} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
                  {s}
                </span>
              ))}
            </div>
            <ul className="flex flex-col gap-2 pt-2 text-sm text-foreground/80">
              {project.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline"
              >
                View on GitHub ↗
              </a>
            )}

            {project.proof?.images && project.proof.images.length > 0 && (
              <div className="mt-2 flex flex-col gap-2">
                {project.proof.images.map((img) => (
                  <a
                    key={img.src}
                    href={img.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-lg border border-line bg-background"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.alt} className="w-full object-contain" />
                  </a>
                ))}
              </div>
            )}

            {project.proof?.videos && project.proof.videos.length > 0 && (
              <div className="mt-2 flex flex-col gap-2">
                {project.proof.videos.map((v) => (
                  <div key={v.src} className="overflow-hidden rounded-lg border border-line bg-background">
                    <video src={v.src} controls playsInline className="w-full" />
                    {v.caption && <p className="px-3 py-2 text-xs text-muted">{v.caption}</p>}
                  </div>
                ))}
              </div>
            )}

            {project.proof?.documents && project.proof.documents.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-3">
                {project.proof.documents.map((doc) => (
                  <a
                    key={doc.href}
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-accent hover:underline"
                  >
                    {doc.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
