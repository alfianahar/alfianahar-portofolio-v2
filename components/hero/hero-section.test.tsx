import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { HeroSection } from "./hero-section";

describe("HeroSection", () => {
  test("renders the no-scroll hero with resume-backed assistant content", () => {
    const html = renderToStaticMarkup(<HeroSection />);

    expect(html).toContain("Alfian Nahar");
    expect(html).toContain("Fullstack engineer building reliable systems");
    expect(html).toContain("AI Engineering");
    expect(html).toContain("Robotics UI");
    expect(html).toContain("Golang microservices");
    expect(html).toContain("Ask about fullstack systems, robotics UI, or AI engineering");
  });
});
