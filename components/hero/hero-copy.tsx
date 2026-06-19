import Link from "next/link";
import { buttonClassName } from "@components/ui/button";
import { profile } from "@content/profile";
import { RotatingRole } from "./rotating-role";

export function HeroCopy() {
  return (
    <div className="relative z-10 max-w-3xl">
      <p className="mb-5 inline-flex rounded-full border border-[var(--border)] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)] shadow-sm backdrop-blur">
        {profile.name} / {profile.title}
      </p>
      <h1 className="text-5xl font-semibold tracking-[-0.075em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
        I build AI-powered products and polished web interfaces that feel obvious to use.
      </h1>
      <div className="mt-6 text-xl leading-9 text-[var(--text-secondary)]">
        <p>
          A practical <RotatingRole /> who turns rough ideas into clear systems, fast frontends, and
          maintainable implementation paths.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/work" className={buttonClassName({ size: "lg" })}>
          View selected work
        </Link>
        <Link
          href="/about#contact"
          className={buttonClassName({ variant: "secondary", size: "lg" })}
        >
          Start a conversation
        </Link>
      </div>
    </div>
  );
}
