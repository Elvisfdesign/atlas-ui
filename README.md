# Atlas UI

Atlas UI is the production React implementation of the **Atlas Design
System**. It transforms the Atlas Design System into reusable, accessible,
and production-ready React components that power Atlas products.

Source of truth: the Atlas Figma files (**Atlas Product** for how it looks,
**Atlas UI System** for how it behaves). This library is a faithful
translation of both — it does not redesign or reinterpret Atlas.

## Stack

React · TypeScript · Vite · Tailwind CSS v4 · Storybook 10 · Vitest ·
React Testing Library · Lucide React · Radix Primitives (for Tooltip and
future overlay components).

## Getting started

```bash
npm install
npm run dev          # dev playground at localhost:5173
npm run storybook    # component docs/dev environment at localhost:6006
```

```bash
npm run build         # typecheck + production library build
npm run test          # run unit tests once
npm run test:watch    # watch mode
npm run lint           # ESLint (includes jsx-a11y)
npm run format         # Prettier, writes
npm run tokens:build   # regenerate src/styles/tokens.css from src/tokens/*.ts
```

## Project structure

```
atlas-ui/
├─ .storybook/            Storybook config (theme toolbar, a11y addon)
├─ scripts/
│  └─ generate-css-tokens.mjs   builds tokens.css from the TS token source
├─ src/
│  ├─ components/
│  │  ├─ actions/         Button, Icon Button
│  │  ├─ data-display/    Avatar, KPI Card  (Data Table, charts, etc. later)
│  │  ├─ feedback/        Badge  (Toast, Inline Alert, etc. later)
│  │  ├─ overlays/        Tooltip  (Modal, Drawer, Popover, etc. later)
│  │  ├─ forms/           (empty — next phase)
│  │  ├─ navigation/      (empty — next phase)
│  │  ├─ ai/              (empty — next phase: AI Suggestion Card, Approval Panel, …)
│  │  ├─ layout/          (empty — page shells, once Dashboard work starts)
│  │  ├─ patterns/        (empty — composed, multi-component patterns)
│  │  └─ templates/       (empty — full page templates)
│  ├─ tokens/             Token source of truth (colors, spacing, radius,
│  │                      typography, elevation, motion, z-index, sizing)
│  ├─ styles/
│  │  ├─ tokens.css       GENERATED — CSS variables, Light + Dark
│  │  ├─ theme.css        Tailwind v4 @theme mapping (semantic → utility)
│  │  └─ globals.css      Tailwind entry + base styles + reduced-motion
│  ├─ theme/              ThemeProvider / useTheme (data-theme switching)
│  ├─ utils/               cn() — clsx + tailwind-merge
│  ├─ hooks/               (empty — shared hooks land here as needed)
│  ├─ types/               (empty — shared cross-component types land here)
│  └─ index.ts             Public package export surface
└─ tests/setup.ts          Vitest + jest-dom setup
```

Each component folder is self-contained: `Component.tsx`, `Component.stories.tsx`,
`Component.test.tsx`, `index.ts`. That's the pattern to repeat for every
future component.

## Design tokens

Every token in `src/tokens/*.ts` is transcribed 1:1 from the Atlas UI
System's Figma Variables (Primitive Colors, Semantic Colors, Dimensions
collections) and Foundations page (Typography, Elevation, Motion). Nothing
here was invented — z-index is the one category Figma has no concept of, so
that scale is original to this implementation, kept small and semantic.

`npm run tokens:build` regenerates `src/styles/tokens.css` from that source.
Components never hardcode a color, spacing value, radius, or shadow — they
bind to a Tailwind utility that resolves to a `--color-*` / `--radius-*` /
etc. CSS variable, which resolves to the Atlas token for whichever theme is
active.

## Theming

Set `data-theme="light"` or `data-theme="dark"` on any ancestor element (the
`<ThemeProvider>` does this on `<html>` by default, with `system` following
`prefers-color-scheme` and persisting the user's explicit choice to
`localStorage`). No component is ever duplicated per theme — every color
reference is semantic, so it repaints automatically.

High Contrast is intentionally not implemented yet — the Atlas UI System
documents it as deferred rather than shipped half-finished (see its Handoff
Audit). The token architecture here already supports adding a third
`data-theme="high-contrast"` block in `tokens.css` when that's ready.

## Components implemented (Phase 3)

| Component  | Figma source                                   | Notes |
|---|---|---|
| Button | Actions → Action / Button (Type × Size × State) | `loading` prop is new — not a documented Figma state, added as a standard enterprise affordance using existing tokens only |
| Icon Button | Actions → Action / Icon Button (Size × State) | requires `aria-label` (no visible label) |
| Badge | Feedback & Status → Feedback / Status Pill (9 tones) | status is always label text + color, never color alone |
| Avatar | Not yet a Figma component — built from the two real Product patterns (topbar user chip, assignee list chips) | see Handoff Audit / React Readiness for the componentization gap this fills |
| Tooltip | Overlays → Overlay / Tooltip | built on Radix's Tooltip primitive for hover-intent timing, Escape-dismiss, and `aria-describedby` wiring |
| KPI Card | Data Display → Data / KPI Card (Trend: Positive/Negative) | metric text matches the shipped component (26px); Foundations' named `Numeric Metric` type-scale token documents 28px — a small pre-existing drift, not something this pass corrected |

## Roadmap before the Atlas Dashboard

1. **Data Table** — Atlas Product/UI System have real header/row/pagination
   patterns and a full `table/*` token set, but no single componentized
   Table in Figma. This is the highest-priority next build: Table,
   TableHeader, TableRow, Pagination as real, composable components.
2. **Forms** — Text Input exists as a proper variant set in the DS; Select,
   Checkbox, Radio, Textarea need the same inventory-then-build treatment.
3. **Navigation** — Sidebar and Sidebar Item are real variant sets; build
   them next so page shells become possible.
4. **Feedback** — Toast and Inline Alert are real variant sets in the DS,
   not yet in code.
5. **Overlays** — Modal and Drawer exist as single Figma components (no
   state/variant coverage yet); build on Radix Dialog, matching Tooltip's
   pattern of "Radix owns the hard a11y problems, Atlas owns the paint."
6. **AI Components** — Suggestion Card and Approval Panel exist in Figma as
   single fixed components; need variant/state definition before
   componentizing.
7. Once Data Table + Forms + Navigation exist, the first real Atlas
   Dashboard section (the brief this library exists to support) becomes
   buildable.
