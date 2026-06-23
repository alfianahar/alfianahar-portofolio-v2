import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { AboutHero } from "./about-hero";

describe("AboutHero", () => {
  test("renders concise profile copy and contact paths", () => {
    const html = renderToStaticMarkup(<AboutHero />);

    expect(html).toContain("What Alfian builds");
    expect(html).toContain("AI-assisted workflows");
    expect(html).toContain("Send Email");
    expect(html).toContain('href="mailto:alfian.aswinda@gmail.com"');
    expect(html).toContain("Send me a message");
    expect(html).toContain('href="https://wa.me/6285725359530"');
    expect(html).toContain("GitHub");
    expect(html).toContain("LinkedIn");
    expect(html).not.toContain("Instagram");
  });
});
