import { Image } from "@components/ui/next-image";
import { Link } from "@components/ui/next-link";
import type { Project } from "@app-types/content";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1">
      <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-[linear-gradient(135deg,var(--muted-surface),#fff)]">
        <Image
          src={project.thumbnail.src}
          alt={project.thumbnail.alt}
          width={160}
          height={110}
          className="h-auto w-24 opacity-90 transition duration-300 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] backdrop-blur">
          {project.type}
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div>
          <p className="text-sm font-medium text-[var(--text-muted)]">{project.role}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.position.map((position) => (
            <span
              key={position}
              className="rounded-full bg-[var(--muted-surface)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
            >
              {position}
            </span>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Stack
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {project.outcome ? (
          <p className="rounded-2xl bg-[var(--muted-surface)] p-4 text-sm leading-6 text-[var(--text-secondary)]">
            {project.outcome}
          </p>
        ) : null}

        {project.links?.live || project.links?.repo || project.links?.caseStudy ? (
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-[var(--text-primary)]">
            {project.links.live ? <Link href={project.links.live}>Live</Link> : null}
            {project.links.repo ? <Link href={project.links.repo}>Repository</Link> : null}
            {project.links.caseStudy ? (
              <Link href={project.links.caseStudy}>Case study</Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
