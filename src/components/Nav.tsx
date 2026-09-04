"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const LINKS = [
  { href: "/experience", label: "Experience" },
  { href: "/builds", label: "Builds" },
  { href: "/leadership", label: "Leadership" },
  { href: "/creative", label: "Creative" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link
          href="/"
          className="font-serif italic text-lg tracking-tight hover:text-accent transition-colors"
        >
          Beia Cabrera Sanchez
        </Link>
        <ul className="flex items-center gap-1 text-sm sm:gap-2">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    "rounded-full px-3 py-1.5 transition-colors sm:px-4",
                    active
                      ? "bg-foreground text-background"
                      : "text-foreground/70 hover:bg-card hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
