# Root App Structure Cleanup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove the half-migrated `src` and legacy root component split so the project uses root `app` routes plus root shared folders.

**Architecture:** Keep `app/` as the App Router entrypoint and route convention folder. Move shared application code to root folders (`components`, `content`, `lib`, `styles`, `types`) and access them through TypeScript path aliases. Delete legacy root files that duplicate the migrated component tree.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6, Tailwind CSS v4, Bun.

---

### Task 1: Move Shared Source Folders

**Files:**
- Move: `src/components/*` to `components/*`
- Move: `src/content/*` to `content/*`
- Move: `src/lib/*` to `lib/*`
- Move: `src/styles/*` to `styles/*`
- Move: `src/types/*` to `types/*`

**Steps:**
1. Remove legacy root `components` files before moving the migrated component tree.
2. Move shared source folders to root-level project folders.
3. Remove empty `src/` after all files are moved.

### Task 2: Normalize App Route Files

**Files:**
- Move: `app/bio/page.js` to `app/bio/page.tsx`
- Delete: `app/bio/layout.js`

**Steps:**
1. Convert the `/bio` placeholder route to TSX.
2. Delete the empty bio layout because it adds no behavior.

### Task 3: Configure Root Aliases

**Files:**
- Modify: `tsconfig.json`
- Modify: `app/globals.css`
- Modify: imports in `app/**`, `components/**`, and tests

**Steps:**
1. Add aliases for `@components`, `@content`, `@lib`, `@styles`, and `@app-types`.
2. Replace `../src/*` and internal relative imports where root aliases improve clarity.
3. Update the CSS token import to `../styles/tokens.css`.

### Task 4: Verify

**Commands:**
- `bun run lint`
- `bun run typecheck`
- `bun run build`

Expected: all commands pass after the structure cleanup.
