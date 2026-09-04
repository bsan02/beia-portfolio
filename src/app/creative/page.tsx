import type { Metadata } from "next";
import Placeholder from "@/components/Placeholder";
import { CREATIVE_BLOCKS, CREATIVE_INTRO } from "@/data/creative";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Creative — Beia Cabrera Sanchez",
};

export default function CreativePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Creative & Personal</p>
      <h1 className="mt-4 font-serif text-4xl italic sm:text-5xl">The rest of me.</h1>
      <p className="mt-4 max-w-xl text-muted">{CREATIVE_INTRO}</p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CREATIVE_BLOCKS.map((block) => (
          <div key={block.id} className="flex flex-col overflow-hidden rounded-2xl border border-line">
            <Placeholder hue={block.hue} label={block.id} className="h-48 w-full" />
            <div className="flex flex-col gap-2 p-5">
              <h3 className="font-serif text-lg italic">{block.title}</h3>
              <p className="text-sm text-muted">{block.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-line bg-card/40 p-8 text-center sm:p-12">
        <p className="font-serif text-xl italic sm:text-2xl">
          Follow the creative side on Instagram
        </p>
        <a
          href={SITE.social.find((s) => s.label.includes("Instagram"))?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-full border border-accent px-5 py-2 text-sm text-accent hover:bg-accent hover:text-white"
        >
          @prettycoded
        </a>
      </div>
    </div>
  );
}
