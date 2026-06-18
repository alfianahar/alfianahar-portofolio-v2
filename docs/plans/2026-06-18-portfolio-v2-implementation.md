# Portfolio V2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite Portfolio V2 into a premium personal portfolio with a light-first AI/product visual direction, SEO-ready pages, route loaders, filterable work content, and a polished chatbot preview.

**Architecture:** Use Next.js App Router with TypeScript, Bun, Tailwind CSS, and Vercel as the deployment target. Keep content in typed data modules and render repeated UI with `.map()` so project cards, filters, navigation, CTAs, social links, chatbot messages, and bio buttons are data-driven. Build shared design tokens, layout primitives, metadata helpers, and route-level loading before page-specific UI.

**Tech Stack:** Bun `1.3.3+`, Next.js `16.2.9+`, React `19.2.7+`, TypeScript `6.0.3+`, Tailwind CSS `4.3.1+`, ESLint `9.39.4+` within compatible `9.x`, Prettier `3.8.4+`, Vercel.

---

## Source Documents

- Product/design PRD: `docs/plans/2026-06-17-portfolio-v2-design.md`
- Hero reference image: `docs/plans/hero_layout.png`
- Existing logo: `public/an-logo.svg`
- Existing loader reference: `components/loader.tsx`
- Old bio inspiration: `/home/alfianahar/personal/alfianahar-portofolio-site/components/BioLayout/`
- Rotating hero role inspiration: `/home/alfianahar/personal/three-d-sketch-web/src/hero.js`

## Implementation Rules

- Do not preserve old TSX unless it still fits the PRD.
- Use Bun commands only after the rewrite starts: `bun install`, `bun run lint`, `bun run typecheck`, `bun run build`.
- Replace npm lockfile workflow with Bun lockfile workflow during stack reset.
- Repeated UI must come from data arrays and `.map()`.
- Do not build full AI backend or RAG in this implementation pass.
- Do not add WebGL/Three.js unless the CSS/SVG background cannot meet the PRD.
- Keep route loaders branded but do not force a fixed 3-second wait.
- Every task must run `bun run lint`, `bun run typecheck`, and `bun run build` unless the task explicitly only changes documentation.

---

### Task 1: Stack Reset To Bun + Modern Next

**Files:**

- Modify: `package.json`
- Modify: `next.config.js` or replace with `next.config.ts`
- Modify: `tsconfig.json`
- Modify: `.eslintrc.json` or replace with `eslint.config.mjs`
- Create: `.prettierrc`
- Create: `.prettierignore`
- Create: `bun.lock` through `bun install`
- Delete: `package-lock.json` after Bun lockfile exists

**Step 1: Inspect current config**

Read current `package.json`, `next.config.js`, `tsconfig.json`, and `.eslintrc.json`. Confirm old dependencies are Next 13-era before replacing them.

**Step 2: Update `package.json`**

Use this target structure, adjusting exact patch details to the current file:

```json
{
  "name": "alfianahar-portofolio-v2",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^16.2.9",
    "react": "^19.2.7",
    "react-dom": "^19.2.7"
  },
  "devDependencies": {
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "eslint": "^9.39.4",
    "eslint-config-next": "latest",
    "prettier": "^3.8.4",
    "tailwindcss": "^4.3.1",
    "typescript": "^6.0.3"
  }
}
```

If `next lint` is removed in the selected Next version, replace script with the current supported Next/ESLint command and document that in the final summary.

**Step 3: Add Prettier config**

Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100
}
```

Create `.prettierignore`:

```text
.next
node_modules
bun.lock
public
```

**Step 4: Install with Bun**

Run: `bun install`

Expected: `bun.lock` is created or updated, dependencies install successfully.

**Step 5: Remove npm lockfile**

Delete `package-lock.json` only after `bun.lock` exists.

**Step 6: Verify stack**

Run:

```bash
bun run lint
bun run typecheck
bun run build
```

Expected: Commands pass or expose migration issues that must be fixed in this task.

**Step 7: Commit**

Commit message:

```bash
git add package.json bun.lock next.config.* tsconfig.json eslint.config.* .eslintrc.json .prettierrc .prettierignore package-lock.json
git commit -m "setup : modern next bun stack"
```

---

### Task 2: App Directory Cleanup And Base Layout

**Files:**

- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Create: `src/styles/tokens.css`
- Create: `src/lib/utils.ts`

**Step 1: Simplify `app/layout.tsx`**

Remove the old global `Loader` and old `Navbar` dependency from root layout. The root layout should import global styles, set metadata later through SEO helpers, and render `{children}`.

**Step 2: Create `src/styles/tokens.css`**

Add light-first CSS variables:

```css
:root {
  --background: #fafafa;
  --surface: #ffffff;
  --surface-elevated: rgba(255, 255, 255, 0.78);
  --text-primary: #050505;
  --text-secondary: #525252;
  --text-muted: #737373;
  --border: #e5e5e5;
  --muted-surface: #f4f4f5;
  --shadow-soft: 0 24px 80px rgba(0, 0, 0, 0.08);
  --radius-lg: 24px;
  --radius-md: 16px;
  --radius-sm: 10px;
}

