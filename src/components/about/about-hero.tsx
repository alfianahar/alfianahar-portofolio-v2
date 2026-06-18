import { profile } from "../../content/profile";
import { socialLinks } from "../../content/social-links";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";
import { AvatarArt } from "./avatar-art";
import { ContactCard } from "./contact-card";

const buildAreas = [
  "AI-assisted workflows",
  "Modern web applications",
  "Product interface systems",
  "Maintainable implementation plans",
];

export function AboutHero() {
  return (
    <section className="bg-[var(--background)] py-20 sm:py-28">
      <Container size="wide" className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <AvatarArt />

        <div className="space-y-8">
          <SectionHeading
            eyebrow="About"
            title="I turn rough product ideas into clear, usable systems."
            description={profile.bio}
          />

          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]">
            <h2 className="text-xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
              What Alfian builds
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {buildAreas.map((area) => (
                <div
                  key={area}
                  className="rounded-2xl bg-[var(--muted-surface)] p-4 text-sm font-medium text-[var(--text-secondary)]"
                >
                  {area}
                </div>
              ))}
            </div>
          </div>

          <ContactCard profile={profile} socialLinks={socialLinks} />
        </div>
      </Container>
    </section>
  );
}
