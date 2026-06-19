# Home Hero No-Scroll Design

## Goal

Redesign the home page so the hero fits inside one viewport on every device while keeping the desktop composition close to `docs/plans/hero_layout.png`: concise personal positioning on the left and a dominant AI assistant preview on the right.

## Constraints

- The home page must not scroll.
- Desktop and web view must keep a two-side hero composition.
- The right side must feel like a full AI chat product panel, not a small decorative card.
- The left side must be simpler than the current version.
- The changing text must be visually highlighted.
- Copy must match the resume in `public/Alfian Aswinda-resume-v3.0c.pdf`.
- Alfian should be positioned as a fullstack software engineer who is actively deepening AI engineering.
- Use `bun` for all commands.
- Do not commit unless the user explicitly asks.

## Recommended Approach

Use a strict viewport hero on home and remove the global footer from the root layout. The footer is the real reason a single-section home still scrolls, so hiding overflow alone would mask the problem and risk clipping content.

The home page keeps the reference layout direction on desktop with two columns. The left column becomes compact: badge, strong headline, highlighted rotating role, one short subtitle, CTAs, and a small stack strip. The right column becomes a taller assistant panel that fills the available hero height.

On mobile, keep the page no-scroll by compressing the same hierarchy instead of forcing the full desktop chat into a tiny screen. The assistant remains visible as a compact panel, but the desktop side cards and lower-priority details can be hidden or tightened.

## Content Direction

Headline:

```text
Fullstack engineer building reliable systems.
```

Highlighted rotating roles:

```text
Robotics UI / Next.js
Backend APIs / Golang
Realtime Systems / GraphQL + ROS
AI Engineering / Learning in public
Product Interfaces / React
System Design / Microservices
```

Subtitle:

```text
I build fullstack web systems with Next.js, Golang, and real-time integrations, while deepening practical AI engineering.
```

Primary CTA:

```text
View Work
```

Secondary CTA:

```text
Contact Me
```

Assistant content should mention practical resume-backed strengths: robotics UI, REST APIs, Apollo GraphQL with ROS, WebRTC, Golang microservices, backend architecture, team lead responsibilities, code review, and AI engineering direction.

## Success Criteria

- Home page has no vertical scroll on desktop, tablet, and mobile.
- Desktop hero keeps a clear two-column layout similar to `docs/plans/hero_layout.png`.
- AI assistant preview dominates the right side on desktop.
- Left copy is short and sharper than the current version.
- Rotating text is highlighted and easy to notice.
- Resume-backed positioning replaces generic `AI Developer & Designer` messaging on the home hero.
- Non-home pages still render the footer.
- `bun run lint`, `bun run typecheck`, `bun run test`, and `bun run build` pass after implementation.
