import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { Project } from "@app-types/content";
import { ProjectFilters } from "./project-filters";

const projects: Project[] = [
  {
    title: "Portfolio V2",
    slug: "portfolio-v2",
    description: "Portfolio built from Markdown content.",
    thumbnail: { src: "/cover.svg", alt: "Portfolio preview" },
    role: "Designer & Developer",
    position: ["lead"],
    type: "from scratch",
    tags: ["Astro"],
    stack: ["Astro"],
  },
];

describe("ProjectFilters", () => {
  test("renders selected filters with readable brutalist contrast", () => {
    const html = renderToStaticMarkup(
      <ProjectFilters projects={projects} activeFilter={{ kind: "tag", value: "Astro" }} />,
    );

    expect(html).toContain("bg-[var(--cream)]");
    expect(html).toContain("text-[var(--brutal-ink)]");
    expect(html).toContain("border-[var(--brutal-ink)]");
    expect(html).toContain("Stack");
  });

  test("opens the collapsed filter panel when a filter is active", () => {
    const html = renderToStaticMarkup(
      <ProjectFilters projects={projects} activeFilter={{ kind: "tag", value: "Astro" }} />,
    );

    expect(html).toContain("<details open");
  });
});
