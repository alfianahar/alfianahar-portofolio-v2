import Link from "next/link";
import { LogoMark } from "../brand/logo-mark";
import { buttonClassName } from "../ui/button";
import { Container } from "../ui/container";
import { navigationItems } from "../../content/navigation";
import { profile } from "../../content/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl">
      <Container size="wide" className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-4" aria-label="Go to homepage">
          <LogoMark priority size={44} />
          <span className="text-sm font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-base">
            {profile.displayName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-[var(--text-secondary)] md:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[var(--text-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/about#contact"
          className={buttonClassName({
            variant: "secondary",
            size: "sm",
            className: "hidden sm:flex",
          })}
        >
          Contact
        </Link>
      </Container>
    </header>
  );
}
