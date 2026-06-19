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
| Lint                 | `bun run lint`         |
| Test                 | `bun run test`         |
| Format               | `bun run format`       |
| Typecheck            | `bun run typecheck`    |

### Rules

- NEVER use `npm`, `yarn`, or `pnpm`
- NEVER use `npx` — use `bunx` instead

## Stack

| Layer     | Tech            |
| --------- | --------------- |
| Framework | Next.js 16      |
| UI        | React 19        |
| Styling   | Tailwind CSS v4 |
| Language  | TypeScript 6    |
| Runtime   | Bun             |
| Linter    | ESLint 9        |
| Formatter | Prettier        |

## Workflow

### After Implementation

When a task or phase is complete and all checks pass:

1. Stage all changes: `git add .`
2. Commit with a descriptive message following conventional commit format:
   - `setup : ` for infrastructure changes
   - `add : ` for new features
   - `fix : ` for bug fixes
   - `refactor : ` for code restructuring
3. Verify no unstaged files remain: `git status`

## Status

**In Progress**

Full migration to Bun + Next.js 16 App Router + Tailwind v4 + TypeScript 6.

Completed so far:

1. Stack Reset To Bun + Modern Next
2. App Directory Cleanup And Base Layout
3. Shared UI Primitives And Logo
4. Typed Content Data
5. SEO Infrastructure
6. Shared Navigation And Loader
7. Homepage Hero
8. Work Page With Filters
9. About Page
10. Root App Structure Cleanup
11. Bio Page

Pending before n be called complete:

2. Shared Chatbot Preview UI
3. Final QA And Polish
