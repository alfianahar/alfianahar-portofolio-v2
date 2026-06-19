import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AboutHero } from "./about-hero";

describe("AboutHero", () => {
  test("renders concise profile copy and contact paths", () => {
    const html = renderToStaticMarkup(<AboutHero />);

    expect(html).toContain("What Alfian builds");
    expect(html).toContain("AI-assisted workflows");
    expect(html).toContain("alfian.aswinda@gmail.com");
    expect(html).toContain("GitHub");
  });
});
