import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { Project } from "@app-types/content";
import { ProjectGrid } from "./project-grid";

const projects: Project[] = [
  {
    title: "Portfolio V2",
    slug: "portfolio-v2",
    description: "Portfolio built from Markdown content.",
    thumbnail: {
      src: "/_astro/cover.hash.svg",
      alt: "Portfolio V2 preview",
    },
    role: "Designer & Developer",
    position: ["personal", "lead"],
    type: "from scratch",
    tags: ["Portfolio", "Astro"],
    stack: ["Astro", "React", "Tailwind CSS"],
  },
];

describe("ProjectGrid", () => {
  test("renders project cards from structured content", () => {
    const html = renderToStaticMarkup(<ProjectGrid projects={projects} />);

    expect(html).toContain("Portfolio V2");
    expect(html).toContain("Designer &amp; Developer");
    expect(html).toContain("Tailwind CSS");
  });

  test("renders an empty state with a reset action", () => {
    const html = renderToStaticMarkup(<ProjectGrid projects={[]} />);

    expect(html).toContain("No projects match this filter");
    expect(html).toContain("Reset filters");
  });
});
