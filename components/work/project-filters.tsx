import type { Project, ProjectFilter } from "@app-types/content";
import {
  getUniqueProjectPositions,
  getUniqueProjectTags,
  getUniqueProjectTypes,
} from "@lib/project-filters";
import { cn } from "@lib/utils";

type ProjectFiltersProps = {
  projects: Project[];
  activeFilter: ProjectFilter;
};

type FilterLink = {
  label: string;
  href: string;
  kind: ProjectFilter["kind"];
  value?: string;
};

function createHref(kind: ProjectFilter["kind"], value?: string) {
  if (kind === "all" || !value) {
    return "/work";
  }

  const params = new URLSearchParams({ kind, value });
  return `/work?${params.toString()}`;
}

function isActive(activeFilter: ProjectFilter, link: FilterLink) {
  if (link.kind === "all") {
    return activeFilter.kind === "all";
  }

  return activeFilter.kind === link.kind && activeFilter.value === link.value;
}

export function ProjectFilters({ projects, activeFilter }: ProjectFiltersProps) {
  const links: FilterLink[] = [
    { label: "All", href: "/work", kind: "all" },
    ...getUniqueProjectTags(projects).map((tag) => ({
      label: tag,
      href: createHref("tag", tag),
      kind: "tag" as const,
      value: tag,
    })),
    ...getUniqueProjectTypes(projects).map((type) => ({
      label: type,
      href: createHref("type", type),
      kind: "type" as const,
      value: type,
    })),
    ...getUniqueProjectPositions(projects).map((position) => ({
      label: position,
      href: createHref("position", position),
      kind: "position" as const,
      value: position,
    })),
  ];

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
        Filter by tag, type, or responsibility
      </p>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <a
            key={`${link.kind}-${link.value ?? "all"}`}
            href={link.href}
            className={cn(
              "rounded-full border px-3 py-2 text-sm font-medium transition",
              isActive(activeFilter, link)
                ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--background)]"
                : "border-[var(--border)] bg-white/70 text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]",
            )}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
