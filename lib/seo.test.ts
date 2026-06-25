import { describe, expect, test } from "bun:test";
import { siteConfig } from "./seo";

describe("siteConfig", () => {
  test("uses a crawler-friendly PNG social image", () => {
    expect(siteConfig.ogImage).toBe("/og-image.png");
  });
});
