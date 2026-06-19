# Home Hero No-Scroll Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rework the home page into a one-viewport hero with compact resume-backed copy on the left and a dominant AI assistant panel on the right.

**Architecture:** Remove the global footer from `app/layout.tsx` and render it only on non-home pages so the home route can fit one viewport without clipping. Keep the hero as the only home page section, then tighten `components/hero/*` and `content/*` so layout, copy, and assistant data are all data-driven and resume-aligned.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6, Tailwind CSS v4, Bun test runner.

---

## Ground Rules

- Use `bun`, never `npm`, `yarn`, `pnpm`, or `npx`.
- Use `apply_patch` for manual edits.
- Do not modify unrelated dirty files.
- Do not commit unless the user explicitly asks for commits.
- If the plan is executed in a separate session, use the `executing-plans` skill first.

## Task 1: Protect Existing Behavior With Tests

**Files:**

- Modify: `components/hero/hero-section.test.tsx`

**Step 1: Update the hero rendering assertions**

Replace the current generic expectations with resume-backed copy and right-panel signals.

```ts
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
```

**Step 2: Run the focused test to verify it fails**

Run:

```bash
bun test components/hero/hero-section.test.tsx
```

Expected: FAIL because the new copy does not exist yet.

**Step 3: Optional commit checkpoint**

Only commit if the user explicitly requested commits.

```bash
git add components/hero/hero-section.test.tsx
git commit -m "test : update hero redesign expectations"
```

## Task 2: Remove Footer From Home Without Breaking Other Pages

**Files:**

- Modify: `app/layout.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/work/page.tsx`
- Modify: `app/bio/page.tsx`

**Step 1: Remove the global footer from root layout**

In `app/layout.tsx`, remove this import:

```ts
import { SiteFooter } from "@components/layout/site-footer";
```

Remove this render from the body:

```tsx
<SiteFooter />
```

The root body should keep only:

```tsx
<SiteHeader />
<main>{children}</main>
```

**Step 2: Add footer to `app/about/page.tsx`**

Import the footer:

```ts
import { SiteFooter } from "@components/layout/site-footer";
```

Wrap the current page content in a fragment and render footer after it.

Expected shape:

```tsx
const AboutPage = () => (
  <>
    <AboutHero />
    <SiteFooter />
  </>
);
```

Preserve the existing metadata export.

**Step 3: Add footer to `app/work/page.tsx`**

Import `SiteFooter` and render it after the existing work page content.

Expected shape:

```tsx
const WorkPage = () => (
  <>
    <section>...</section>
    <SiteFooter />
  </>
);
```

Do not rewrite project filtering or content rendering.

**Step 4: Add footer to `app/bio/page.tsx`**

Import `SiteFooter` and render it after the existing bio page content.

Expected shape:

```tsx
const BioPage = () => (
  <>
    <section>...</section>
    <SiteFooter />
  </>
);
```

Do not alter bio cards or actions.

**Step 5: Run layout-related tests**

Run:

```bash
bun run test
```

Expected: tests may still fail only because hero content is not implemented yet. There should be no import or JSX syntax errors.

**Step 6: Optional commit checkpoint**

Only commit if the user explicitly requested commits.

```bash
git add app/layout.tsx app/about/page.tsx app/work/page.tsx app/bio/page.tsx
git commit -m "refactor : scope footer to non-home pages"
```

## Task 3: Update Resume-Backed Content Data

**Files:**

- Modify: `content/profile.ts`
- Modify: `content/hero-roles.ts`
- Modify: `content/chatbot.ts`
- Optional modify: `lib/seo.ts`

**Step 1: Update profile positioning**

In `content/profile.ts`, update title and bio.

```ts
export const profile = {
  name: "Alfian Nahar",
  displayName: "alfian aswinda",
  title: "Fullstack Software Engineer",
  email: "alfian.aswinda@gmail.com",
  location: "Indonesia",
  website: "https://alfianahar.com",
  bio: "Fullstack software engineer building reliable web systems, robotics interfaces, backend APIs, and practical AI-assisted workflows.",
} satisfies Profile;
```

**Step 2: Update rotating roles**

In `content/hero-roles.ts`, replace the current list with resume-backed role pairs.

```ts
export const heroRoles = [
  { fun: "Robotics UI", real: "Next.js" },
  { fun: "Backend APIs", real: "Golang" },
  { fun: "Realtime Systems", real: "GraphQL + ROS" },
  { fun: "AI Engineering", real: "learning in public" },
  { fun: "Product Interfaces", real: "React" },
  { fun: "System Design", real: "microservices" },
] satisfies HeroRole[];
```

