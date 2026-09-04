import type { Metadata } from "next";
import { EDUCATION, EXPERIENCE, SKILLS } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience — Beia Cabrera Sanchez",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Professional Experience</p>
      <h1 className="mt-4 font-serif text-4xl italic sm:text-5xl">Where I{"'"}ve built.</h1>

      <ol className="mt-14 flex flex-col gap-14">
        {EXPERIENCE.map((role) => (
          <li key={role.title} className="grid gap-3 border-t border-line pt-8 sm:grid-cols-[220px_1fr] sm:gap-10">
            <div>
              <p className="font-mono text-xs text-muted">{role.period}</p>
              <h2 className="mt-2 font-serif text-xl italic leading-snug">{role.title}</h2>
              <p className="text-sm text-accent">{role.org}</p>
            </div>
            <ul className="flex flex-col gap-3 text-sm leading-relaxed text-foreground/90 sm:text-base">
              {role.bullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-20 grid gap-10 border-t border-line pt-10 sm:grid-cols-[220px_1fr] sm:gap-10">
        <div>
          <p className="font-mono text-xs text-muted">{EDUCATION.graduation}</p>
          <h2 className="mt-2 font-serif text-xl italic leading-snug">{EDUCATION.degree}</h2>
          <p className="text-sm text-accent">{EDUCATION.school}</p>
        </div>
        <div>
          <p className="text-sm text-muted">Relevant coursework</p>
          <p className="mt-1 text-sm">{EDUCATION.coursework.join(" · ")}</p>
        </div>
      </div>

      <div className="mt-16 grid gap-8 border-t border-line pt-10 sm:grid-cols-2">
        <div>
          <p className="text-sm text-muted">Technical skills</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SKILLS.technical.map((s) => (
              <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-muted">Systems & infrastructure</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SKILLS.systems.map((s) => (
              <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
