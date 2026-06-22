import type { Profile, SocialLink } from "@app-types/content";

type ContactCardProps = {
  profile: Profile;
  socialLinks: SocialLink[];
};

export function ContactCard({ profile, socialLinks }: ContactCardProps) {
  return (
    <section
      id="contact"
      className="rounded-[2rem] border border-[var(--border)] bg-[var(--text-primary)] p-6 text-[var(--background)] shadow-[var(--shadow-soft)]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">Contact</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em]">
        Build something clear, not noisy.
      </h2>
      <p className="mt-3 text-sm leading-6 opacity-75">
        Based in {profile.location}. Reach out for focused web apps, AI workflow interfaces, or
        product implementation help.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full bg-[var(--background)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)]"
        >
          {profile.email}
        </a>
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-[var(--background)]/82 transition hover:bg-white/10"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
