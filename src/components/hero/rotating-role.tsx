"use client";

import { useEffect, useState } from "react";
import { heroRoles } from "../../content/hero-roles";

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
    <span className="inline-flex min-w-[13ch] items-baseline gap-2 whitespace-nowrap font-semibold text-[var(--text-primary)]">
      <span>{role.fun}</span>
      <span className="text-sm font-medium text-[var(--text-muted)]">/{role.real}</span>
      <span className="sr-only">{heroRoles.map((item) => item.fun).join(", ")}</span>
    </span>
  );
}
