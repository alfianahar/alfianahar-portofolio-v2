"use client";

import { useEffect, useState } from "react";
import { heroRoles } from "@content/hero-roles";

export function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroRoles.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

  const role = heroRoles[index];

  return (
    <span className="inline-flex min-w-[17rem] items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--text-primary)] px-4 py-3 text-left text-[var(--background)] shadow-[0_18px_60px_rgba(0,0,0,0.16)] sm:min-w-[20rem]">
      <span className="text-xs font-medium uppercase tracking-[0.2em] opacity-70">Currently</span>
      <span className="flex items-baseline gap-2 whitespace-nowrap font-semibold">
        <span>{role.fun}</span>
        <span className="text-xs font-medium opacity-60">/{role.real}</span>
      </span>
      <span className="sr-only">{heroRoles.map((item) => item.fun).join(", ")}</span>
    </span>
  );
}
