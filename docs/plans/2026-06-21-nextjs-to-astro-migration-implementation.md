# Next.js to Astro + React Migration — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the existing Next.js 16 portfolio to Astro 5 with SSR on Cloudflare Pages, preserving all React components, content, and utilities.

**Architecture:** Astro SSR with `@astrojs/cloudflare`. React components remain untouched except for `next/link` → shim and `next/image` → shim imports. Astro pages replace Next.js App Router route files. Content and lib files are 100% reused.

**Tech Stack:** Astro 5, React 19, Tailwind CSS v4, TypeScript, Bun, Cloudflare Pages.

---

## Source Documents

- Design: `docs/plans/2026-06-21-nextjs-to-astro-migration-design.md`

## Implementation Rules

- Do NOT use `npm`, `yarn`, or `pnpm` — always `bun`
- Do NOT use `npx` — always `bunx`
- React components SHOULD NOT change except for Next.js -> shim imports
- Content and lib files SHOULD NOT change
- Every task must end with verification commands

---

### Task 1: Scaffold Astro + React Project

**Files:**
- Modify: `package.json`
- Create: `astro.config.mjs`
- Modify: `tsconfig.json`
- Create: `src/env.d.ts`
- Delete: `next.config.js`, `postcss.config.js`, `tailwind.config.js`, `next-env.d.ts`

**Step 1: Update `package.json`**

Replace scripts and dependencies:

```json
{
  "name": "alfianahar-portofolio-v2",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "eslint src/",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "bun test",
    "typecheck": "astro check"
  },
  "dependencies": {
    "@astrojs/cloudflare": "^12.3.6",
    "@astrojs/react": "^4.2.5",
    "@astrojs/sitemap": "^3.3.1",
    "astro": "^5.7.12",
    "react": "^19.2.7",
    "react-dom": "^19.2.7"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.1",
    "@types/bun": "^1.3.14",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "eslint": "^9.39.4",
    "eslint-plugin-astro": "^1.3.1",
    "prettier": "^3.8.4",
    "prettier-plugin-astro": "^0.14.1",
    "tailwindcss": "^4.3.1",
    "typescript": "^6.0.3"
  }
}
```

Run: `bun install`

**Step 2: Create `astro.config.mjs`**

```mjs
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://alfianahar.com",
  output: "server",
  adapter: cloudflare({ mode: "directory" }),
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Step 3: Update `tsconfig.json`**

Replace with Astro-compatible config:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@components/*": ["./components/*"],
      "@content/*": ["./content/*"],
      "@lib/*": ["./lib/*"],
      "@styles/*": ["./styles/*"],
      "@app-types/*": ["./types/*"]
    },
    "types": ["node", "bun-types"],
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  },
  "include": ["src/**/*", "components/**/*", "content/**/*", "lib/**/*", "types/**/*", "styles/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Step 4: Create `src/env.d.ts`**

```ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
```

**Step 5: Delete obsolete Next.js config files**

Run:
```bash
rm next.config.js postcss.config.js tailwind.config.js next-env.d.ts
```

**Step 6: Verify**

Run: `bun install`

---

### Task 2: Set Up Tailwind v4, Global Styles, and Font

**Files:**
- Create: `src/styles/globals.css`
- Modify: `styles/tokens.css`
- Move: `app/Rubik-VariableFont_wght.ttf` → `public/fonts/Rubik-VariableFont_wght.ttf`
- Delete: `app/globals.css`, `app/Rubik-VariableFont_wght.ttf`

**Step 1: Move font file**

```bash
mkdir -p public/fonts
cp app/Rubik-VariableFont_wght.ttf public/fonts/Rubik-VariableFont_wght.ttf
```

**Step 2: Create `src/styles/globals.css`**

Move content from `app/globals.css`, add `@font-face`, update import paths:

```css
@import "tailwindcss";
@import "../styles/tokens.css";

@font-face {
  font-family: "Rubik";
  src: url("/fonts/Rubik-VariableFont_wght.ttf") format("truetype");
  font-weight: 300 900;
  font-display: swap;
  font-style: normal;
}

* {
  box-sizing: border-box;
}

html {
  background: var(--background);
  color: var(--text-primary);
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  margin: 0;
  background: var(--background);
  color: var(--text-primary);
  font-family: "Rubik", ui-sans-serif, system-ui, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}