**Step 3: Update chatbot messages**

In `content/chatbot.ts`, use one concise user prompt and one resume-backed assistant response.

```ts
export const chatMessages = [
  {
    id: "user-capability-check",
    role: "user",
    content: "What kind of systems can Alfian build?",
    timestamp: "10:30 AM",
  },
  {
    id: "assistant-resume-summary",
    role: "assistant",
    content:
      "Alfian builds fullstack systems across robotics UI, REST APIs, Apollo GraphQL with ROS integrations, WebRTC workflows, and Golang microservices. He is also deepening practical AI engineering for smarter product and automation flows.",
  },
] satisfies ChatMessage[];
```

**Step 4: Update quick actions**

Keep actions short so they fit the no-scroll panel.

```ts
export const chatQuickActions = [
  {
    label: "Review Website",
    prompt: "Review my website and suggest the highest-impact improvements.",
  },
  {
    label: "Show Work",
    prompt: "Show Alfian's selected fullstack and robotics work.",
  },
  {
    label: "Discuss AI",
    prompt: "Discuss practical AI engineering and automation ideas with Alfian.",
  },
] satisfies ChatQuickAction[];
```

**Step 5: Optionally update site metadata**

In `lib/seo.ts`, update generic `AI Developer & Designer` language if the site should fully match the new positioning.

```ts
title: "Alfian Nahar | Fullstack Software Engineer",
description:
  "Personal portfolio of Alfian Nahar, a fullstack software engineer building web systems, robotics interfaces, backend APIs, and practical AI-assisted workflows.",
```

**Step 6: Run content-dependent tests**

Run:

```bash
bun test components/hero/hero-section.test.tsx
```

Expected: still may fail until hero components render all new strings.

**Step 7: Optional commit checkpoint**

Only commit if the user explicitly requested commits.

```bash
git add content/profile.ts content/hero-roles.ts content/chatbot.ts lib/seo.ts
git commit -m "refactor : align portfolio content with resume"
```

## Task 4: Tighten Left Hero Copy And Highlight Rotating Text

**Files:**

- Modify: `components/hero/hero-copy.tsx`
- Modify: `components/hero/rotating-role.tsx`
- Modify: `components/hero/hero-tool-strip.tsx`

**Step 1: Simplify hero copy**

Replace the current long headline and paragraph with compact copy.

Expected content in `HeroCopy`:

```tsx
export function HeroCopy() {
  return (
    <div className="relative z-10 max-w-2xl">
      <p className="mb-4 inline-flex rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] shadow-sm backdrop-blur sm:px-4 sm:py-2 sm:text-xs">
        {profile.name} / {profile.title}
      </p>
      <h1 className="text-4xl font-semibold tracking-[-0.07em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl xl:text-7xl">
        Fullstack engineer building reliable systems.
      </h1>
      <div className="mt-5">
        <RotatingRole />
      </div>
      <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg sm:leading-8">
        I build fullstack web systems with Next.js, Golang, and real-time integrations, while
        deepening practical AI engineering.
      </p>
      <div className="mt-7 flex flex-row gap-3">
        <Link href="/work" className={buttonClassName({ size: "lg" })}>
          View Work
        </Link>
        <Link
          href="/about#contact"
          className={buttonClassName({ variant: "secondary", size: "lg" })}
        >
          Contact Me
        </Link>
      </div>
    </div>
  );
}
```

If mobile height is too tight during verification, reduce the mobile heading size before removing content.

**Step 2: Make rotating role a highlighted block**

In `components/hero/rotating-role.tsx`, replace the inline span styling with a pill/card.

Expected return shape:

```tsx
return (
  <span className="inline-flex min-w-[17rem] items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--text-primary)] px-4 py-3 text-left text-[var(--background)] shadow-[0_18px_60px_rgba(0,0,0,0.16)] sm:min-w-[20rem]">
    <span className="text-xs font-medium uppercase tracking-[0.2em] opacity-70">Currently</span>
    <span className="flex items-baseline gap-2 whitespace-nowrap font-semibold">
      <span>{role.fun}</span>
      <span className="text-xs font-medium opacity-60">/{role.real}</span>
    </span>
    <span className="sr-only">{heroRoles.map((item) => item.fun).join(", ")}</span>
  </span>
);
```

