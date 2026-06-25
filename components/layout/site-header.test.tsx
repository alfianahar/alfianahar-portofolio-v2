import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  test("renders nav links, the Biopage button, and a mobile burger", () => {
    const html = renderToStaticMarkup(<SiteHeader />);

    expect(html).toContain('href="/work"');
    expect(html).toContain('href="/about"');
    expect(html).toContain('href="/bio"');
    expect(html).toContain('aria-controls="mobile-nav-panel"');
    expect(html).toContain('aria-label="Open menu"');
    expect(html).toContain("id=\"mobile-nav-panel\"");
  });
});
