import type { Profile, SocialLink } from "@app-types/content";

type ContactCardProps = {
  profile: Profile;
  socialLinks: SocialLink[];
};

const whatsappHref = "https://wa.me/6285725359530";

function SocialIcon({ label }: { label: string }) {
  if (label === "GitHub") {
    return (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.18-3.37-1.18a2.65 2.65 0 0 0-1.11-1.46c-.91-.62.07-.61.07-.61a2.1 2.1 0 0 1 1.53 1.03 2.13 2.13 0 0 0 2.91.83 2.14 2.14 0 0 1 .64-1.34c-2.22-.25-4.56-1.11-4.56-4.94a3.87 3.87 0 0 1 1.03-2.68 3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.47 9.47 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64a3.86 3.86 0 0 1 1.03 2.68c0 3.84-2.34 4.69-4.57 4.94a2.39 2.39 0 0 1 .68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.94 8.99H3.86V20h3.08V8.99ZM5.4 4a1.79 1.79 0 1 0 0 3.58A1.79 1.79 0 0 0 5.4 4Zm14.74 9.9c0-3.06-1.63-4.48-3.8-4.48a3.28 3.28 0 0 0-2.97 1.63h-.04V8.99h-2.95V20h3.07v-5.45c0-1.44.27-2.83 2.05-2.83 1.76 0 1.78 1.64 1.78 2.92V20h3.07l-.01-6.1Z" />
    </svg>
  );
}

export function ContactCard({ profile, socialLinks }: ContactCardProps) {
  return (
    <section
      id="contact"
      className="rounded-[var(--radius-lg)] border-[length:var(--border-bold)] border-[var(--brutal-ink)] bg-[var(--surface)] p-6 text-[var(--text-primary)] shadow-[var(--shadow-hard-sm)]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">Contact</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em]">
        Build something clear, not noisy.
      </h2>
      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
        Based in {profile.location}. Reach out for focused web apps, AI workflow interfaces, or
        product implementation help.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="brutal-press rounded-[var(--radius-sm)] border-[length:var(--border-bold)] border-[var(--brutal-ink)] bg-[var(--cream)] px-5 py-3 text-sm font-semibold text-[var(--brutal-ink)] shadow-[var(--shadow-hard-sm)]"
        >
          Send Email
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="rounded-[var(--radius-sm)] border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--text-primary)]"
        >
          Send me a message
        </a>
        {socialLinks.filter((link) => link.label !== "Instagram").map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            className="grid size-11 place-items-center rounded-[var(--radius-sm)] border border-[var(--border)] text-[var(--text-primary)] transition hover:border-[var(--text-primary)]"
          >
            <SocialIcon label={link.label} />
          </a>
        ))}
      </div>
    </section>
  );
}
