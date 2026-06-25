import type { Project } from "@app-types/content";

type ProjectEntry = {
  id?: string;
  slug: string;
  body?: string;
  data: {
    title: string;
    shortDescription: string;
    tags: string[];
    role: string;
    position: string[];
    type: string;
    stack: string[];
    cover: { src: string } | string;
    coverAlt: string;
    year?: number;
    status?: string;
    outcome?: string;
    order?: number;
    links?: Project["links"];
  };
};

function coverSrc(cover: ProjectEntry["data"]["cover"]) {
  return typeof cover === "string" ? cover : cover.src;
}

export function mapProjectEntries(entries: ProjectEntry[]): Project[] {
  return entries
    .toSorted((left, right) => {
      const order = (left.data.order ?? 999) - (right.data.order ?? 999);
      return order || left.data.title.localeCompare(right.data.title);
    })
    .map(({ slug, data, body }) => ({
      title: data.title,
      slug,
      description: data.shortDescription,
      thumbnail: {
        src: coverSrc(data.cover),
        alt: data.coverAlt,
      },
      role: data.role,
      position: data.position,
      type: data.type,
      tags: data.tags,
      stack: data.stack,
      year: data.year,
      status: data.status,
      body,
      outcome: data.outcome,
      links: data.links,
    }));
}
