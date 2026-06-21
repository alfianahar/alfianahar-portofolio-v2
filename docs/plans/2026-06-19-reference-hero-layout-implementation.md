# Reference Hero Layout Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the home hero as a close adaptation of `docs/plans/hero_layout.png`, with a resume-backed editorial pitch on the left and a dominant assistant app shell on the right.

**Architecture:** Keep the home page as a single hero section and replace the current compact Phase 2 composition with a split full-viewport layout. Update content data, header links, hero background, hero copy, and assistant preview while reusing the existing `ChatPanel`, `LogoMark`, `Container`, and button utilities where practical.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6, Tailwind CSS v4, Bun test runner.

---

## Ground Rules

- Use `bun`, never `npm`, `yarn`, `pnpm`, or `npx`.
- Use `apply_patch` for manual edits.
- Do not modify unrelated dirty files.
- Do not commit unless the user explicitly asks for a commit.
- Contact actions must route to `/bio`.
- Do not hide scroll bugs with `overflow-y-hidden` on `body`.

## Task 1: Update Tests For The New Reference Layout

**Files:**

- Modify: `components/hero/hero-section.test.tsx`
- Modify: `components/chat/chat-panel.test.tsx`

**Step 1: Update hero assertions**

Replace the current hero test expectations with layout-specific signals:

```ts
expect(html).toContain("Reliable Systems. Practical AI.");
expect(html).toContain("AI-POWERED ENGINEERING");
expect(html).toContain("Alfian AI Assistant");
expect(html).toContain("About Alfian");
expect(html).toContain("Recent Projects");
expect(html).toContain("Let's Build Something");
expect(html).toContain('href="/bio"');
```

**Step 2: Update chat panel stale content assertions**

If `components/chat/chat-panel.test.tsx` still asserts old chatbot copy, align it with the new shared chatbot content:

```ts
expect(html).toContain("Review Website");
expect(html).toContain("Show Work");
```

**Step 3: Run focused tests to verify expected failure**

Run:

```bash
bun test components/hero/hero-section.test.tsx components/chat/chat-panel.test.tsx
```

Expected: hero test fails until implementation is complete. Chat panel should pass unless content data changes later in this plan.

## Task 2: Route Contact Actions To Bio

**Files:**

- Modify: `components/layout/site-header.tsx`
- Modify: `components/hero/hero-copy.tsx`

**Step 1: Update header contact link**

In `components/layout/site-header.tsx`, change:

```tsx
href="/about#contact"
```

to:

```tsx
href="/bio"
```

**Step 2: Keep nav visually quiet**

Do not add new navigation behavior. Existing nav may remain, but the Contact button must point to `/bio`.

**Step 3: Run header-related checks**

Run:

```bash
bun run typecheck
```

Expected: PASS.

## Task 3: Replace Hero Copy With Reference-Inspired Editorial Pitch

**Files:**

- Modify: `components/hero/hero-copy.tsx`
- Modify: `components/hero/hero-tool-strip.tsx`

**Step 1: Replace the left hero copy**

Use the reference structure while keeping Alfian-specific positioning:

```tsx
export function HeroCopy() {
  return (
    <div className="relative z-10 max-w-3xl">
      <p className="mb-8 inline-flex items-center gap-2 rounded-full bg-black/[0.04] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] ring-1 ring-black/5">
        <span aria-hidden="true">✦</span>
        AI-POWERED ENGINEERING
      </p>
      <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.075em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl xl:text-8xl">
        Reliable Systems. Practical AI.
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl sm:leading-9">
        I build fullstack web systems, robotics interfaces, backend APIs, realtime integrations,
        and practical AI-assisted workflows that turn rough ideas into reliable products.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link href="/bio" className={buttonClassName({ size: "lg", className: "h-14 px-7" })}>
          Let's Build Something
          <span aria-hidden="true">↗</span>
        </Link>
        <Link
          href="/work"
          className={buttonClassName({ variant: "secondary", size: "lg", className: "h-14 px-7" })}
        >
          View My Work
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
```

**Step 2: Replace the proof strip**

In `components/hero/hero-tool-strip.tsx`, use stack chips as the bottom proof strip:

```ts
const tools = ["Next.js", "Golang", "GraphQL", "ROS", "Python", "AI Systems"];
```

Render them under a small label:

```tsx
<p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
  Core stack and domains
</p>
```

**Step 3: Run focused test**

Run:

```bash
bun test components/hero/hero-section.test.tsx
```

Expected: still fails until the assistant shell is rebuilt.

## Task 4: Rebuild Hero Background And Section Layout

**Files:**

- Modify: `components/hero/hero-background.tsx`
- Modify: `components/hero/hero-section.tsx`

**Step 1: Replace the background with a sketch/network style**

Use layered gradients and thin line patterns to approximate the reference without adding image dependencies:

