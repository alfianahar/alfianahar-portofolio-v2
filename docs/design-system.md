# Design System

This document captures the portfolio design system and its neo-brutalist accent layer. The site should stay minimal, readable, and portfolio-first; neo-brutalism is an accent layer, not a full visual rewrite.

## Design Direction

The base system is soft-minimal: generous spacing, rounded surfaces, subtle contrast, and Rubik as the primary typeface. The neo-brutalist layer adds controlled tension through hard offset shadows, stronger borders, and a vivid blue accent.

Use brutalist treatment only on high-signal UI: primary CTAs, featured cards, and contact actions. Do not apply it globally to every surface.

## Color Palette

### Current Tokens

Defined in `styles/tokens.css`.

| Token                | Light                         | Dark                          | Usage                               |
| -------------------- | ----------------------------- | ----------------------------- | ----------------------------------- |
| `--background`       | `#f4faff`                     | `#14273e`                     | Page background                     |
| `--surface`          | `#ffffff`                     | `#0f1f33`                     | Cards, panels, elevated UI          |
| `--surface-elevated` | `rgba(255,255,255,.78)`       | `rgba(15,31,51,.84)`          | Translucent surfaces                |
| `--accent`           | `#0095fa`                     | `#0095fa`                     | Pop color and hard-shadow color     |
| `--cream`            | `#f1f1e6`                     | `#f1f1e6`                     | Brutalist CTA/card fill             |
| `--brutal-ink`       | `#050505`                     | `#050505`                     | Text/border color on cream surfaces |
| `--text-primary`     | `#050505`                     | `#efeff6`                     | Main text, strong borders           |
| `--text-secondary`   | `#525252`                     | `rgba(239,239,246,.78)`       | Body/supporting copy                |
| `--text-muted`       | `#737373`                     | `rgba(239,239,246,.68)`       | Labels, metadata                    |
| `--border`           | `#e5e5e5`                     | `rgba(239,239,246,.16)`       | Default 1px borders                 |
| `--border-bold`      | `2px`                         | `2px`                         | Strong brutalist borders            |
| `--muted-surface`    | `#f4f4f5`                     | `rgba(239,239,246,.08)`       | Chips, subtle blocks                |
| `--shadow-soft`      | `0 24px 80px rgba(0,0,0,.08)` | `0 24px 80px rgba(0,0,0,.08)` | Soft/elevated surfaces              |
| `--shadow-hard`      | `6px 6px 0 var(--accent)`     | `6px 6px 0 var(--accent)`     | Main hard offset shadow             |
| `--shadow-hard-sm`   | `4px 4px 0 var(--accent)`     | `4px 4px 0 var(--accent)`     | Smaller hard offset shadow          |

### Neo-Brutalist Accent Tokens

Use these tokens for the accent layer.

| Token              | Value                     | Usage                                              |
| ------------------ | ------------------------- | -------------------------------------------------- |
| `--background`     | `#f4faff` in light mode   | Icy light background                               |
| `--accent`         | `#0095fa`                 | Primary pop color and hard-shadow color            |
| `--cream`          | `#f1f1e6`                 | Brutalist CTA/card fill                            |
| `--brutal-ink`     | `#050505`                 | Text/border color on cream surfaces in both themes |
| `--border-bold`    | `2px`                     | Strong brutalist border width                      |
| `--shadow-hard`    | `6px 6px 0 var(--accent)` | Main hard offset shadow                            |
| `--shadow-hard-sm` | `4px 4px 0 var(--accent)` | Smaller hard offset shadow                         |

The dark background remains `#14273e`.

## Typography

Typeface: `Rubik`, loaded in `src/styles/globals.css` from `/fonts/Rubik-VariableFont_wght.ttf`.

| Role            | Current Pattern                                                           |
| --------------- | ------------------------------------------------------------------------- |
| Body            | Rubik, system fallback, antialiased                                       |
| Hero heading    | `text-5xl` to `xl:text-8xl`, `font-semibold`, tight `tracking-[-0.075em]` |
| Section heading | `text-3xl` to `sm:text-5xl`, `font-semibold`, `tracking-[-0.04em]`        |
| Card title      | `text-2xl`, `font-semibold`, `tracking-[-0.04em]`                         |
| Eyebrow/label   | uppercase, `text-xs`, `font-semibold`, wide tracking                      |
| Body copy       | `text-base` to `text-xl`, relaxed line height                             |

Keep typography clean. The brutalist accent should come from surfaces, borders, and shadows, not from adding novelty fonts.

## Radius

Defined in `styles/tokens.css`.

| Token         | Value | Usage                        |
| ------------- | ----- | ---------------------------- |
| `--radius-lg` | `12px` | Large containers             |
| `--radius-md` | `8px`  | Panels, medium cards         |
| `--radius-sm` | `4px`  | Buttons and smaller controls |

