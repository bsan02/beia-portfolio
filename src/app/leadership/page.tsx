import type { Metadata } from "next";
import ClusterGallery from "@/components/ClusterGallery";
import { GALLERY_ITEMS, TAGS } from "@/data/leadership";

export const metadata: Metadata = {
  title: "Leadership — Beia Cabrera Sanchez",
};

export default function LeadershipPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Leadership & Involvement</p>
      <h1 className="mt-4 font-serif text-4xl italic sm:text-5xl">Who I{"'"}ve shown up for.</h1>
      <p className="mt-4 max-w-xl text-muted">
        Scattered below are the clubs, cohorts, and communities I{"'"}ve been part of. Select a tag
        to pull the related chapters into a cluster — everything is connected to something.
      </p>

      <div className="mt-10">
        <ClusterGallery items={GALLERY_ITEMS} tags={TAGS} />
      </div>

      <p className="mt-6 text-xs text-muted">
        Placeholder tiles stand in for real event photos — see the setup guide to drop yours in.
      </p>
    </div>
  );
}
