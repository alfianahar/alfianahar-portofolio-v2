import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { HeroSection } from "./hero-section";

describe("HeroSection", () => {
  test("renders the hero with the AI chat CTA and assistant content", () => {
    const html = renderToStaticMarkup(<HeroSection />);

    expect(html).toContain("Reliable Systems. Practical AI.");
    expect(html).toContain("AI-POWERED ENGINEERING");
    expect(html).toContain("Alfian, the");
    expect(html).toContain("Jack of all stacks");
    expect(html).toContain("Fullstack");
    expect(html).toContain("Alfian Assistant");
    expect(html).toContain("Chat with my AI");
    expect(html).toContain('href="/chat"');
    expect(html).toContain('href="mailto:alfian.aswinda@gmail.com"');
    expect(html).toContain('href="/work"');
  });
});
