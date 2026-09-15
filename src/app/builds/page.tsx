import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Builds — Beia Cabrera Sanchez",
};

export default function BuildsPage() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Builds</p>
      <h1 className="mt-4 font-serif text-4xl italic sm:text-5xl">Things I{"'"}ve made.</h1>
      <p className="mt-4 max-w-xl text-muted">
        From a pipelined CPU to trust infrastructure securing GPU workloads — the projects I{"'"}ve
        built, broken, and rebuilt.
      </p>

      {featured.map((project) => (
        <div key={project.slug} className="mt-14 rounded-2xl border border-line bg-card/40 p-8 sm:p-10">
          <p className="font-mono text-xs text-muted">{project.period}</p>
          <h2 className="mt-2 font-serif text-2xl italic sm:text-3xl">{project.title}</h2>
          <p className="mt-3 max-w-2xl text-foreground/90">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs">
                {s}
              </span>
            ))}
          </div>
          <ul className="mt-6 flex flex-col gap-3 text-sm leading-relaxed">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline"
            >
              View on GitHub ↗
            </a>
          )}

          {project.proof?.images && project.proof.images.length > 0 && (
            <div className="mt-8">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">Proof of build</p>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {project.proof.images.map((img) => (
                  <a
                    key={img.src}
                    href={img.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-xl border border-line bg-background"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.alt} className="w-full object-contain" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {project.proof?.documents && project.proof.documents.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
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

      <div className="mt-20 grid gap-6 sm:grid-cols-2">
        {rest.map((project) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}
