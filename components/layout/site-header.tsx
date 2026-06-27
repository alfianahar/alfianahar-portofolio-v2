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
    <>
      <header className="sticky top-0 z-40 bg-(--background)/80 shadow-[inset_0_-1px_0_0_var(--border)] backdrop-blur-xl">
        <Container
          size="wide"
          className="relative grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6"
        >
          <a href="/" className="flex items-center gap-2 sm:gap-3" aria-label="Go to homepage">
            <LogoMark priority size={36} />
            <span className="text-base font-bold tracking-[-0.03em] text-(--text-primary) sm:text-lg md:text-xl">
              {profile.displayName}
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-base font-semibold text-(--text-primary) sm:flex md:gap-10 md:text-lg">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative transition hover:text-(--text-secondary)"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="/bio"
            className="hidden h-9 items-center justify-center justify-self-end rounded-sm border border-(--border) bg-(--surface-elevated) px-4 text-sm font-medium text-(--text-primary) backdrop-blur-xl transition duration-200 ease-out hover:text-(--text-primary) sm:inline-flex"
          >
            Biopage
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center overflow-hidden rounded-sm border border-(--border) bg-(--surface-elevated) text-(--text-primary) backdrop-blur-xl sm:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
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
      </header>

      <div
        id="mobile-nav-panel"
        aria-hidden={!open}
        className={`fixed inset-0 z-30 flex flex-col bg-(--background)/40 backdrop-blur-xl transition-opacity duration-300 sm:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="h-20" />

        <Container
          size="wide"
          className="flex flex-1 flex-col items-center justify-center gap-8 py-8"
        >
          {navigationItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
              className={`text-4xl font-semibold tracking-[-0.03em] text-(--text-primary) transition-all duration-500 ease-out ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/bio"
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${80 + navigationItems.length * 40}ms` : "0ms" }}
            className={`mt-6 ${buttonClassName({
              variant: "brutal",
              size: "md",
            })} transition-all duration-500 ease-out ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Biopage
            <span aria-hidden="true">↗</span>
          </a>
        </Container>

        <div className="border-t border-(--border)/50 px-6 py-5 text-xs text-(--text-tertiary)">
          <Container size="wide" className="flex items-center justify-between">
            <span>{profile.email}</span>
            <span>© {new Date().getFullYear()}</span>
          </Container>
        </div>
      </div>
    </>
  );
}
