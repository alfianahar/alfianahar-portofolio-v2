import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { HeroSection } from "./hero-section";

describe("HeroSection", () => {
  test("renders the no-scroll hero with resume-backed assistant content", () => {
    const html = renderToStaticMarkup(<HeroSection />);

    expect(html).toContain("Reliable Systems. Practical AI.");
    expect(html).toContain("AI-POWERED ENGINEERING");
    expect(html).toContain("Alfian, the");
    expect(html).toContain("All-rounder");
    expect(html).toContain("Alfian Assistant");
    expect(html).toContain("Build Something");
    expect(html).toContain('href="mailto:alfian.aswinda@gmail.com"');
    expect(html).toContain('href="/work"');
  });
});
