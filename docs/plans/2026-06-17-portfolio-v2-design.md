# Portfolio V2 Product and Design PRD

Status: Approved for planning  
Branch: `rewrite/v2-new-stack`  
Primary asset: `public/an-logo.svg`  
Date: 2026-06-17

## Objective

Build Portfolio V2 as a premium personal portfolio for Alfian Nahar. The site should feel like a modern AI and technology product while remaining honest as a personal brand, not a fake startup landing page.

The experience should communicate that Alfian designs and builds intelligent digital products, web applications, AI-assisted workflows, and reliable modern interfaces.

## Positioning

Portfolio V2 should position Alfian as a practical builder with a refined eye for interface design and modern engineering systems.

The site should answer these questions quickly:

- Who is Alfian?
- What does he build?
- What kind of projects and experience does he have?
- How can someone contact him?
- Can the AI assistant help visitors understand his work faster?

## Core Principles

- Light theme first.
- Premium monochrome visual language.
- Personal brand before startup fantasy.
- AI chatbot as a useful signature interaction, not a gimmick.
- Strong typography, generous whitespace, and subtle motion.
- Keep the content direct, credible, and easy to scan.
- Dark theme may exist, but it should be secondary.

## Site Structure

The initial site should include these routes:

- `/` for the main landing page and approved hero section.
- `/about` for a simple personal profile, art avatar, short story, and contact.
- `/work` for portfolio projects and experience.
- `/bio` for a modern link-in-bio page with AI assistant.

Navigation should include:

- Services
- Work
- About
- Blog
- Contact

If a full contact page is not built in the first version, Contact can route to the contact section in `/about`.

## Recommended Tech Stack

Portfolio V2 should use a modern, type-safe frontend stack that supports strong design execution without creating unnecessary infrastructure work.

Recommended stack:

- Bun `1.3.3` or newer stable release as the package manager and local script runner.
- Next.js `16.2.9` or newer stable release with App Router.
- React `19.2.7` or newer stable release.
- TypeScript `6.0.3` or newer stable release.
- Tailwind CSS `4.3.1` or newer stable release for utility styling.
- ESLint `10.5.0` or newer stable release for code quality rules.
- Prettier `3.8.4` or newer stable release for consistent formatting.
- CSS variables for design tokens and theme control.
- Local TypeScript data or MDX for projects, experience, links, and profile content.
- Lightweight CSS/SVG motion first, with `motion/react` only if interaction complexity justifies it.

Use Bun for dependency installation and local commands. The rewrite should commit a Bun lockfile and should not keep npm lockfile conventions as the primary workflow after the new stack is initialized.

Prettier and ESLint are required, not optional. Formatting and linting should be part of the development workflow so style issues do not pollute implementation decisions.

Avoid adding complex dependencies before the site needs them. Three.js, full CMS, full RAG, and heavyweight animation libraries are not first-version requirements.

Deployment target:

- Vercel should be the primary deployment platform.
- The portfolio should use Vercel preview deployments for branch review.
- The Vercel project should use Bun-compatible install and build commands when supported by the generated lockfile.
- API routes or server actions for future contact/chatbot behavior should stay compatible with Vercel's serverless/runtime model.
- Do not target a self-managed VM for the main portfolio unless infrastructure demonstration becomes an explicit goal.

## Engineering Standards

The implementation should follow clean code and proper frontend architecture from the start.

Required standards:

- Use TypeScript types for content models, component props, and shared data.
- Keep repeated content in arrays or structured objects.
- Render repeated UI with `.map()` instead of duplicating TSX markup.
- Split UI into focused components when repetition or responsibility becomes obvious.
- Keep content data separate from presentational components where practical.
- Prefer readable names over clever abstractions.
- Avoid premature abstraction, but do not tolerate copy-pasted markup blocks.
- Keep components accessible by default.
- Keep styling consistent through tokens and reusable primitives.

