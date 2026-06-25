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
          className="relative grid h-11 w-11 place-items-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-primary)] backdrop-blur-xl sm:hidden"
        >
          <span aria-hidden="true" className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-200 ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-full bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-full bg-current transition-transform duration-200 ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </span>
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
              variant: "secondary",
              size: "md",
              className: "mt-2 w-full",
            })}
          >
            Biopage
          </a>
        </Container>
      </div>
    </header>
  );
}