Keep the existing reduced-motion interval guard.

**Step 3: Reduce tool strip noise**

In `components/hero/hero-tool-strip.tsx`, replace tools with resume-backed core stack.

```ts
const tools = ["Next.js", "TypeScript", "Golang", "Python", "GraphQL", "AI Systems"];
```

Tighten chip size for viewport fit.

```tsx
className =
  "rounded-full border border-[var(--border)] bg-white/68 px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] shadow-sm backdrop-blur sm:px-4 sm:py-2 sm:text-sm";
```

**Step 4: Run focused test**

Run:

```bash
bun test components/hero/hero-section.test.tsx
```

Expected: may still fail until the assistant panel content is updated.

**Step 5: Optional commit checkpoint**

Only commit if the user explicitly requested commits.

```bash
git add components/hero/hero-copy.tsx components/hero/rotating-role.tsx components/hero/hero-tool-strip.tsx
git commit -m "refactor : simplify home hero copy"
```

## Task 5: Rebuild Hero Shell For One Viewport

**Files:**

- Modify: `components/hero/hero-section.tsx`
- Optional modify: `components/hero/hero-background.tsx`

**Step 1: Make the section fit the remaining viewport**

Change the hero section from large vertical padding to a strict height based on the sticky header.

Expected shape:

```tsx
export function HeroSection() {
  return (
    <section className="relative isolate h-[calc(100svh-5rem)] overflow-hidden bg-[var(--background)]">
      <HeroBackground />
      <Container
        size="wide"
        className="relative z-10 grid h-full gap-5 py-5 sm:gap-6 sm:py-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-8"
      >
        <div className="flex min-h-0 flex-col justify-center gap-6 lg:gap-8">
          <HeroCopy />
          <HeroToolStrip />
        </div>
        <HeroChatPreview />
      </Container>
    </section>
  );
}
```

Use `100svh` to reduce mobile browser toolbar problems.

**Step 2: Tighten mobile if needed**

If mobile still scrolls after implementation, make these minimal changes first:

```tsx
className =
  "relative z-10 grid h-full grid-rows-[auto_minmax(0,1fr)] gap-3 py-3 sm:gap-6 sm:py-6 lg:grid-rows-none lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-8";
```

And update left wrapper:

```tsx
<div className="flex min-h-0 flex-col justify-center gap-4 sm:gap-6 lg:gap-8">
```

**Step 3: Optional background tightening**

If the assistant panel loses contrast, reduce background opacity behind the right side in `HeroBackground` by adding a right-side white veil.

```tsx
<div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-white/90 to-transparent lg:block" />
```

**Step 4: Run focused test**

Run:

```bash
bun test components/hero/hero-section.test.tsx
```

Expected: may still fail until the assistant preview renders all required content.

**Step 5: Optional commit checkpoint**

Only commit if the user explicitly requested commits.

```bash
git add components/hero/hero-section.tsx components/hero/hero-background.tsx
git commit -m "refactor : constrain home hero to viewport"
```

## Task 6: Expand Assistant Preview Into A Full Right Panel

**Files:**

- Modify: `components/hero/hero-chat-preview.tsx`

**Step 1: Replace generic side cards with resume-backed cards**

Use a richer but still compact data set.

```ts
const sideCards = [
  { label: "Core", value: "Fullstack", detail: "Next.js + Golang" },
  { label: "Domain", value: "Robotics UI", detail: "ROS + realtime ops" },
  { label: "Backend", value: "APIs", detail: "REST, GraphQL, gRPC" },
  { label: "Now", value: "AI Engineering", detail: "Automation systems" },
];
```

**Step 2: Make outer frame fill the available height**

Use `min-h-0` and `h-full` so it respects the parent viewport grid.

Expected wrapper:

```tsx
<div className="relative min-h-0 h-full rounded-[2rem] border border-white/80 bg-white/82 p-3 shadow-[0_32px_120px_rgba(20,39,62,0.16)] backdrop-blur-2xl sm:p-4 lg:p-5">
```

Hide the floating label on small screens and keep it short.

```tsx
<div className="absolute -right-3 -top-3 hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-xs font-medium text-[var(--text-secondary)] shadow-[var(--shadow-soft)] lg:block">
  AI assistant preview
</div>
```

**Step 3: Configure `ChatPanel` for full-height layout**

Pass tighter classes to existing `ChatPanel` instead of rewriting shared chat components.

