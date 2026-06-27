import type { Project } from "@app-types/content";

type ProjectEntry = {
  id?: string;
  slug: string;
  body?: string;
  data: {
    title: string;
    description: string;
    tags: string[];
    role: string;
    position: string[];
    type: string;
    stack: string[];
    cover: { src: string } | string;
    coverAlt: string;
    year?: number;
    status?: string;
    links?: Project["links"];
  };
};

// ponytail: rewrite relative markdown image paths to absolute asset URLs
// so react-markdown (running in the browser island) can resolve them
// ponytail: import.meta.glob is Vite-only; in non-Vite (bun/node) the body
// images keep their original markdown paths (only used in tests)
const assetUrlMap: Record<string, string> = (
  typeof import.meta.glob === "function"
    ? import.meta.glob("../src/assets/**/*.{png,jpg,jpeg,webp,svg,gif}", {
        eager: true,
        query: "?url",
        import: "default",
      })
    : {}
) as Record<string, string>;

function resolveAssetPath(rawPath: string): string | undefined {
  const cleaned = rawPath.replace(/^(?:\.\/|\.\.\/)+/, "");
  for (const [modulePath, url] of Object.entries(assetUrlMap)) {
    if (modulePath.endsWith(`/${cleaned}`)) return url;
  }
  return undefined;
}

function resolveBodyImages(body: string | undefined): string | undefined {
  if (!body) return body;
  return body.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (full, alt, path) => {
    if (/^(https?:|data:|\/)/.test(path)) return full;
    const resolved = resolveAssetPath(path);
    return resolved ? `![${alt}](${resolved})` : full;
  });
}

function coverSrc(cover: ProjectEntry["data"]["cover"]) {
  return typeof cover === "string" ? cover : cover.src;
}

export function mapProjectEntries(entries: ProjectEntry[]): Project[] {
  return entries
    .toSorted((left, right) => {
      const activeLeft = left.data.status === "active" ? 0 : 1;
      const activeRight = right.data.status === "active" ? 0 : 1;
      const statusDiff = activeLeft - activeRight;
      if (statusDiff !== 0) return statusDiff;
      return (right.data.year ?? 0) - (left.data.year ?? 0);
    })
    .map(({ slug, data, body }) => ({
      title: data.title,
      slug,
      description: data.description,
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
      body: resolveBodyImages(body),
      links: data.links,
    }));
}
