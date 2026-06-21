# Reference Hero Layout Design

## Goal

Rebuild the home hero as a close adaptation of `docs/plans/hero_layout.png`: a full-viewport editorial left side paired with a dominant AI assistant application shell on the right. The layout should feel custom and premium while staying resume-backed rather than becoming a generic AI agency template.

## Scope

- Keep the home page as a one-viewport hero.
- Preserve the global header structure, but route contact actions to `/bio`.
- Replace the current compact Phase 2 hero composition with a stronger split layout.
- Use the reference image for composition, density, spacing, and assistant-panel hierarchy.
- Keep content aligned with Alfian's real positioning: fullstack systems, robotics UI, backend APIs, GraphQL/ROS, Golang, and practical AI workflows.

## Left Hero

The left side should be an editorial portfolio pitch, not a generic SaaS pitch.

- Eyebrow: `AI-POWERED ENGINEERING`
- Headline: `Reliable Systems. Practical AI.`
- Copy: concise resume-backed positioning around fullstack systems, robotics interfaces, backend APIs, realtime integrations, and AI-assisted workflows.
- Primary CTA: `Let's Build Something` linking to `/bio`.
- Secondary CTA: `View My Work` linking to `/work`.
- Bottom proof strip: use stack/domain chips instead of fake trust logos: `Next.js`, `Golang`, `GraphQL`, `ROS`, `Python`, `AI Systems`.

## Assistant Shell

The right side should become an oversized assistant app preview inspired by the reference.

- Header: `Alfian AI Assistant`, online status, AN avatar, decorative utility controls.
- Main conversation: a realistic portfolio-review conversation that highlights Alfian's strengths.
- Sidebar cards:
  - `About Alfian`
  - `Skills`
  - `Recent Projects`
- Bottom prompt bar and quick actions:
  - `Review Website`
  - `Show Work`
  - `Discuss AI`
  - `Contact Alfian`

## Header

The header should keep the AN logo, `alfian aswinda`, navigation, and contact action. The contact action must point to `/bio`. Navigation links that point to future sections can remain if they are visually quiet, but they must not dominate the hero.

## Visual Direction

- White and black dominant palette.
- Thin sketch/network background texture inspired by the reference.
- Large serif-style headline feel is desirable, but do not add a new font dependency unless necessary.
- Right assistant shell should use soft borders, subtle shadows, rounded cards, and dense but readable hierarchy.
- Avoid body-level scroll hiding; solve overflow through sizing, spacing, and responsive layout.

## Responsive Behavior

- Desktop: split hero with left pitch and right assistant shell visible in one viewport.
- Tablet: preserve split where feasible, reduce assistant sidebar density.
- Mobile: stack content while keeping the headline readable and a compact assistant preview visible. If true one-screen fit conflicts with readability on short devices, prioritize readable headline and usable CTAs.

## Testing

- Update hero rendering tests to assert the new layout signals.
- Update any stale chat tests affected by revised assistant content.
- Run `bun run lint`, `bun run typecheck`, `bun run test`, and `bun run build`.
