import { describe, expect, test } from "bun:test";
import { buttonClassName } from "./button";

describe("buttonClassName", () => {
  test("returns neo-brutalist classes for the brutal variant", () => {
    const className = buttonClassName({ variant: "brutal" });

    expect(className).toContain("border-bold");
    expect(className).toContain("text-(--brutal-ink)");
    expect(className).toContain("bg-(--cream)");
    expect(className).toContain("shadow-(--shadow-hard)");
    expect(className).toContain("brutal-press");
  });
});