Examples of UI that must be data-driven:

- Navigation items.
- CTA definitions.
- Social links.
- Project cards.
- Project filters.
- Experience timeline entries.
- Skills rows.
- Chatbot quick actions.
- Chat message bubbles.
- Bio action buttons.

The codebase should be built so adding a new project, skill, link, or chatbot suggestion usually means changing data, not duplicating JSX.

## Brand Identity

The `AN` logo from `public/an-logo.svg` is the main identity anchor.

The logo should be used as:

- Navbar brand mark.
- AI assistant avatar.
- Subtle watermark in selected panels.
- Footer mark.
- Bio page identity symbol.

The logo must stay monochrome or near-monochrome in the default light theme. Avoid neon effects, heavy gradients, or decorative treatments that make the logo look generic.

## Visual Direction

The primary visual direction is a bright monochrome interface inspired by premium AI tools, modern developer products, and editorial technology sites.

References:

- Linear for interface clarity.
- Vercel for developer credibility.
- OpenAI for calm intelligence.
- Perplexity for conversational product feel.
- Notion for readable structure.
- Raycast for polished UI density.

The result should feel minimal, intelligent, calm, premium, futuristic, trustworthy, creative, sophisticated, and highly polished.

Avoid:

- Excessive colors.
- Neon effects.
- Cyberpunk aesthetics.
- Dark-first layout.
- Fake social proof.
- Cluttered interface panels.
- Distracting animations.
- Heavy gradients.

## Theme System

### Light Theme

The default theme is light.

Recommended tokens:

- Background: `#FAFAFA`
- Surface: `#FFFFFF`
- Elevated surface: `rgba(255, 255, 255, 0.78)`
- Text primary: `#050505`
- Text secondary: `#525252`
- Text muted: `#737373`
- Border: `#E5E5E5`
- Muted surface: `#F4F4F5`
- Shadow: soft black alpha, low opacity
- Accent: monochrome first

The light theme should be visually dominant across the homepage, about page, and work page.

### Dark Theme

The dark theme should inherit the DNA of the previous portfolio bio layout, especially `components/BioLayout/` from the old portfolio.

Reference colors from the previous site:

- Deep navy: `#14273E`
- Light text: `#EFEFF6`
- Accent blue: `#7CB8FC`
- Secondary blue: `#3E6BB5`
- Near-black text: `#040C15`

Recommended dark tokens:

- Dark background: `#14273E`
- Dark surface: `#0F1F33`
- Dark surface elevated: `rgba(15, 31, 51, 0.84)`
- Dark text: `#EFEFF6`
- Dark muted text: `rgba(239, 239, 246, 0.68)`
- Dark accent: `#7CB8FC`
- Dark accent deep: `#3E6BB5`

Dark theme should not drive the initial visual identity. It should appear as an alternate mode or as a controlled visual influence on `/bio`.

## Typography

The typography should combine editorial presence with modern product clarity.

Recommended direction:

- Display headline: high-contrast serif or refined display font.
- Body copy: clean sans-serif.
- Interface and chatbot: modern sans-serif.
- Labels and metadata: subtle mono style.

Typography must create hierarchy without relying on color.

## Motion System

Motion should feel ambient and premium, not flashy.

Allowed motion:

- Slow floating background wireframes.
- Soft parallax on hero background elements.
- Subtle line morphing.
- Low-opacity particle trails.
- Chatbot typing indicator.
- Floating cards with small transform ranges.
- Smooth hover states.

Required constraints:

- Respect `prefers-reduced-motion`.
- Avoid aggressive loops.
- Avoid motion that distracts from text.
- Avoid heavy WebGL for the first implementation unless SVG/CSS cannot achieve the desired effect.

## Loading Experience

Portfolio V2 should preserve the intent of the existing loader in `components/loader.tsx`, but modernize the behavior so it feels premium and does not block the user unnecessarily.

The current loader establishes useful brand cues:

