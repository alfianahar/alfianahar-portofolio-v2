import { describe, expect, test } from "bun:test";
import { mapProjectEntries } from "./project-content";

describe("mapProjectEntries", () => {
  test("maps Markdown project entries into work page projects", () => {
    const projects = mapProjectEntries([
      {
        id: "portfolio-v2.md",
        slug: "portfolio-v2",
        data: {
          title: "Portfolio V2",
          shortDescription: "Portfolio built from Markdown content.",
          tags: ["Portfolio", "Astro"],
          role: "Designer & Developer",
          position: ["personal", "lead"],
          type: "from scratch",
          stack: ["Astro", "React"],
          cover: { src: "/_astro/cover.hash.svg" },
          coverAlt: "Portfolio V2 preview",
          outcome: "A simpler content workflow.",
          links: { caseStudy: "/work/portfolio-v2" },
          order: 1,
        },
      },
    ]);

    expect(projects).toEqual([
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
        stack: ["Astro", "React"],
        outcome: "A simpler content workflow.",
        links: { caseStudy: "/work/portfolio-v2" },
      },
    ]);
  });
});
