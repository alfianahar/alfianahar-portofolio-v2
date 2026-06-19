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
    expect(html).toContain("max-w-[90%]");
    expect(html).toContain("rounded-full border border-white/10 bg-white/[0.06] px-3 py-2");
    expect(html).toContain("rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3");
    expect(html).toContain("size-2 rounded-full bg-[#7cb8fc]");
  });
});
