import { LogoMark } from "@components/brand/logo-mark";
import { Container } from "@components/ui/container";
import { profile } from "@content/profile";
import { socialLinks } from "@content/social-links";

export function SiteFooter() {
  return (
    <footer className="border-t border-(--border) bg-(--background) py-10">
      <Container
        size="wide"
        className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-4">
          <LogoMark size={36} />
          <div>
            <p className="text-sm font-semibold text-(--text-primary)">{profile.name}</p>
            <p className="text-sm text-(--text-muted)">{profile.title}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-(--text-secondary)">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-(--text-primary)"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
