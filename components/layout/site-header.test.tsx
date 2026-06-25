import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  test("keeps Work and About visible in the mobile header", () => {
    const html = renderToStaticMarkup(<SiteHeader />);

    expect(html).toContain('href="/work"');
    expect(html).toContain('href="/about"');
    expect(html).toContain('href="/bio"');
    expect(html).not.toContain("hidden items-center gap-8");
    expect(html).not.toContain("max-md:hidden");
  });
});
