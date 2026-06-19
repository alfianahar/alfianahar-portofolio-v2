import Link from "next/link";
import { LogoMark } from "@components/brand/logo-mark";
import { Container } from "@components/ui/container";
import { profile } from "@content/profile";
import { socialLinks } from "@content/social-links";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)] py-10">
      <Container
        size="wide"
        className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-4">
          <LogoMark size={36} />
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{profile.name}</p>
            <p className="text-sm text-[var(--text-muted)]">{profile.title}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-[var(--text-secondary)]">
          {socialLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[var(--text-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
