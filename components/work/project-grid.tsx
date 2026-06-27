import type { Project } from "@app-types/content";
import { ProjectCard } from "./project-card";

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-(--border) bg-(--surface) p-10 text-center">
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-(--text-primary)">
          No projects match this filter
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-(--text-secondary)">
          The current portfolio content is intentionally small. Reset the filters instead of
          inventing weak filler projects.
        </p>
        <a
          href="/work"
          className="mt-6 inline-flex rounded-full bg-(--text-primary) px-5 py-3 text-sm font-semibold text-(--background)"
        >
          Reset filters
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
