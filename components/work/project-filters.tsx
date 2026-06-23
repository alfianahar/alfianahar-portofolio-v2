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
  const groups: { label: string; links: FilterLink[] }[] = [
    {
      label: "Show",
      links: [{ label: "All", href: "/work", kind: "all" }],
    },
    {
      label: "Type",
      links: getUniqueProjectTypes(projects).map((type) => ({
        label: type,
        href: createHref("type", type),
        kind: "type" as const,
        value: type,
      })),
    },
    {
      label: "Role",
      links: getUniqueProjectPositions(projects).map((position) => ({
        label: position,
        href: createHref("position", position),
        kind: "position" as const,
        value: position,
      })),
    },
    {
      label: "Stack",
      links: getUniqueProjectTags(projects).map((tag) => ({
        label: tag,
        href: createHref("tag", tag),
        kind: "tag" as const,
        value: tag,
      })),
    },
  ];

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
        Filter work
      </p>
      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.label} className="grid gap-2 sm:grid-cols-[5rem_1fr] sm:items-start">
            <p className="pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.links.map((link) => (
                <a
                  key={`${link.kind}-${link.value ?? "all"}`}
                  href={link.href}
                  className={cn(
                    "rounded-[var(--radius-sm)] border px-3 py-2 text-sm font-medium transition",
                    isActive(activeFilter, link)
                      ? "border-[var(--brutal-ink)] bg-[var(--cream)] text-[var(--brutal-ink)] shadow-[var(--shadow-hard-sm)]"
                      : "border-[var(--border)] bg-white/70 text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]",
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