[data-theme="dark"] {
  --background: #14273e;
  --surface: #0f1f33;
  --surface-elevated: rgba(15, 31, 51, 0.84);
  --text-primary: #efeff6;
  --text-secondary: rgba(239, 239, 246, 0.78);
  --text-muted: rgba(239, 239, 246, 0.68);
  --border: rgba(239, 239, 246, 0.16);
  --muted-surface: rgba(239, 239, 246, 0.08);
}
```

**Step 3: Import tokens in `app/globals.css`**

Include `@import "../src/styles/tokens.css";` or the correct relative path for the current setup. Keep Tailwind import syntax compatible with the installed Tailwind version.

**Step 4: Add `cn` helper**

Create `src/lib/utils.ts`:

```ts
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
```

**Step 5: Verify**

Run:

```bash
bun run lint
bun run typecheck
bun run build
```

**Step 6: Commit**

Commit message:

```bash
git add app src
git commit -m "add : base layout and design tokens"
```

---

### Task 3: Shared UI Primitives And Logo

**Files:**

- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/container.tsx`
- Create: `src/components/ui/section-heading.tsx`
- Create: `src/components/brand/logo-mark.tsx`

**Step 1: Create Button primitive**

Create a typed component with `variant="primary" | "secondary" | "ghost"` and no business-specific copy.

**Step 2: Create Container primitive**

Create a reusable wrapper that centralizes horizontal spacing and max width.

**Step 3: Create SectionHeading primitive**

Create a reusable heading component for about/work sections.

**Step 4: Create LogoMark**

Render `public/an-logo.svg` through `next/image` or inline image usage. Keep alt text configurable and default to `Alfian Nahar logo`.

**Step 5: Verify**

Run:

```bash
bun run lint
bun run typecheck
bun run build
```

**Step 6: Commit**

Commit message:

```bash
git add src/components
git commit -m "add : shared ui primitives"
```

---

### Task 4: Typed Content Data

**Files:**

- Create: `src/types/content.ts`
- Create: `src/content/navigation.ts`
- Create: `src/content/profile.ts`
- Create: `src/content/social-links.ts`
- Create: `src/content/hero-roles.ts`
- Create: `src/content/projects.ts`
- Create: `src/content/experience.ts`
- Create: `src/content/chatbot.ts`
- Create: `src/lib/project-filters.ts`

**Step 1: Create content types**

Include types for `NavigationItem`, `SocialLink`, `HeroRole`, `Project`, `Experience`, `ChatMessage`, and `ChatQuickAction`.

**Step 2: Add rotating role data**

Use this starting data:

```ts
export const heroRoles = [
  { fun: "all-rounder", real: "fullstack" },
  { fun: "server whisperer", real: "backend" },
  { fun: "pixel pusher", real: "frontend" },
  { fun: "bug hunter", real: "debugger" },
  { fun: "caffeinated coder", real: "developer" },
  { fun: "architect of chaos", real: "systems" },
  { fun: "interface thinker", real: "UI engineer" },
  { fun: "automation builder", real: "AI workflow" },
] as const;
```

**Step 3: Add project data**

Use placeholder project data only if real project content is not ready. Every project must include thumbnail metadata, tags, type, position, and stack.

**Step 4: Add project filter helpers**

Create pure functions:

```ts
export function getUniqueProjectTags(projects: Project[]): string[];
export function getUniqueProjectTypes(projects: Project[]): string[];
export function getUniqueProjectPositions(projects: Project[]): string[];
export function filterProjects(projects: Project[], filter: ProjectFilter): Project[];
```

**Step 5: Verify**

Run:

