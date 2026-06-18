import type { Project, ProjectFilter } from "../types/content";

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((left, right) => left.localeCompare(right));
}

export function getUniqueProjectTags(projects: Project[]): string[] {
  return uniqueSorted(projects.flatMap((project) => project.tags));
}

export function getUniqueProjectTypes(projects: Project[]): string[] {
  return uniqueSorted(projects.map((project) => project.type));
}

export function getUniqueProjectPositions(projects: Project[]): string[] {
  return uniqueSorted(projects.flatMap((project) => project.position));
}

export function filterProjects(projects: Project[], filter: ProjectFilter): Project[] {
  if (filter.kind === "all" || !filter.value) {
    return projects;
  }

  if (filter.kind === "tag") {
    return projects.filter((project) => project.tags.includes(filter.value as string));
  }

  if (filter.kind === "type") {
    return projects.filter((project) => project.type === filter.value);
  }

  return projects.filter((project) => project.position.includes(filter.value as string));
}