- Full-screen transition.
- `AN` logo focus.
- High-contrast monochrome staging.
- Diagonal/architectural panel motion.
- Personal brand name reveal.

The V2 loading system should keep those cues while removing rough edges.

Requirements:

- Provide loading states for all primary routes: `/`, `/about`, `/work`, and `/bio`.
- Use Next.js App Router loading conventions such as route-level `loading.tsx` where appropriate.
- Avoid hardcoded long delays. A loader should reflect actual route or asset loading, not force every visitor to wait.
- Use the `AN` logo as the main loader mark.
- Use the light theme as the default loader background.
- Allow dark-theme loader treatment only where the page context intentionally uses dark styling, especially `/bio`.
- Keep animation subtle, fast, and brand-consistent.
- Respect `prefers-reduced-motion` by reducing or disabling loader animation.
- Prevent layout shift after loading completes.
- Ensure loader markup remains accessible and does not trap keyboard focus.

Recommended loader direction:

- Replace the existing 3-second fixed timeout behavior with a shorter branded reveal or route-level suspense fallback.
- Use a monochrome `AN` logo reveal, soft fade, or diagonal panel transition inspired by the existing loader.
- Keep loading copy minimal, such as `Alfian Nahar` or `Preparing interface`.
- Do not use teal/purple gradient text from the old loader in the primary V2 light theme unless it is deliberately reworked into the new design system.

## Homepage

The homepage focuses on the approved hero section.

### Hero Objective

Create a premium AI startup-inspired hero section for a personal portfolio. The hero should be visually impressive but still clearly about Alfian as an individual builder.

### Hero Composition

Desktop layout uses two columns.

The composition should follow the reference image at `docs/plans/hero_layout.png`.

Layout requirements from the reference:

- Full-viewport hero with generous horizontal spacing.
- Top navigation aligned across the full width.
- Left side focused on logo, brand name, navigation, badge, headline, subtitle, CTA buttons, and credibility/tooling strip.
- Right side dominated by a large premium AI assistant panel.
- The assistant panel should feel like a product interface, not a decorative card.
- Background sketch lines and wireframes should be most visible behind the left and center areas, then fade behind the assistant panel.
- Chatbot side cards should stack vertically inside the right visual area.
- The layout should preserve the white-first monochrome aesthetic from the reference.
- On mobile, the content should collapse into a readable single-column flow with the assistant panel below the primary copy.

Left side includes:

- Navbar.
- Eyebrow label.
- Large headline.
- Concise subtitle.
- Primary CTA.
- Secondary CTA.
- Tooling or credibility strip.

Right side includes:

- Premium AI chatbot mock interface.
- Realistic conversation examples.
- `AN` logo as assistant avatar.
- Typing indicator animation.
- Floating UI cards.
- Generated insights panel.
- Skills and project preview cards.

### Hero Copy

Recommended eyebrow:

```text
AI-Powered Digital Systems
```

Recommended headline:

```text
Intelligent Interfaces.
Reliable Systems.
Meaningful Impact.
```

The headline area should also support a rotating role phrase inspired by `three-d-sketch-web/src/hero.js`, where a playful descriptor and a real role change over time.

Recommended rotating role pairs:

```text
all-rounder / fullstack
server whisperer / backend
pixel pusher / frontend
bug hunter / debugger
caffeinated coder / developer
architect of chaos / systems
interface thinker / UI engineer
automation builder / AI workflow
```

Rules for rotating text:

- The role list must be data-driven.
- The text should rotate with a calm interval around 3 seconds.
- The list may shuffle once on page load so the same role does not always appear first.
- The animation should be subtle and should not cause layout shift.
- The primary SEO headline must remain meaningful even if JavaScript is disabled.
- Respect `prefers-reduced-motion` by disabling or simplifying the rotation.
- Do not make the rotating text the only explanation of Alfian's value.

Alternative headline:

