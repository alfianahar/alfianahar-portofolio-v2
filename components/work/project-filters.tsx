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
  const isFilterOpen = activeFilter.kind !== "all";
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
    <details
      open={isFilterOpen}
      className="group rounded-lg border border-(--border) bg-(--surface-elevated) p-4 shadow-(--shadow-soft) backdrop-blur-xl"
    >
      <summary className="flex cursor-pointer list-none items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--text-muted) marker:hidden">
        Filter work
        <svg
          className="h-3 w-3 shrink-0 transition-transform group-open:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="mt-4 space-y-4">
        {groups.map((group) => (
          <div key={group.label} className="grid gap-2 sm:grid-cols-[5rem_1fr] sm:items-start">
            <p className="pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-(--text-muted)">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.links.map((link) => (
                <a
                  key={`${link.kind}-${link.value ?? "all"}`}
                  href={link.href}
                  className={cn(
                    "rounded-sm border px-3 py-2 text-sm font-medium transition",
                    isActive(activeFilter, link)
                      ? "border-(--brutal-ink) bg-(--cream) text-(--brutal-ink) shadow-(--shadow-hard-sm)"
                      : "border-(--border) bg-white/70 text-(--text-secondary) hover:border-(--text-primary) hover:text-(--text-primary)",
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}
