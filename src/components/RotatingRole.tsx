"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ROLES = ["Builder", "Creative", "Engineer", "Leader", "Connector", "Founder"];

function articleFor(word: string) {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

export default function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex((i) => (i === ROLES.length - 1 ? 0 : i + 1));
    }, 2200);
    return () => clearTimeout(id);
  }, [index]);

  return (
    <h1 className="max-w-3xl font-serif text-4xl italic leading-tight tracking-tight sm:text-6xl">
      I am {articleFor(ROLES[index])}{" "}
      <span className="relative inline-grid w-[9.5ch] items-baseline overflow-hidden align-baseline">
        <AnimatePresence initial={false}>
          <motion.span
            key={ROLES[index]}
            className="col-start-1 row-start-1 whitespace-nowrap text-accent"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
          >
            {ROLES[index]}.
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}