```text
I design and build intelligent digital products.
```

Recommended subtitle:

```text
I build AI-powered products, web applications, and scalable digital experiences that help ideas become useful, elegant, and reliable systems.
```

Primary CTA:

```text
Let's Build Something
```

Secondary CTA:

```text
View My Work
```

Credibility label:

```text
Built with modern tools and trusted engineering practices
```

Do not use third-party logos as "trusted by" unless there is a real relationship. If tool logos are shown, label them clearly as tools or stack.

### Hero Background

The background uses delicate generative line art:

- Architectural sketch lines.
- Abstract contour drawings.
- Wireframe geometries.
- Procedural SVG curves.
- Very light gray particle nodes.

The background should feel as if generated by Three.js, WebGL particles, parametric mathematical curves, or animated SVG systems, but the first implementation should prefer lightweight SVG/CSS unless WebGL is justified.

## About Page

The about page should be simple, human, and visually calm.

Content structure:

- Page heading: `About Alfian`.
- Art avatar or stylized portrait.
- Short personal introduction.
- Short description of what Alfian builds.
- Contact block.
- Social links.

Optional cards:

- Frontend Engineering.
- AI Workflow Automation.
- Product Interface Design.
- System Thinking.

The about page should not become a long resume dump. Its job is to make the visitor trust the person behind the work and know how to contact him.

## Work Page

The work page contains both portfolio projects and professional experience.

Primary sections:

- Featured projects.
- Project cards.
- Filter controls.
- Experience timeline.
- Selected experiments if available.

Project cards should include:

- Project name.
- Short description.
- Thumbnail or visual preview.
- Role.
- Stack.
- Tags.
- Project type.
- Position or responsibility at the time.
- Outcome or impact.
- Link if available.

The project grid should support filtering so visitors can quickly understand the type of work Alfian has done.

Required filter dimensions:

- Tags, such as `AI`, `Frontend`, `Backend`, `Automation`, `Dashboard`, `Portfolio`, `SEO`, `UI/UX`, or `Data`.
- Project type, such as `from scratch`, `continue project`, `maintenance`, `redesign`, `technical test`, `experiment`, or `client work`.
- Position or responsibility, such as `lead`, `developer`, `frontend`, `backend`, `fullstack`, `personal`, `technical test`, or `collaborator`.

Filtering should be data-driven. Do not duplicate project card markup for each category. Each project should define its metadata once, and the UI should derive filter options from the project data where practical.

Thumbnail requirements:

- Every featured project should have a thumbnail.
- Thumbnails should use a consistent aspect ratio.
- If no real screenshot is available, use a polished sanitized mockup or abstract preview rather than an empty placeholder.
- Thumbnail alt text should describe the project preview.
- Thumbnails should be optimized and lazy-loaded where appropriate.

Recommended project data shape:

```ts
type Project = {
  title: string;
  slug: string;
  description: string;
  thumbnail: {
    src: string;
    alt: string;
  };
  role: string;
  position: string[];
  type: string;
  tags: string[];
  stack: string[];
  outcome?: string;
  links?: {
    live?: string;
    repo?: string;
    caseStudy?: string;
  };
};
```

Recommended UX:

- Start with `All` selected.
- Let visitors filter by one primary dimension first.
- Do not overbuild multi-select filtering unless content volume justifies it.
- Keep filter labels short and scannable.
- Show empty-state copy if a filter has no matching projects.
- Preserve accessibility with real buttons, visible active states, and keyboard focus.

Experience entries should include:

- Company or context.
- Role.
- Time period.
- Key responsibilities.
- Clear achievements where possible.

If there are not enough strong projects, show fewer better items. A small number of credible projects is better than a large grid of weak placeholders.

## Bio Page

The bio page is a modern replacement for the existing `alfianahar-portofolio-site/pages/bio.js` experience.

The old bio had useful personal identity elements:

