import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import BioPage from "../../app/bio/page";

describe("BioPage", () => {
  test("renders profile, data-driven actions, socials, and chat preview", () => {
    const html = renderToStaticMarkup(<BioPage />);

    expect(html).toContain("Alfian Nahar");
    expect(html).toContain("View Selected Work");
    expect(html).toContain("GitHub");
    expect(html).toContain("Ask about projects");
  });
});
