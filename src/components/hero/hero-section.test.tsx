import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { HeroSection } from "./hero-section";

describe("HeroSection", () => {
  test("renders the portfolio hero, assistant preview, and data-driven actions", () => {
    const html = renderToStaticMarkup(<HeroSection />);

    expect(html).toContain("Alfian Nahar");
    expect(html).toContain("AI-powered products");
    expect(html).toContain("Review My Website");
    expect(html).toContain("automation builder");
  });
});