- Avatar.
- Social links.
- Link buttons.
- Dark blue visual atmosphere.
- Large low-opacity logo in the background.

The new bio should keep the intent but modernize the execution.

Required structure:

- Avatar or art portrait.
- `AN` identity mark.
- Short personal line.
- Social links.
- Link-in-bio actions.
- AI assistant panel.
- Contact CTA.

Bio page tone:

- More compact than homepage.
- More personal than work page.
- Can use more dark-theme influence than the rest of the site.
- Still must match the V2 premium system.

Recommended bio actions:

- View Portfolio.
- Contact Me.
- GitHub.
- LinkedIn.
- Resume.
- Ask AI Assistant.

## AI Chatbot

The AI chatbot should help visitors understand Alfian's work and navigate the portfolio.

### Recommended Scope

Use a curated AI assistant, not a full open-ended chatbot for the first version.

The chatbot should answer questions about:

- Alfian's profile.
- Skills.
- Services.
- Projects.
- Experience.
- Contact information.
- What page or action a visitor should take next.

### Options Considered

Mock chatbot only:

- Fastest to build.
- Best for visual polish.
- Not truly interactive.

Curated AI assistant:

- Recommended path.
- Useful but controlled.
- Can read from local structured data or markdown.
- Lower risk of irrelevant answers.

Full RAG chatbot:

- Most powerful.
- Too much complexity for the first release.
- Only worth it after content volume grows.

### Chatbot UX

The assistant should feel calm and helpful.

Suggested name:

```text
Alfian AI Assistant
```

Example user prompt:

```text
Can you help me understand what Alfian can build?
```

Example assistant response:

```text
Alfian builds modern web applications, AI-assisted workflows, and polished product interfaces. He is strongest when turning rough ideas into clear flows, usable interfaces, and maintainable implementation systems.
```

Suggested quick actions:

- Review My Website.
- Suggest Improvements.
- Show Projects.
- Contact Alfian.

The chatbot must not pretend to be a real human. It should be clear that it is an AI assistant representing portfolio information.

## Content Guidelines

Keep copy direct and specific.

Avoid vague claims like:

- World-class solutions.
- Revolutionary AI.
- Trusted by leading companies.
- Cutting-edge innovation without evidence.

Prefer concrete statements like:

- I build AI-assisted workflows and modern web interfaces.
- I help turn product ideas into usable systems.
- I design clean interfaces and implement them with practical engineering.

## SEO Requirements

The portfolio must be SEO-friendly from the first release. SEO should be treated as part of the product architecture, not a cleanup task after the visual design is done.

Each public page should have:

- Unique title.
- Unique meta description.
- Canonical URL.
- Open Graph metadata.
- Twitter card metadata.
- Human-readable route and heading structure.
- One clear `h1` per page.
- Semantic section hierarchy.

Required SEO pages and metadata:

- `/` should target Alfian's primary personal brand and positioning.
- `/about` should target personal profile, contact, and professional background intent.
- `/work` should target portfolio projects, case studies, and experience intent.
- `/bio` should target link-in-bio and contact discovery intent.

Technical SEO requirements:

- Generate `sitemap.xml`.
- Generate `robots.txt`.
- Use canonical URLs for all indexable pages.
- Use clean internal linking between home, work, about, bio, and contact actions.
- Add JSON-LD structured data where appropriate.
- Optimize Open Graph image generation or provide a high-quality static OG image.
- Ensure meaningful alt text for logo, avatar, project images, and visual previews.
- Keep Core Web Vitals healthy by avoiding unnecessary JavaScript and heavy visual effects.

Recommended structured data:

- `Person` for Alfian's profile.
- `WebSite` for the portfolio site.
- `CreativeWork` or `SoftwareApplication` for selected project detail pages when applicable.

SEO copy must stay honest. Do not stuff keywords or make claims that are not backed by the content. The goal is discoverability and clarity, not spam.

## Accessibility Requirements

