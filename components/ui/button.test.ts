import { describe, expect, test } from "bun:test";
import { buttonClassName } from "./button";

describe("buttonClassName", () => {
  test("returns neo-brutalist classes for the brutal variant", () => {
    const className = buttonClassName({ variant: "brutal" });

    expect(className).toContain("border-[length:var(--border-bold)]");
    expect(className).toContain("text-[var(--brutal-ink)]");
    expect(className).toContain("bg-[var(--cream)]");
    expect(className).toContain("shadow-[var(--shadow-hard)]");
    expect(className).toContain("brutal-press");
  });
});
