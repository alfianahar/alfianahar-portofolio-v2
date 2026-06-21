# Next.js to Astro + React Migration Design

## Goal

Migrate the existing Next.js 16 portfolio to Astro with SSR on Cloudflare Pages while preserving the current UX, routing structure, data fetching behavior, and all React components.

## Target Stack

| Layer        | Tech                              |
| ------------ | --------------------------------- |
| Framework    | Astro 5                           |
| UI           | React 19 (embedded via islands)   |
| Styling      | Tailwind CSS v4 (@tailwindcss/vite) |
| Language     | TypeScript                        |
| Runtime      | Bun                               |
| Deployment   | Cloudflare Pages (SSR)            |
| Adapter      | @astrojs/cloudflare               |

## Why Astro + React

- **Zero JS by default** — most pages ship zero client JS, perfect for SEO
- **React components tetap utuh** — semua 30 component files bisa dipakai ulang
- **SSR di Cloudflare Pages mature** — `@astrojs/cloudflare` sudah battle-tested
- **Content site ideal** — portfolio adalah use case sempurna buat Astro
- **Island architecture** — hanya `RotatingRole` (1 dari 30 components) yang butuh client JS

## Architecture

```
src/
├── pages/
│   ├── index.astro          # Home → renders <HeroSection /> via React
│   ├── about.astro          # About → renders <AboutHero /> + <SiteFooter />
│   ├── work.astro           # Work → SSR, baca searchParams, filter projects
│   └── bio.astro            # Bio → renders <BioCard /> + ... + <SiteFooter />
├── layouts/
│   └── Layout.astro         # HTML shell + <SiteHeader /> + slot
├── components/              # TETAP — semua React components existing
├── content/                 # TETAP — content files
├── lib/                     # TETAP — utilities
├── types/                   # TETAP — type definitions
└── styles/
    ├── tokens.css           # TETAP
    └── globals.css          # Pindah dari app/globals.css
```

## Routing Map

| Sebelum (Next.js)      | Sesudah (Astro)          |
| ---------------------- | ------------------------ |
| `app/page.tsx`           | `src/pages/index.astro`    |
| `app/layout.tsx`         | `src/layouts/Layout.astro` |
| `app/about/page.tsx`     | `src/pages/about.astro`    |
| `app/work/page.tsx`      | `src/pages/work.astro`     |
| `app/bio/page.tsx`       | `src/pages/bio.astro`      |
| `app/loading.tsx`        | Dihapus (SSR)              |
| `app/globals.css`        | `src/styles/globals.css`   |

## Next.js → Astro API Migration

| Next.js API               | Astro equivalent                |
| ------------------------- | ------------------------------- |
| `next/link` Link          | `<a>` atau custom Link wrapper  |
| `next/image` Image        | `<img>` atau Astro `<Image />`    |
| `next/font/local`         | CSS `@font-face` di Layout      |
| `export const metadata`   | `export const head` / head      |
| `generateMetadata()`      | Build helper di Astro page      |
| `ImageResponse` (OG)      | Static PNG di public/           |
| `sitemap.ts`              | `@astrojs/sitemap` integration  |
| `robots.ts`               | `public/robots.txt` static file |
| `searchParams` (async)    | `Astro.url.searchParams`        |

## File yang Tetap Utuh (No Changes)

- `components/**/*` — 30 React component files
- `components/**/*.test.tsx` — 8 test files
- `content/**/*` — 8 data files
- `lib/**/*` — 4 utility files
- `types/**/*` — 2 type definition files
- `styles/tokens.css` — CSS custom properties
- `public/**/*` — assets

## File yang Berubah / Baru

**Baru:**
- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/work.astro`
- `src/pages/bio.astro`
- `src/layouts/Layout.astro`
- `src/styles/globals.css` (pindahan dari `app/globals.css`)
- `astro.config.ts`
- `public/robots.txt`

**Hapus:**
- `app/` directory (semua isinya)
- `next.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `eslint.config.mjs`
- `next-env.d.ts`

**Ubah:**
- `package.json` — ganti scripts + dependencies
- `tsconfig.json` — update untuk Astro
- `AGENTS.md` — update commands

## Data Flow

```
content/*.ts → Astro page → import React component → render di SSR
                  ↑
              lib/*.ts (pure functions, unchanged)
```

Work page: Astro baca `Astro.url.searchParams`, hitung filter, pass sebagai props ke `<ProjectGrid />`.

## Client Component

Hanya 1 component yang butuh client JS:
- `RotatingRole` (useEffect interval) → Astro `client:load` directive

Sisanya server-render di SSR Cloudflare, zero client JS.

## SEO

- Astro built-in `<Head>` untuk per-page metadata
- `@astrojs/sitemap` untuk sitemap generation
- `public/robots.txt` static
- OG image: generate static PNG, simpan di `public/`
- JSON-LD: inject via `<script set:html>` di Layout

## Tailwind CSS v4

Pindah dari PostCSS plugin ke `@tailwindcss/vite`:
- `@tailwindcss/vite` plugin di `astro.config.ts`
- `@import "tailwindcss"` di `globals.css`
- `tokens.css` tetap sebagai CSS custom properties
- `tailwind.config.js` dihapus (v4 CSS-based)

## Testing

Test files existing tetap jalan via `bun:test`. Tidak ada perubahan.

## Deployment

- Cloudflare Pages SSR via `@astrojs/cloudflare`
- `astro.config.ts` dengan `adapter: cloudflare({ mode: "directory" })`
- Build output: `wrangler` / `dist/`

## Success Criteria

- Semua 4 routes render dengan benar (`/`, `/about`, `/work`, `/bio`)
- Work page filtering berfungsi (searchParams SSR)
- SEO metadata ada di setiap page
- Sitemap dan robots.txt berfungsi
- `bun run lint`, `bun run typecheck`, `bun run build` pass
- Deploy ke Cloudflare Pages via wrangler