```tsx
<div aria-hidden="true" className="absolute inset-0 overflow-hidden">
  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96),rgba(255,255,255,0.72)_48%,rgba(250,250,250,0.96))]" />
  <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(115deg,transparent_0_42%,rgba(0,0,0,0.38)_42.2%,transparent_42.5%),linear-gradient(25deg,transparent_0_54%,rgba(0,0,0,0.28)_54.2%,transparent_54.5%),radial-gradient(circle_at_22%_18%,rgba(0,0,0,0.35)_0_1px,transparent_1.5px),radial-gradient(circle_at_76%_38%,rgba(0,0,0,0.32)_0_1px,transparent_1.5px)] [background-size:220px_180px,260px_220px,78px_78px,92px_92px]" />
  <div className="absolute inset-y-0 right-[42%] hidden w-px bg-gradient-to-b from-transparent via-black/10 to-transparent lg:block" />
  <div className="absolute bottom-0 right-[44%] hidden h-[58%] w-[36%] border-l border-t border-black/10 bg-[linear-gradient(135deg,transparent,rgba(0,0,0,0.035))] lg:block" />
</div>
```

**Step 2: Rebuild section grid**

Use a stronger split layout:

```tsx
<section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-white">
  <HeroBackground />
  <Container
    size="wide"
    className="relative z-10 grid min-h-[calc(100svh-5rem)] items-center gap-8 py-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-10"
  >
    <div className="flex min-h-0 flex-col justify-center gap-16 lg:h-full lg:py-16">
      <HeroCopy />
      <HeroToolStrip />
    </div>
    <HeroChatPreview />
  </Container>
</section>
```

**Step 3: Run focused test**

Run:

```bash
bun test components/hero/hero-section.test.tsx
```

Expected: still fails until assistant shell content exists.

## Task 5: Rebuild Assistant Preview As App Shell

**Files:**

- Modify: `components/hero/hero-chat-preview.tsx`

**Step 1: Replace side card data**

Use reference-style right cards:

```ts
const skills = [
  { label: "AI & Automation", value: "95%" },
  { label: "Web Development", value: "90%" },
  { label: "Robotics UI", value: "85%" },
  { label: "Backend APIs", value: "80%" },
];

const recentProjects = [
  { title: "Robotics Interface", meta: "ROS + GraphQL" },
  { title: "Golang Services", meta: "Microservices" },
  { title: "Portfolio v2", meta: "Personal Website" },
];
```

**Step 2: Replace the component layout**

Build a large app shell with:

- Top assistant header.
- Main chat column.
- Right sidebar cards.
- Prompt bar.
- Quick action buttons.

Use static markup directly inside `HeroChatPreview`. Reuse `LogoMark` for the assistant avatar.

Required visible strings:

```text
Alfian AI Assistant
Online
About Alfian
Skills
Recent Projects
Review Website
Show Work
Discuss AI
Contact Alfian
```

**Step 3: Keep density responsive**

- Hide the right sidebar below `xl` or place it under the chat area.
- Keep the prompt and quick actions visible on desktop.
- Avoid text overflow by using small text and compact cards.

**Step 4: Run focused test**

Run:

```bash
bun test components/hero/hero-section.test.tsx
```

Expected: PASS.

## Task 6: Remove Or Neutralize Rotating Role Dependency

**Files:**

- Modify: `components/hero/hero-copy.tsx`
- Optional modify: `components/hero/rotating-role.tsx`

**Step 1: Confirm `RotatingRole` is no longer imported by `HeroCopy`**

The reference layout does not need rotating text. Remove this import from `components/hero/hero-copy.tsx`:

```ts
import { RotatingRole } from "./rotating-role";
```

**Step 2: Leave `rotating-role.tsx` in place unless lint reports it as dead code**

Do not delete it unless the project has a strict unused-file check. Keeping it avoids unnecessary churn.

**Step 3: Run lint**

Run:

```bash
bun run lint
```

Expected: PASS.

## Task 7: Full Verification

**Files:**

- No file changes expected unless checks fail.

**Step 1: Run lint**

```bash
bun run lint
```

Expected: PASS.

**Step 2: Run typecheck**

```bash
bun run typecheck
```

Expected: PASS.

**Step 3: Run tests**

```bash
bun run test
```

Expected: PASS.

**Step 4: Run production build**

```bash
bun run build
```

Expected: PASS.

**Step 5: Check git status**

```bash
git status --short
```

Expected: only intended files changed, plus pre-existing untracked assets/plans if still untracked.

## Task 8: Manual Visual Review

**Files:**

- No file changes expected unless visual issues are found.

**Step 1: Start dev server**

```bash
bun run dev
```

Expected: server starts.

**Step 2: Inspect desktop**

Check `/` at `1440x900`.

Expected:

```text
Header is compact and matches the reference direction.
Contact routes to /bio.
Left editorial hero is dominant and readable.
Right assistant shell is visually dominant.
No footer on home.
No horizontal overflow.
```

**Step 3: Inspect mobile**

Check `/` at `390x844` and `360x740`.

Expected:

```text
Headline remains readable.
CTAs are reachable.
Assistant preview remains visible or gracefully stacks below.
No clipped text.
No horizontal overflow.
```

**Step 4: Fix smallest visual issue only**

Preferred adjustment order:

```text
Reduce assistant shell padding.
Reduce hero heading size on mobile.
Hide assistant sidebar below xl.
Reduce quick actions.
Reduce proof strip chip size.
```
