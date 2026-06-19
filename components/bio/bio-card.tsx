import { LogoMark } from "@components/brand/logo-mark";
import { profile } from "@content/profile";
import { socialLinks } from "@content/social-links";

export function BioCard() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-8">
      <div className="absolute -right-16 -top-20 size-44 rounded-full bg-[#d5ccff]/20 blur-3xl" />
      <div className="absolute -bottom-24 left-10 size-52 rounded-full bg-[#7cb8fc]/20 blur-3xl" />

      <div className="relative flex items-start justify-between gap-6">
        <div className="grid size-20 place-items-center rounded-[1.6rem] border border-white/10 bg-white/90 shadow-[0_24px_80px_rgba(124,184,252,0.24)]">
          <LogoMark priority size={54} />
        </div>
        <p className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
          {profile.location}
        </p>
      </div>

      <div className="relative mt-8">
        <p className="text-sm font-medium tracking-[0.28em] text-[#7cb8fc] uppercase">
          Link in bio
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-[var(--text-primary)] sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-3 text-base font-medium text-[var(--text-secondary)]">{profile.title}</p>
        <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
          {profile.bio}
        </p>
      </div>

      <div className="relative mt-7 grid gap-3 sm:grid-cols-3">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm transition hover:border-white/30 hover:bg-white/[0.1]"
          >
            <span className="block font-semibold text-[var(--text-primary)]">{link.label}</span>
            {link.username ? (
              <span className="mt-1 block text-xs text-[var(--text-muted)]">@{link.username}</span>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  );
}