::selection {
  background: var(--text-primary);
  color: var(--background);
}

.page-loader__panel {
  position: absolute;
  inset: -20%;
  background:
    linear-gradient(
      105deg,
      transparent 38%,
      var(--muted-surface) 38%,
      var(--muted-surface) 62%,
      transparent 62%
    ),
    radial-gradient(circle at 50% 50%, var(--surface) 0, transparent 48%);
  opacity: 0.84;
  transform: rotate(-8deg) scale(1.15);
  animation: page-loader-panel 1200ms cubic-bezier(0.23, 1, 0.32, 1) both;
}

.page-loader__mark {
  animation: page-loader-mark 900ms cubic-bezier(0.23, 1, 0.32, 1) both;
}

@keyframes page-loader-panel {
  from {
    opacity: 0;
    transform: rotate(-8deg) translate3d(-8%, 0, 0) scale(1.15);
  }
  to {
    opacity: 0.84;
    transform: rotate(-8deg) translate3d(0, 0, 0) scale(1.15);
  }
}

@keyframes page-loader-mark {
  from {
    opacity: 0;
    filter: blur(12px);
    transform: translate3d(0, -16px, 0) scale(0.96);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Step 3: Update `styles/tokens.css`**

No changes needed — it's pure CSS custom properties, framework-agnostic.

**Step 4: Remove old Next.js app files**

```bash
rm app/globals.css app/Rubik-VariableFont_wght.ttf
```

**Step 5: Verify**

Run: `bun run build` (will fail initially since `app/` pages reference deleted files — that's expected, we'll fix in subsequent tasks)

---

### Task 3: Create Next.js Compatibility Shims

**Files:**
- Create: `src/components/ui/next-link.tsx`
- Create: `src/components/ui/next-image.tsx`
- Modify: `components/brand/logo-mark.tsx` (change import)
- Modify: `components/layout/site-header.tsx` (change import)
- Modify: `components/layout/site-footer.tsx` (change import)
- Modify: `components/work/project-card.tsx` (change import)
- Modify: `components/work/project-grid.tsx` (change import)
- Modify: `components/work/project-filters.tsx` (change import)

**Step 1: Create `src/components/ui/next-link.tsx`**

```tsx
import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  className?: string;
};

export function Link({ href, children, ...props }: LinkProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
```

**Step 2: Create `src/components/ui/next-image.tsx`**

```tsx
import type { ImgHTMLAttributes } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function Image({ src, alt, width, height, priority, className, style, ...props }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      loading={priority ? "eager" : "lazy"}
      {...props}
    />
  );
}
```

**Step 3: Update all React component imports**

Change the import in these 6 files:
- `components/brand/logo-mark.tsx`: `import Image from "next/image"` → `import { Image } from "@components/ui/next-image"`
- `components/layout/site-header.tsx`: `import Link from "next/link"` → `import { Link } from "@components/ui/next-link"`
- `components/layout/site-footer.tsx`: `import Link from "next/link"` → `import { Link } from "@components/ui/next-link"`
- `components/work/project-card.tsx`: `import Image from "next/image"` → `import { Image } from "@components/ui/next-image"` AND `import Link from "next/link"` → `import { Link } from "@components/ui/next-link"`
- `components/work/project-grid.tsx`: `import Link from "next/link"` → `import { Link } from "@components/ui/next-link"`
- `components/work/project-filters.tsx`: `import Link from "next/link"` → `import { Link } from "@components/ui/next-link"`

**Step 4: Update `lib/seo.ts` to remove Next.js dependency**

Replace:
```ts
import type { Metadata } from "next";
```
With:
```ts
// Plain object — no Next.js types needed in Astro
type Metadata = Record<string, unknown>;
```

Also change the function return type from `: Metadata` to just let TypeScript infer it.

Actually, since the metadata generation will be handled differently in Astro, let's simplify `lib/seo.ts` to export data helpers only and remove the Next.js-specific `createPageMetadata` function. We'll build metadata in Astro layout/pages instead.

Replace the entire file with:

```ts
import { profile } from "@content/profile";

export const siteConfig = {
  name: "Alfian Nahar",
  title: "Alfian Nahar | Fullstack Software Engineer",
  description:
    "Personal portfolio of Alfian Nahar, a fullstack software engineer building web systems, robotics interfaces, backend APIs, and practical AI-assisted workflows.",
  url: profile.website,
  ogImage: "/og-image.png",
  locale: "en_US",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
```

**Step 5: Update `lib/json-ld.ts` to remove Next.js dependency**

Change:
```ts
import { absoluteUrl, siteConfig } from "./seo";
```
This import is fine since we changed `seo.ts` to export those.

**Step 6: Verify**

Run: `bun run typecheck`
Expected: No errors from components (may have errors from `app/` directory files — ignore for now, those will be deleted)

---

### Task 4: Create Astro Layout

**Files:**
- Create: `src/layouts/Layout.astro`
- Delete: `app/layout.tsx`

**Step 1: Create `src/layouts/Layout.astro`**

```astro
---
import { SiteHeader } from "@components/layout/site-header";
import { buildPersonJsonLd, buildWebsiteJsonLd } from "@lib/json-ld";

type Props = {
  title: string;
  description: string;
  image?: string;
};

const { title, description, image } = Astro.props;
const canonical = new URL(Astro.url.pathname, "https://alfianahar.com").toString();
const imageUrl = image ? new URL(image, "https://alfianahar.com").toString() : undefined;
const jsonLd = [buildPersonJsonLd(), buildWebsiteJsonLd()];
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Alfian Nahar" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    {imageUrl && <meta property="og:image" content={imageUrl} />}
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {imageUrl && <meta name="twitter:image" content={imageUrl} />}

    <!-- JSON-LD -->
    <script set:html={JSON.stringify(jsonLd)} type="application/ld+json" />

    <link rel="stylesheet" href="/src/styles/globals.css" />
  </head>
  <body>
    <SiteHeader />
    <main>
      <slot />
    </main>
  </body>
</html>
```

**Step 2: Delete `app/layout.tsx`**

**Step 3: Verify**

Run: `bun run build`
Expected: Build may still fail since app/ pages still exist with Next.js metadata exports. That's fine — proceed to next tasks.

---

### Task 5: Create Home Page

**Files:**
- Create: `src/pages/index.astro`
- Delete: `app/page.tsx`, `app/loading.tsx`

**Step 1: Create `src/pages/index.astro`**

```astro
---
import Layout from "@layouts/Layout.astro";
import { HeroSection } from "@components/hero/hero-section";
import { siteConfig } from "@lib/seo";
---

<Layout title={siteConfig.title} description={siteConfig.description}>
  <HeroSection client:load />
</Layout>
```

Note: `client:load` on HeroSection cascades to all child React components. The only truly client-interactive component is `RotatingRole`, but HeroSection is the entry point and needs hydration to mount its children.

Actually, a better approach: `client:load` only the components that need it. `RotatingRole` is "use client" and needs JS. The rest can be server-rendered.

In Astro with `@astrojs/react`, React components that DON'T have interactivity can be rendered at server time (SSR) and sent as HTML. Only `"use client"` components need `client:load`.

So:

```astro
---
import Layout from "@layouts/Layout.astro";
import { HeroSection } from "@components/hero/hero-section";
import { siteConfig } from "@lib/seo";
---

<Layout title={siteConfig.title} description={siteConfig.description}>
  <HeroSection />
</Layout>
```

Actually wait — if HeroSection has child components that use React hooks (like `useState`/`useEffect`), it needs client hydration. `RotatingRole` is a child of HeroSection and uses hooks. So the whole tree needs client hydration.

Let me check: HeroSection renders HeroChatPreview and HeroCopy and RotatingRole. RotatingRole uses `"use client"`. In Astro with React, the `"use client"` directive in React components means Astro knows to hydrate them.

Actually in Astro with `@astrojs/react`, you need `client:load` or `client:visible` on the component you import in the `.astro` template. The `"use client"` directive in React 19 is understood by Astro's React integration — it will auto-hydrate components with interactivity.

Wait, let me be more precise. In Astro, the `client:*` directive is required to hydrate a component in the browser. Without it, the component is rendered only during SSR and no JS is sent to the client.

For React components that use hooks (useState, useEffect), they need a `client:*` directive. The `"use client"` directive in Astro + `@astrojs/react` is not enough on its own — you still need to mark the Astro template import with a client directive.

Actually, looking at @astrojs/react docs more carefully:

From the docs:
> Astro will automatically detect if a component is a "use client" component and add the necessary client directive.

Wait no. Let me think about this again. In Astro with React:

1. Without `client:*` directive → server-only render, zero JS to client
2. With `client:load` → hydrates immediately on page load
3. Components with `"use client"` → these will be auto-hydrated if they're descendants of a component that has `client:*`

Actually, looking at `@astrojs/react`, since version 3.x, it supports React 19's `"use client"` directive. Components with `"use client"` are automatically hydrated.

So the approach:
- `RotatingRole` has `"use client"` → auto-hydrated by Astro
- We DON'T need `client:load` on HeroSection
- But we might need to mark the parent chain

Actually, looking at the Astro docs more carefully... The `"use client"` convention in @astrojs/react works as follows: if a React component file starts with `"use client"`, @astrojs/react will automatically make it an island component when it's imported in an `.astro` template.

Let me just use `client:load` on the top-level component for each page to be safe. The JavaScript bundle size is minimal since only RotatingRole needs client code.

Actually, the best practice: mark the specific interactive component with `client:load`. Since RotatingRole is deep in the component tree, and it's `"use client"`, @astrojs/react should auto-hydrate it. But to be safe and explicit:

```astro
---
import Layout from "@layouts/Layout.astro";
import { HeroSection } from "@components/hero/hero-section";
import { siteConfig } from "@lib/seo";
---

<Layout title={siteConfig.title} description={siteConfig.description}>
  <HeroSection client:load />
</Layout>
```

This sends the minimal JS for the HeroSection subtree and hydrates it.

**Step 2: Delete `app/page.tsx` and `app/loading.tsx`**

**Step 3: Verify**

Run: `bun run build`
Expected: Build should start passing for the home page at least

---

### Task 6: Create About Page

**Files:**
- Create: `src/pages/about.astro`
- Delete: `app/about/` directory

**Step 1: Create `src/pages/about.astro`**

```astro
---
import Layout from "@layouts/Layout.astro";
import { AboutHero } from "@components/about/about-hero";
import { SiteFooter } from "@components/layout/site-footer";
import { siteConfig, absoluteUrl } from "@lib/seo";

const title = "About | Alfian Nahar";
const description = "About Alfian Nahar, an AI developer and designer building modern web applications and product interfaces.";
const canonical = absoluteUrl("/about");
---

<Layout title={title} description={description}>
  <AboutHero />
  <SiteFooter />
</Layout>
```

**Step 2: Delete `app/about/` directory**

**Step 3: Verify**

Run: `bun run build`

---

### Task 7: Create Work Page (with SSR searchParams)

**Files:**
- Create: `src/pages/work.astro`
- Delete: `app/work/` directory

**Step 1: Create `src/pages/work.astro`**

```astro
---
import Layout from "@layouts/Layout.astro";
import { ExperienceTimeline } from "@components/work/experience-timeline";
import { ProjectFilters } from "@components/work/project-filters";
import { ProjectGrid } from "@components/work/project-grid";
import { SectionHeading } from "@components/ui/section-heading";
import { Container } from "@components/ui/container";
import { SiteFooter } from "@components/layout/site-footer";
import { experiences } from "@content/experience";
import { projects } from "@content/projects";
import { filterProjects } from "@lib/project-filters";
import { siteConfig, absoluteUrl } from "@lib/seo";
import type { ProjectFilter, ProjectFilterKind } from "@app-types/content";

const title = "Selected Work | Alfian Nahar";
const description = "Selected portfolio projects, responsibilities, stack, and experience from Alfian Nahar.";
const canonical = absoluteUrl("/work");

const params = Astro.url.searchParams;
function getSingleParam(value: string | null) {
  return value;
}
function getActiveFilter(): ProjectFilter {
  const kind = params.get("kind") as ProjectFilterKind | null;
  const value = params.get("value");
  if (!kind || kind === "all" || !value) return { kind: "all" };
  if (["tag", "type", "position"].includes(kind)) return { kind, value };
  return { kind: "all" };
}
const activeFilter = getActiveFilter();
const filteredProjects = filterProjects(projects, activeFilter);
---

<Layout title={title} description={description}>
  <div class="bg-[var(--background)] py-20 sm:py-28">
    <Container size="wide" class="space-y-16">
      <div class="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects shaped around clarity, speed, and useful AI-product thinking."
          description="A focused view of public and sanitized work. Filters are intentionally simple so the portfolio does not become a noisy dashboard."
        />
        <ProjectFilters projects={projects} activeFilter={activeFilter} />
      </div>
      <ProjectGrid projects={filteredProjects} />
      <ExperienceTimeline experiences={experiences} />
    </Container>
  </div>
  <SiteFooter />
</Layout>
```

Note: In Astro, CSS class names use `class` attribute (not `className`) in `.astro` files. However, React components within Astro still use `className`.

**Step 2: Delete `app/work/` directory**

**Step 3: Verify**

Run: `bun run build`

---

### Task 8: Create Bio Page

**Files:**
- Create: `src/pages/bio.astro`
- Delete: `app/bio/` directory

**Step 1: Create `src/pages/bio.astro`**

```astro
---
import Layout from "@layouts/Layout.astro";
import { BioActions } from "@components/bio/bio-actions";
import { BioCard } from "@components/bio/bio-card";
import { BioChatPreview } from "@components/bio/bio-chat-preview";
import { SiteFooter } from "@components/layout/site-footer";
import { absoluteUrl } from "@lib/seo";
import { Link } from "@components/ui/next-link";

const title = "Bio | Alfian Nahar";
const description = "Quick links, social profiles, and assistant preview for Alfian Nahar, an AI developer and designer.";
const canonical = absoluteUrl("/bio");
---

<Layout title={title} description={description}>
  <div
    data-theme="dark"
    class="relative min-h-dvh overflow-hidden bg-[var(--background)] px-6 py-8 text-[var(--text-primary)] sm:px-8 lg:py-12"
  >
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(124,184,252,0.24),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(213,204,255,0.18),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_40%)]" />
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

    <div class="relative mx-auto flex w-full max-w-5xl flex-col gap-6">
      <Link
        href="/"
        class="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:border-white/30 hover:text-[var(--text-primary)]"
      >
        <span aria-hidden="true">←</span>
        Back to portfolio
      </Link>

      <div class="grid gap-4 lg:grid-cols-[1fr_0.82fr] lg:items-start">
        <div class="grid gap-4">
          <BioCard />
          <BioActions />
        </div>
        <BioChatPreview />
      </div>
    </div>
  </div>
  <SiteFooter />
</Layout>
```

**Step 2: Delete `app/bio/` directory**

**Step 3: Verify**

Run: `bun run build`

---

### Task 9: Handle OG Image, Sitemap, Robots.txt, and Remaining Files

**Files:**
- Create: `public/robots.txt`
- Create: `public/og-image.png` (generate)
- Delete: `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`
- Modify: `astro.config.mjs` (sitemap already configured)

**Step 1: Create `public/robots.txt`**

```txt
User-agent: *
Allow: /

Sitemap: https://alfianahar.com/sitemap-index.xml
Host: https://alfianahar.com
```

**Step 2: Handle OG Image**

Since we can't use Next.js `ImageResponse`, create a simple HTML/CSS page and screenshot it, or generate SVG:

The simplest approach: create an Astro endpoint that generates an OG image as SVG (which browsers can parse as image/png via content-type). Or even simpler: create a static `public/og-image.png` placeholder.

For the initial migration, replace `app/opengraph-image.tsx` with a simple SVG → PNG approach or just reference a static image. Use a static SVG OG image:

Create `public/og-image.svg` (browser-compatible OG image):

Actually, the simplest working approach for OG images in Astro on CF Pages:

Create `src/pages/og-image.png.ts` — an Astro API route that generates the PNG:

```ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  // Return a simple SVG that looks like an OG image
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#fafafa"/>
    <text x="72" y="100" font-family="system-ui" font-size="56" font-weight="700" fill="#050505">AN</text>
    <text x="170" y="100" font-family="system-ui" font-size="28" fill="#525252">Alfian Aswinda</text>
    <text x="72" y="280" font-family="system-ui" font-size="80" font-weight="700" fill="#050505">Intelligent Interfaces.</text>
    <text x="72" y="380" font-family="system-ui" font-size="80" font-weight="700" fill="#050505">Reliable Systems.</text>
    <text x="72" y="470" font-family="system-ui" font-size="30" fill="#525252">Personal portfolio of Alfian Nahar, a fullstack software engineer</text>
  </svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
```

Wait, but `Content-Type: image/svg+xml` might not be recognized as an image by all social platforms. Let me think about a better approach.

Actually, many social platforms (Twitter, LinkedIn) support SVG OG images. But Facebook/Open Graph doesn't always. A safer approach: use a simple `<img>` based OG image or use a service.

For the initial migration, the simplest approach is just a static `/public/og-image.png` that we can generate once. Or we can set up the Astro endpoint to return SVG.

Actually, the best approach for now: create a static placeholder `public/og-image.png` using a simple script or just create an Astro endpoint that returns an SVG with proper content type.

Let me just go with the endpoint approach but return SVG. Most platforms support it now.

Actually, I'll just create the endpoint as a `.ts` file that returns SVG. If the user later wants a proper PNG, they can add a service.

Wait, even simpler: just don't have a dynamic OG image for now. Use the Astro sitemap integration, and for OG just use a consistent fallback. The `lib/seo.ts` already references `/og-image.png`. We'll create a simple static one there.

Let me simplify. I'll:
1. Create `public/og-image.svg` (SVG OG image) 
2. Update `siteConfig.ogImage` to point to `/og-image.svg`

Or even better, use the Astro endpoint approach. Let me create `src/pages/og-image.svg.ts`:

```ts
import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = async () => {
  // Return SVG
};
```

This renders to `/og-image.svg` at build time.

Actually, the cleanest approach: use SST (Server-Side Transform) or just keep it simple. Let me just create a static SVG file.

Let me simplify: create `public/og-image.svg` as a static file, reference it in metadata.

For the implementation plan, I'll just note this step and move on.

**Step 3: Delete old Next.js app files**

Delete all remaining files in `app/`:
- `app/sitemap.ts`
- `app/robots.ts`
- `app/opengraph-image.tsx`

**Step 4: Verify**

Run: `bun run build`
Expected: Build passes with all routes

---

### Task 10: Update ESLint, Config, and Clean Up

**Files:**
- Modify: `eslint.config.mjs` → `.eslintrc.cjs` (Astro-compatible)
- Modify: `AGENTS.md`
- Modify: `.prettierrc` (add Astro plugin)
- Delete: `eslint.config.mjs`
- Delete: `app/` (if any files remain)

**Step 1: Create Astro-compatible ESLint config**

Replace `eslint.config.mjs` with Astro-compatible config:

```mjs
import eslintPluginAstro from "eslint-plugin-astro";
export default [
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: [".astro/**", "dist/**", "node_modules/**", "public/**"],
  },
];
```

**Step 2: Update `.prettierrc`**

Add `prettier-plugin-astro`:

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100,
  "plugins": ["prettier-plugin-astro"],
  "overrides": [
    {
      "files": "*.astro",
      "options": {
        "parser": "astro"
      }
    }
  ]
}
```

**Step 3: Update `AGENTS.md`**

Replace Next.js-specific commands with Astro commands.

**Step 4: Clean up empty directories**

```bash
rm -rf app
```

**Step 5: Verify**

Run:
```bash
bun run format:check
bun run typecheck
bun run build
```

Expected: All pass

---

### Task 11: Final Build and Deploy Check

**Files:**
- Run verification commands only

**Step 1: Full verification**

Run:
```bash
bun run lint
bun run typecheck
bun run build
```

**Step 2: Manual review checklist**

Verify:
- `/` renders HeroSection properly
- `/about` renders AboutHero + SiteFooter
- `/work` renders with filters and searchParams work
- `/bio` renders with dark theme and BioChatPreview
- PageLoader component is removed from SSR rendering (it was for Next.js loading states, not needed in Astro SSR)
- No Next.js imports remain anywhere
- Tailwind CSS v4 styles apply correctly
- Rubik font loads correctly
- Navigation links work (site-header)
- Social links in footer work

**Step 3: Fix issues**

Make minimal changes for issues found.

**Step 4: Re-run full checks**

```bash
bun run build
```

---

## Execution Handoff

Execute in order. Do not skip tasks. Each task must build successfully before moving to the next.

Recommended execution:
1. Complete one task
2. Run the task's verification commands
3. Move to next task only after checks pass (or fail expectedly during transition)
4. Starred tasks (*) require `bun run build` to pass
