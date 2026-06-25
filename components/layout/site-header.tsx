import { useEffect, useState } from "react";
import { LogoMark } from "@components/brand/logo-mark";
import { buttonClassName } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { navigationItems } from "@content/navigation";
import { profile } from "@content/profile";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // ponytail: close on Esc + lock body scroll while panel is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-[var(--background)]/80 shadow-[inset_0_-1px_0_0_var(--border)] backdrop-blur-xl">
      <Container size="wide" className="flex h-20 items-center justify-between gap-3 sm:gap-6">
        <a href="/" className="flex items-center gap-2 sm:gap-4" aria-label="Go to homepage">
          <LogoMark priority size={36} />
          <span className="text-sm font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-base">
            {profile.displayName}
          </span>
        </a>

        <nav className="hidden items-center gap-3 text-xs text-[var(--text-secondary)] sm:flex md:gap-8">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-[var(--text-primary)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="/bio"
          className="hidden h-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 text-sm font-medium text-[var(--text-primary)] backdrop-blur-xl transition duration-200 ease-out hover:text-[var(--text-primary)] sm:inline-flex"
        >
          Biopage
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-primary)] backdrop-blur-xl sm:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-all duration-300 ease-out ${
              open
                ? "rotate-45 -translate-y-3 scale-50 opacity-0"
                : "rotate-0 translate-y-0 scale-100 opacity-100"
            }`}
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>

          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`absolute transition-all duration-300 ease-out ${
              open
                ? "rotate-0 translate-y-0 scale-100 opacity-100"
                : "-rotate-90 translate-y-3 scale-50 opacity-0"
            }`}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </Container>

      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-x-0 bottom-0 top-20 z-30 bg-[var(--background)]/70 backdrop-blur-sm sm:hidden"
        />
      )}

      <div
        id="mobile-nav-panel"
        className={`absolute inset-x-0 top-full z-40 origin-top overflow-hidden border-b border-[var(--border)] bg-[var(--background)] shadow-[var(--shadow-hard-sm)] transition-[max-height,opacity] duration-200 sm:hidden ${
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <Container size="wide" className="flex flex-col gap-1 py-4">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-[var(--radius-sm)] px-3 py-3 text-base font-medium text-[var(--text-primary)] transition hover:bg-[var(--surface-elevated)]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/bio"
            onClick={() => setOpen(false)}
            className={buttonClassName({
              variant: "brutal",
              size: "md",
              className: "mt-2 w-full",
            })}
          >
            Biopage
            <span aria-hidden="true">↗</span>
          </a>
        </Container>
      </div>
    </header>
  );
}
