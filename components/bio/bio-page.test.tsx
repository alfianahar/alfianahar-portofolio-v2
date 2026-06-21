import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { BioCard } from "./bio-card";
import { BioActions } from "./bio-actions";
import { BioChatPreview } from "./bio-chat-preview";

describe("BioCard", () => {
  test("renders profile information", () => {
    const html = renderToStaticMarkup(<BioCard />);

    expect(html).toContain("Alfian Nahar");
  });
});

describe("BioActions", () => {
  test("renders data-driven action links", () => {
    const html = renderToStaticMarkup(<BioActions />);

    expect(html).toContain("View Selected Work");
    expect(html).toContain("About Alfian");
    expect(html).toContain("Start a Project");
  });
});

describe("BioChatPreview", () => {
  test("renders chat preview content", () => {
    const html = renderToStaticMarkup(<BioChatPreview />);

    expect(html).toContain("Ask about projects");
    expect(html).toContain("max-w-[90%]");
  });
});