```bash
bun run lint
bun run typecheck
bun run build
```

**Step 6: Commit**

Commit message:

```bash
git add src/types src/content src/lib/project-filters.ts
git commit -m "add : structured portfolio content"
```

---

### Task 5: SEO Infrastructure

**Files:**

- Modify: `app/layout.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `src/lib/seo.ts`
- Create: `src/lib/json-ld.ts`
- Optional Create: `app/opengraph-image.tsx`

**Step 1: Create metadata helper**

Create `src/lib/seo.ts` with a site config and helper for page metadata.

**Step 2: Add root metadata**

Use site title, description, canonical base URL, Open Graph, and Twitter metadata.

**Step 3: Add `sitemap.ts` and `robots.ts`**

Include `/`, `/about`, `/work`, `/bio`.

**Step 4: Add JSON-LD helpers**

Create helpers for `Person`, `WebSite`, and future project `CreativeWork` or `SoftwareApplication` structured data.

**Step 5: Verify**

Run:

```bash
bun run lint
bun run typecheck
bun run build
```

**Step 6: Commit**

Commit message:

```bash
git add app src/lib
git commit -m "add : seo infrastructure"
```

---

### Task 6: Shared Navigation And Loader

**Files:**

- Create: `src/components/layout/site-header.tsx`
- Create: `src/components/layout/site-footer.tsx`
- Create: `src/components/layout/page-loader.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/loading.tsx`
- Create: `app/about/loading.tsx`
- Create: `app/work/loading.tsx`
- Create: `app/bio/loading.tsx`

**Step 1: Build navigation from data**

`SiteHeader` must render navigation from `src/content/navigation.ts` using `.map()`.

**Step 2: Build branded loader**

Use `AN` logo, monochrome styling, subtle diagonal panel/fade. Do not copy the old fixed timeout logic from `components/loader.tsx`.

**Step 3: Add route loading files**

Use shared `PageLoader` for root, about, work, and bio loading states. Let `/bio` optionally pass a dark variant.

**Step 4: Verify reduced motion**

Add CSS that simplifies loader motion under `@media (prefers-reduced-motion: reduce)`.

**Step 5: Verify**

Run:

```bash
bun run lint
bun run typecheck
bun run build
```

**Step 6: Commit**

Commit message:

```bash
git add app src/components/layout
git commit -m "add : navigation and route loaders"
```

---

### Task 7: Homepage Hero

**Files:**

- Modify: `app/page.tsx`
- Create: `src/components/hero/hero-section.tsx`
- Create: `src/components/hero/hero-background.tsx`
- Create: `src/components/hero/hero-copy.tsx`
- Create: `src/components/hero/rotating-role.tsx`
- Create: `src/components/hero/hero-chat-preview.tsx`
- Create: `src/components/hero/hero-tool-strip.tsx`

**Step 1: Build static hero layout**

Match `docs/plans/hero_layout.png`: left copy, right large assistant panel, light-first background.

**Step 2: Build SVG/CSS background**

Use lightweight line systems, contours, wireframes, and particles. Keep opacity subtle.

**Step 3: Build rotating role component**

Use `src/content/hero-roles.ts`. Rotate every ~3200ms. Disable or simplify rotation for reduced motion. Prevent layout shift.

**Step 4: Build chatbot preview**

Render messages, side cards, quick actions, and typing indicator from `src/content/chatbot.ts` using `.map()`.

**Step 5: Verify responsive layout**

Manually inspect desktop and mobile by running `bun run dev`.

**Step 6: Verify**

Run:

```bash
bun run lint
bun run typecheck
bun run build
```

**Step 7: Commit**

Commit message:

```bash
git add app/page.tsx src/components/hero src/content
git commit -m "add : premium hero section"
```

---

### Task 8: Work Page With Filters

**Files:**

- Create: `app/work/page.tsx`
- Create: `src/components/work/project-grid.tsx`
- Create: `src/components/work/project-card.tsx`
- Create: `src/components/work/project-filters.tsx`
- Create: `src/components/work/experience-timeline.tsx`
- Modify: `src/lib/project-filters.ts`

**Step 1: Build project cards**

Each card must show thumbnail, title, description, type, position/responsibility, tags, stack, and links.

**Step 2: Build filters**

Support `All`, tags, type, and position/responsibility. Start with one primary active filter UI unless content volume justifies multi-select.

**Step 3: Build experience timeline**

Render entries from `src/content/experience.ts` using `.map()`.

**Step 4: Add empty state**

When no project matches, show a short message and a reset button.

**Step 5: Verify**

Run:

```bash
bun run lint
bun run typecheck
bun run build
```

**Step 6: Commit**

Commit message:

```bash
git add app/work src/components/work src/lib/project-filters.ts src/content/projects.ts src/content/experience.ts
git commit -m "add : filterable work page"
```

---

### Task 9: About Page

**Files:**

- Create: `app/about/page.tsx`
- Create: `src/components/about/about-hero.tsx`
- Create: `src/components/about/avatar-art.tsx`
- Create: `src/components/about/contact-card.tsx`

**Step 1: Build concise about layout**

Include art avatar, short profile copy, what Alfian builds, contact card, and social links.

**Step 2: Keep it simple**

Do not turn this page into a resume dump. Detailed career info belongs in `/work`.

**Step 3: Verify**

Run:

```bash
bun run lint
bun run typecheck
bun run build
```

**Step 4: Commit**

Commit message:

```bash
git add app/about src/components/about
git commit -m "add : about page"
```

---

### Task 10: Bio Page

**Files:**

- Create: `app/bio/page.tsx`
- Create: `src/components/bio/bio-card.tsx`
- Create: `src/components/bio/bio-actions.tsx`
- Create: `src/components/bio/bio-chat-preview.tsx`

**Step 1: Build modern link-in-bio page**

Include avatar/logo identity, short personal line, social links, action buttons, and chatbot preview entry.

**Step 2: Apply dark influence carefully**

Use old BioLayout colors as a controlled influence. Do not let `/bio` visually disconnect from V2.

**Step 3: Render actions from data**

Bio actions must come from content data and render with `.map()`.

**Step 4: Verify**

Run:

```bash
bun run lint
bun run typecheck
bun run build
```

**Step 5: Commit**

Commit message:

```bash
git add app/bio src/components/bio src/content
git commit -m "add : modern bio page"
```

---

### Task 11: Shared Chatbot Preview UI

**Files:**

- Create: `src/components/chat/chat-panel.tsx`
- Create: `src/components/chat/chat-message.tsx`
- Create: `src/components/chat/chat-input.tsx`
- Create: `src/components/chat/chat-quick-actions.tsx`
- Modify: `src/components/hero/hero-chat-preview.tsx`
- Modify: `src/components/bio/bio-chat-preview.tsx`

**Step 1: Extract shared chat primitives**

Move repeated chat UI from hero/bio into shared components.

**Step 2: Keep it as a mock**

No AI backend yet. Quick actions and messages are curated static content.

**Step 3: Ensure accessibility**

Input needs a label, buttons need accessible names, and message order must be readable.

**Step 4: Verify**

Run:

```bash
bun run lint
bun run typecheck
bun run build
```

**Step 5: Commit**

Commit message:

```bash
git add src/components/chat src/components/hero src/components/bio
git commit -m "add : chatbot preview ui"
```

---

### Task 12: Final QA And Polish

**Files:**

- Modify only files required by issues found during QA.

**Step 1: Run full checks**

Run:

```bash
bun run format:check
bun run lint
bun run typecheck
bun run build
```

**Step 2: Manual review checklist**

Verify:

- Desktop hero matches `docs/plans/hero_layout.png` direction.
- Mobile hero is readable and does not overflow.
- Loader does not force a 3-second wait.
- `/`, `/about`, `/work`, `/bio` all render.
- Work filters work and have empty state.
- No fake social proof exists.
- No repeated project/filter/chat/card TSX blocks that should be data-driven.
- Reduced motion mode is respected.
- SEO metadata exists for public pages.

**Step 3: Fix issues**

Make the smallest correct changes for issues found.

**Step 4: Re-run full checks**

Run:

```bash
bun run format:check
bun run lint
bun run typecheck
bun run build
```

**Step 5: Commit if changes were needed**

Commit message:

```bash
git add .
git commit -m "fix : polish portfolio v2 qa issues"
```

---

## Execution Handoff

Execute in order. Do not skip stack reset, design tokens, content data, SEO, layout, or loader to jump directly into hero visuals.

Recommended execution mode for this repo:

1. Complete one task.
2. Run the task's verification commands.
3. Commit the task.
4. Move to the next task only after checks pass.

If a verification command fails, stop and fix that task before continuing.
