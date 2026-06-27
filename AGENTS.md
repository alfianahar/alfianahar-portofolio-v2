# AGENTS.md — alfianahar-portofolio-v2

## Package Manager

**ALWAYS use `bun`** for all operations.

### Commands

| Task                 | Command                |
| -------------------- | ---------------------- |
| Install dependencies | `bun install`          |
| Add dependency       | `bun add <package>`    |
| Add dev dependency   | `bun add -d <package>` |
| Dev server           | `bun run dev`          |
| Build                | `bun run build`        |
| Preview              | `bun run preview`      |
| Lint                 | `bun run lint`         |
| Test                 | `bun run test`         |
| Format               | `bun run format`       |
| Typecheck            | `bun run typecheck`    |

### Rules

- NEVER use `npm`, `yarn`, or `pnpm`
- NEVER use `npx` — use `bunx` instead

## Stack

| Layer      | Tech               |
| ---------- | ------------------ |
| Framework  | Astro 5            |
| UI         | React 19 (islands) |
| Styling    | Tailwind CSS v4    |
| Language   | TypeScript 6       |
| Runtime    | Bun                |
| Linter     | ESLint 9           |
| Formatter  | Prettier           |
| Deployment | Cloudflare Pages   |

## Skills

- **ponytail** — Always invoke this skill via `/ponytail` before writing implementation code. Apply the laziness ladder: question whether it needs to exist, reach for stdlib first, use native features before dependencies, use already-installed deps before adding new ones, shortest code first. No unrequested abstractions, no boilerplate "for later".

## Workflow

### During Implementation

- Load skill `/ponytail` before writing any code. Follow the laziness ladder: YAGNI → stdlib → native → existing deps → one-liner → minimum code.

### After Implementation

When a task or phase is complete and all checks pass:

1. Stage all changes: `git add .`
2. Commit with a descriptive message following conventional commit format:
   - `setup : ` for infrastructure changes
   - `add : ` for new features
   - `fix : ` for bug fixes
   - `refactor : ` for code restructuring
3. Verify no unstaged files remain: `git status`

## Portfolio Workflow

When asked to add a work portfolio entry, target directory is `src/content/projects/`.

### Template (follow exactly)

```markdown
---
title: "Project Name"
description: "One-line description covering what was built and what it achieved."
tags: ["Tag1", "Tag2"]
role: "Your Role"
position: ["lead", "fullstack"]
type: "from scratch" | "redesign" | "maintenance"
stack: ["Tech1", "Tech2"]
cover: "../../assets/projects/<project-slug>/cover.svg"
coverAlt: "Project preview"
year: 2026
status: "active"
featured: true
order: <next number>
---

## Problem

<What problem existed?>

## Solution

<What was built?>

## Outcome

<What was delivered?>
```

### Steps

1. Create markdown file: `src/content/projects/<project-slug>.md`
2. Create cover dir: `src/assets/projects/<project-slug>/`
3. Add `cover.svg` in that dir (generate or placeholder)
4. Fill frontmatter + Problem/Solution/Outcome sections
5. Run `bun run build` to verify no errors

### Rules

- Slug = lowercase, hyphenated project name
- Cover image path must be relative: `../../assets/projects/<slug>/cover.svg`
- `order` = next available number (check existing files)
- Tags: use existing tag vocabulary when possible (Portfolio, Frontend, Backend, Full-Stack, Enterprise, SEO, UI/UX, etc.)

## Status

**Complete**

Full migration from Next.js 16 to Astro 5 + React 19 on Cloudflare Pages.

See `README.md` for detailed task progress.