```tsx
<ChatPanel
  title="Alfian Assistant"
  description="Fullstack, robotics, backend, AI"
  messages={chatMessages}
  quickActions={chatQuickActions}
  inputLabel="Ask Alfian Assistant"
  inputPlaceholder="Ask about fullstack systems, robotics UI, or AI engineering..."
  className="flex h-full min-h-0 flex-col overflow-hidden"
  headerClassName="mb-3 border-b border-[var(--border)] pb-3 sm:mb-4 sm:pb-4"
  messagesClassName="min-h-0 flex-1 overflow-hidden space-y-3"
  messageMaxWidthClassName="max-w-[92%]"
  messageClassName="text-xs leading-5 sm:text-sm sm:leading-6"
  userMessageClassName="bg-[var(--text-primary)] text-[var(--background)]"
  assistantMessageClassName="bg-[var(--muted-surface)] text-[var(--text-secondary)]"
  quickActionsClassName="mt-3 gap-2"
  quickActionClassName="px-3 py-1.5 text-[0.7rem]"
  inputBaseClassName="mt-3 flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-xs text-[var(--text-muted)] sm:text-sm"
>
```

**Step 4: Render side cards compactly**

Inside the `ChatPanel` children, render cards in two columns on desktop and hide detail text on very small screens if needed.

```tsx
<div className="grid gap-2 sm:grid-cols-2">
  {sideCards.map((card) => (
    <div key={card.label} className="rounded-2xl bg-[var(--muted-surface)] px-3 py-2.5">
      <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
        {card.label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{card.value}</p>
      <p className="mt-0.5 hidden text-xs text-[var(--text-muted)] sm:block">{card.detail}</p>
    </div>
  ))}
</div>
```

**Step 5: Run focused test**

Run:

```bash
bun test components/hero/hero-section.test.tsx
```

Expected: PASS.

**Step 6: Optional commit checkpoint**

Only commit if the user explicitly requested commits.

```bash
git add components/hero/hero-chat-preview.tsx
git commit -m "refactor : expand home assistant panel"
```

## Task 7: Verify No-Scroll Behavior Manually

**Files:**

- No file changes expected.

**Step 1: Start the dev server**

Run:

```bash
bun run dev
```

Expected: Next.js dev server starts successfully.

**Step 2: Inspect desktop**

Open `/` at a common desktop viewport such as `1440x900`.

Expected:

```text
No vertical scrollbar.
Left side copy is concise.
Rotating role pill is visually prominent.
Right assistant panel fills the right side.
Footer is not visible on home.
```

**Step 3: Inspect tablet and mobile**

Check at `1024x768`, `768x1024`, `390x844`, and `360x740`.

Expected:

```text
No vertical scrollbar.
No clipped primary headline.
At least a compact assistant panel remains visible.
No horizontal overflow.
```

**Step 4: Fix only the smallest overflow source**

If there is vertical scroll, reduce spacing or mobile type size before deleting content.

Preferred adjustment order:

```text
Hero section gap and py
Hero heading mobile size
Rotating pill padding and width
Assistant card padding
Quick action count or visibility
Tool strip visibility on small screens
```

Do not use `overflow-y-hidden` on `body` as the main fix. That hides bugs and can break non-home pages.

## Task 8: Run Full Verification

**Files:**

- No file changes expected unless checks fail.

**Step 1: Run lint**

Run:

```bash
bun run lint
```

Expected: PASS.

**Step 2: Run typecheck**

Run:

```bash
bun run typecheck
```

Expected: PASS.

**Step 3: Run tests**

Run:

```bash
bun run test
```

Expected: PASS.

**Step 4: Run production build**

Run:

```bash
bun run build
```

Expected: PASS.

**Step 5: Check git status**

Run:

```bash
git status --short
```

Expected: only intended files changed, plus the existing untracked resume PDF if it was already untracked.

**Step 6: Optional final commit**

Only commit if the user explicitly requested commits.

```bash
git add app/layout.tsx app/about/page.tsx app/work/page.tsx app/bio/page.tsx components/hero content lib/seo.ts
git commit -m "refactor : tighten no-scroll home hero"
```

## Execution Notes

- The current untracked file `public/Alfian Aswinda-resume-v3.0c.pdf` appears to be user-provided. Do not add it unless the user asks.
- Keep changes minimal. The goal is a sharper hero, not a site-wide redesign.
- If no-scroll on very short mobile screens conflicts with readability, prioritize readable headline and visible assistant preview, then reduce lower-priority chips and quick actions.