Radii are intentionally restrained. Neo-brutalist tension comes from hard offset shadows and bold borders, not from soft curves; large radii read as friendly and dilute the accent layer. Use the tokens everywhere — avoid arbitrary `rounded-[2rem]` / `rounded-2xl` values so the radius system actually governs. Avatars (`rounded-full`) are the only sanctioned exception.

## Shadows

| Token              | Value                         | Usage                          |
| ------------------ | ----------------------------- | ------------------------------ |
| `--shadow-soft`    | `0 24px 80px rgba(0,0,0,.08)` | Current soft/elevated surfaces |
| `--shadow-hard`    | `6px 6px 0 var(--accent)`     | Brutalist CTA/cards            |
| `--shadow-hard-sm` | `4px 4px 0 var(--accent)`     | Compact brutalist elements     |

Use soft shadows for neutral surfaces. Use hard shadows only for intentional accent elements.

## Layout And Spacing

`Container` lives in `components/ui/container.tsx`.

| Size      | Class       | Usage                   |
| --------- | ----------- | ----------------------- |
| `default` | `max-w-6xl` | Main content            |
| `wide`    | `max-w-7xl` | Hero and dense sections |

Horizontal padding is `px-6 sm:px-8`. Preserve this; changing global layout spacing would be redesign work, not an accent pass.

## Components

### Button

Source: `components/ui/button.tsx`.

Current variants:

| Variant     | Purpose                      |
| ----------- | ---------------------------- |
| `primary`   | Main dark filled CTA         |
| `secondary` | Border + translucent surface |
| `ghost`     | Low-emphasis text action     |

Accent variant:

| Variant  | Treatment                                                                                          |
| -------- | -------------------------------------------------------------------------------------------------- |
| `brutal` | `2px` `--brutal-ink` border, `--cream` fill, `--brutal-ink` text, `--shadow-hard`, `.brutal-press` |

Use `brutal` for one main CTA per view. More than that makes the accent noisy.

### Project Card

Source: `components/work/project-card.tsx`.

Current treatment: rounded card, subtle border, white surface, soft shadow, slight upward hover.

Treatment: keep rounded card and content structure, but add a stronger hover state with `--border-bold` and `--shadow-hard`. Do not restyle every chip inside the card.

### Contact Card

Source: `components/about/contact-card.tsx`.

Current treatment: inverted dark card with soft shadow.

Treatment: keep the card. Add brutalist treatment to the email CTA only so the contact action becomes the high-signal element.

### Chat Panel

Source: `components/chat/chat-panel.tsx`.

Leave unchanged for now. It already carries product-interface weight; forcing brutalism into the chat panel risks visual clutter.

### Home Hero

Sources: `components/hero/hero-background.tsx`, `components/hero/hero-copy.tsx`, `components/hero/hero-tool-strip.tsx`, and `components/hero/hero-chat-preview.tsx`.

The home hero carries the strongest neo-brutalist accent because it is the first brand impression. Use `--cream`, `--brutal-ink`, and `--shadow-hard` on the eyebrow, primary CTA, stack chips, and assistant preview frame. Keep the inner chat UI mostly soft so the page does not become visually noisy.

On mobile, the hero uses `min-height` instead of fixed viewport height so the assistant preview can stack below the intro without overlap.

## Motion

Global reduced-motion handling exists in `src/styles/globals.css`.

Utility:

```css
.brutal-press {
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}

.brutal-press:hover {
  transform: translate(6px, 6px);
  box-shadow: 0 0 0 var(--accent);
}
```

This creates the classic pressed-card effect without extra JavaScript.

Inside `prefers-reduced-motion: reduce`, the hover transform is disabled so the button does not jump position.

## Do / Don't

Do:

- Use `--accent` as the main pop color.
- Use `--cream` for brutalist CTA/card fills.
- Use hard shadows on key actions and featured cards only.
- Keep the current Rubik typography system.
- Keep accessibility basics: visible focus, readable contrast, reduced-motion support.

Don't:

- Replace every soft surface with a hard-shadow surface.
- Add another display font just to look brutalist.
- Use more than two accent colors.
- Remove all border radii.
- Apply brutalist hover motion to dense controls like chat quick actions.

## Maintained Files

| Concern               | File                                |
| --------------------- | ----------------------------------- |
| Tokens                | `styles/tokens.css`                 |
| Global utility/motion | `src/styles/globals.css`            |
| Button variants       | `components/ui/button.tsx`          |
| Home hero accent      | `components/hero/*`                 |
| Project card accent   | `components/work/project-card.tsx`  |
| Contact CTA accent    | `components/about/contact-card.tsx` |
