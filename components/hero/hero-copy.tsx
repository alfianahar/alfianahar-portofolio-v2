import Link from "next/link";
import { buttonClassName } from "@components/ui/button";
import { profile } from "@content/profile";
import { RotatingRole } from "./rotating-role";

export function HeroCopy() {
  return (
    <div className="relative z-10 max-w-2xl">
      <p className="mb-4 inline-flex rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] shadow-sm backdrop-blur sm:px-4 sm:py-2 sm:text-xs">
        {profile.name} / {profile.title}
      </p>
      <h1 className="text-4xl font-semibold tracking-[-0.07em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl xl:text-7xl">
        Fullstack engineer building reliable systems.
      </h1>
      <div className="mt-5">
        <RotatingRole />
      </div>
      <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
        I build fullstack web systems with Next.js, Golang, and real-time integrations, while
        deepening practical AI engineering.
      </p>
      <div className="mt-7 flex flex-row gap-3">
        <Link href="/work" className={buttonClassName({ size: "lg" })}>
          View Work
        </Link>
        <Link
          href="/about#contact"
          className={buttonClassName({ variant: "secondary", size: "lg" })}
        >
          Contact Me
        </Link>
      </div>
    </div>
  );
}