The site must include:

- Semantic landmarks.
- Keyboard accessible navigation.
- Visible focus states.
- Sufficient text contrast.
- Alternative text for avatar and logo usage.
- Reduced motion support.
- Responsive layouts for mobile, tablet, and desktop.

The chatbot must include:

- Accessible input label.
- Keyboard-send behavior.
- Readable message order.
- Clear loading or typing state.

## Performance Requirements

The first version should stay lightweight.

Targets:

- Avoid unnecessary WebGL in MVP.
- Prefer SVG/CSS for background line systems.
- Optimize images and avatar assets.
- Lazy-load non-critical chatbot logic if needed.
- Keep animations GPU-friendly.
- Avoid large animation libraries unless justified.

## Code Quality Requirements

The project must include a clear code quality setup.

Required tooling:

- Bun as the package manager and script runner.
- ESLint configured for Next.js and TypeScript.
- Prettier configured for consistent formatting.
- Scripts for linting and formatting.
- Formatting rules that do not fight Tailwind usage.

Recommended scripts:

```text
lint
format
format:check
typecheck
```

Recommended local commands:

```text
bun install
bun run lint
bun run format:check
bun run typecheck
bun run build
```

Implementation should avoid duplicated TSX and hardcoded repeated HTML. If a section displays a list, the list should come from structured data and render through `.map()`.

## Non-Goals For First Version

The first version does not need:

- Full CMS.
- Blog authoring system.
- Full RAG search.
- Login or authentication.
- Dashboard.
- Real-time multi-user chat.
- Complex 3D scene.
- Overbuilt theme editor.

## Acceptance Criteria

Portfolio V2 is successful when:

- The first impression clearly communicates Alfian's value within 3 seconds.
- The design feels personal and premium, not like a generic AI startup template.
- The `AN` logo is consistently used as the brand anchor.
- The light theme is dominant and visually polished.
- The dark theme feels like an evolved version of the old BioLayout style.
- The hero supports the AI/product direction without making false claims.
- The hero layout follows the approved visual direction in `docs/plans/hero_layout.png`.
- The hero includes a controlled rotating role text treatment inspired by `three-d-sketch-web/src/hero.js`.
- The about page is short, human, and contact-oriented.
- The work page presents projects and experience credibly.
- The work page supports thumbnail-based project cards with filterable tags, project types, and role or responsibility metadata.
- The bio page works as a modern link-in-bio with AI assistant support.
- The chatbot helps visitors navigate and understand Alfian's work.
- The route loading experience preserves the `AN` loader identity without forcing unnecessary fixed delays.
- The site remains responsive, accessible, and performant.
- The site has SEO-ready metadata, semantic page structure, sitemap, robots file, canonical URLs, and share-ready Open Graph cards.
- The implementation uses Bun, ESLint, Prettier, TypeScript, clean component boundaries, and data-driven rendering for repeated UI.

## Implementation Recommendation

Start with the visual and content system before building complex AI behavior.

Recommended first implementation sequence:

1. Define design tokens and base layout system.
2. Configure Bun, TypeScript, ESLint, Prettier, lint scripts, format scripts, typecheck scripts, and build scripts.
3. Define structured content data for navigation, CTAs, projects, project filters, experience, links, chatbot prompts, skills, and rotating hero roles.
4. Build the shared navigation and logo treatment.
5. Build the shared loading system based on the existing `components/loader.tsx` brand cues without hardcoded long waits.
6. Build the homepage hero based on `docs/plans/hero_layout.png`, including lightweight background system and rotating role text.
7. Build simple about, work, and bio page shells.
8. Add SEO metadata, sitemap, robots, canonical URLs, structured data, and OG image support.
9. Add chatbot UI as a polished mock.
10. Upgrade chatbot to curated AI assistant after content structure is stable.

This sequence avoids the common mistake of building AI complexity before the site has a strong identity and content foundation.
