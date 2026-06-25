import { LogoMark } from "@components/brand/logo-mark";
import { buttonClassName } from "@components/ui/button";
import { Container } from "@components/ui/container";
import { navigationItems } from "@content/navigation";
import { profile } from "@content/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--background)]/80 shadow-[inset_0_-1px_0_0_var(--border)] backdrop-blur-xl">
      <Container size="wide" className="flex h-20 items-center justify-between gap-3 sm:gap-6">
        <a href="/" className="flex items-center gap-2 sm:gap-4" aria-label="Go to homepage">
          <LogoMark priority size={36} />
          <span className="text-sm font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-base">
            {profile.displayName}
          </span>
        </a>

        <nav className="flex items-center gap-3 text-xs text-[var(--text-secondary)] sm:text-sm md:gap-8">
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
          className={buttonClassName({
            variant: "secondary",
            size: "sm",
            className: "px-3 text-xs sm:px-4 sm:text-sm",
          })}
        >
          Biopage
        </a>
      </Container>
    </header>
  );
}
