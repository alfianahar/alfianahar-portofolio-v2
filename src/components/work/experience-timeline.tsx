import type { Experience } from "../../types/content";
import { SectionHeading } from "../ui/section-heading";

type ExperienceTimelineProps = {
  experiences: Experience[];
};

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
      <SectionHeading
        eyebrow="Experience"
        title="Responsibility over resume padding."
        description="Only relevant, shareable experience belongs here. Private work stays sanitized until it can be shown clearly."
      />

      {experiences.length > 0 ? (
        <div className="mt-8 space-y-5">
          {experiences.map((experience) => (
            <article
              key={`${experience.company}-${experience.period}`}
              className="rounded-3xl bg-[var(--muted-surface)] p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {experience.role}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">{experience.company}</p>
                </div>
                <p className="text-sm text-[var(--text-muted)]">{experience.period}</p>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
                {experience.summary}
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-[var(--text-secondary)]">
                {experience.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-primary)]"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-3xl bg-[var(--muted-surface)] p-5 text-sm leading-6 text-[var(--text-secondary)]">
          Experience entries are being curated instead of padded with vague claims. Project evidence
          above is the current source of truth.
        </p>
      )}
    </section>
  );
}
