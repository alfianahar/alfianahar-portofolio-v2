import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { projects } from "@content/projects";
import { ProjectGrid } from "./project-grid";

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
