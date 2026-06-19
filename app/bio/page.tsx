import Link from "next/link";

export default function BioPage() {
  return (
    <div className="grid min-h-dvh place-items-center bg-[var(--background)] px-6 text-center text-[var(--text-primary)]">
      <div className="space-y-4">
        <p className="text-sm font-medium tracking-[0.24em] text-[var(--text-muted)] uppercase">
          Bio
        </p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Bio Page</h1>
        <Link className="inline-flex text-sm font-medium text-[var(--text-secondary)]" href="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
