import Link from "next/link";
import { SITE } from "@/data/site";

const SECTIONS = [
  {
    href: "/experience",
    label: "Experience",
    teaser: "Apple, Nutanix, Citylitics — shipping ML data infrastructure and trust systems.",
  },
  {
    href: "/builds",
    label: "Builds",
    teaser: "A pipelined RISC-V CPU, GPU attestation infrastructure, and the projects behind them.",
  },
  {
    href: "/leadership",
    label: "Leadership",
    teaser: "Mentorship cohorts, partnership building, and community across 7+ universities.",
  },
  {
    href: "/creative",
    label: "Creative",
    teaser: "Photography, fashion, sewing, and everything that doesn't fit on a resume.",
  },
];

const STATS = [
  { value: "10,000+", label: "ML training assets validated" },
  { value: "18M+", label: "URLs curated into a gold-standard dataset" },
  { value: "7", label: "universities in a mentoring network" },
  { value: "90%", label: "improvement in participant throughput" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-16 pt-20 sm:px-10 sm:pb-24 sm:pt-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {SITE.role}
        </p>
        <h1 className="max-w-3xl font-serif text-4xl italic leading-tight tracking-tight sm:text-6xl">
          {SITE.tagline}
        </h1>
        <p className="max-w-xl text-base text-muted sm:text-lg">
          UC Berkeley EECS grad ({"'"}25) based in {SITE.location}. I build systems, grow
          communities, and document both along the way — this is where all three live in one
          place.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          {SITE.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-card/60">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4 sm:px-10">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl italic text-accent sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-6 py-16 sm:grid-cols-2 sm:px-10 sm:py-24">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group flex flex-col justify-between gap-8 rounded-2xl border border-line bg-card/40 p-8 transition-colors hover:border-accent"
          >
            <div>
              <h2 className="font-serif text-2xl italic">{section.label}</h2>
              <p className="mt-3 text-sm text-muted">{section.teaser}</p>
            </div>
            <span className="text-sm font-mono text-accent opacity-0 transition-opacity group-hover:opacity-100">
              view →
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
