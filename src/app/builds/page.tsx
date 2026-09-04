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
          </div>
        ))}
      </div>
    </div>
  );
}
