# Atlas Workspace

An npm workspace monorepo containing **Atlas UI** — a production React
design system — and **Atlas Intelligence**, a full document-processing
product built on top of it.

## Project overview

Atlas Intelligence is an AI-powered, human-in-the-loop document review
platform. Documents (invoices, contracts, receipts) move through an
extraction → review → approval pipeline: AI extracts structured fields
with per-field confidence scores, and a reviewer verifies, corrects, or
approves each one before it moves downstream. Every AI action is framed
as a suggestion with visible confidence — never a silent auto-apply.

Atlas UI is the design system that powers it: a themeable, accessible
component library translated directly from the Atlas Figma files, built
to support Atlas Intelligence today and future Atlas products without
modification.

## Architecture

```
atlas-workspace/
├── packages/
│   └── atlas-ui/            Reusable, app-agnostic component library
│                            (tokens, theme, primitives, Storybook docs)
└── apps/
    └── atlas-intelligence/  The Atlas Intelligence product — shell,
                             routing, pages, state, and mock data
```

Atlas UI has no routing, business logic, or product-specific pages — it
only exports components, tokens, and the theme system. Atlas Intelligence
consumes it as an ordinary package dependency, the same way a second
Atlas product could. Keeping them as sibling workspaces means:

- Atlas UI stays reusable across multiple products.
- Changes to components are immediately live in the app via the workspace
  symlink — no publish/version step during development.
- The import boundary is enforced by the package boundary itself: Atlas
  Intelligence can only reach Atlas UI through its public export surface,
  never a deep `atlas-ui/src/...` import.

## Monorepo structure

### Atlas UI package (`packages/atlas-ui`)

A themeable component library with 60+ components across nine categories
(actions, AI/review primitives, data display, feedback, forms, navigation,
overlays, and more), built on:

React · TypeScript · Vite · Tailwind CSS v4 · Radix UI primitives ·
Recharts · Storybook · Vitest · React Testing Library

Every component is backed by a token system (color, spacing, typography,
radius, elevation, motion, z-index) defined once in `src/tokens/` and
compiled to CSS custom properties, so theming is a matter of swapping
token values, not per-component overrides. Accessibility is enforced at
build time — Storybook's a11y addon runs as an error gate, not a warning.

### Atlas Intelligence application (`apps/atlas-intelligence`)

The product itself: a persistent sidebar + top bar shell (collapsible on
desktop, a drawer on mobile) wrapping seven routed pages — Dashboard,
Review Queue, Document Review, Workflows, Analytics, Settings, and
placeholder destinations for nav items without a designed screen yet.
Built on React Router, with app state (documents, notifications, toasts,
AI conversation) held in a single React context/reducer store — no
external state library, since the current scope doesn't need one.

## Storybook

Every Atlas UI component ships with live-preview documentation: usage
guidance, prop tables, states, accessibility notes, and do/don't
guidance, generated from the same components the product consumes.

```bash
npm run storybook          # localhost:6006
npm run build-storybook    # static site, output in packages/atlas-ui/storybook-static
```

## Interactive prototype

Atlas Intelligence is a fully interactive prototype, not a static mockup.
The primary review workflow — open a document, verify extracted fields,
ask the AI assistant a question, and approve/reject/request changes —
works end to end against a coherent in-memory dataset: approving a
document updates the Review Queue count, the activity feed, dashboard
metrics, and notifications consistently, in one action.

```bash
npm run dev:app    # localhost:5173
```

## Light/Dark themes

Every screen supports Light and Dark mode via a `data-theme` attribute
and `ThemeProvider`/`useTheme` from Atlas UI, with the toggle live in
Settings → General → Preferences. Contrast, chart colors, borders, and
status indicators are all token-driven, so both themes are first-class
rather than one being a dimmed copy of the other.

## Responsive layouts

The shell and every page are built for real viewport ranges, not just a
1440px desktop canvas — down to mobile widths, where the sidebar becomes
a drawer, tab bars and tables scroll horizontally instead of forcing page
overflow, and KPI/Kanban rows use intentional scrollable or stacked
layouts rather than a shrunk desktop grid.

## Current workflow

**Review Queue → Document Review → Approve.** A reviewer opens the queue,
filters by document type or status, opens a document, verifies each
AI-extracted field (with confidence scores and accept/reject affordances),
optionally asks the AI Assistant a question about the document, then
approves, rejects, or requests changes — with the action reflected
immediately across the queue, dashboard, and notifications.

## Development setup

```bash
npm install          # installs and links all workspaces
```

| Command | What it does |
|---|---|
| `npm run dev` | Atlas UI's own dev playground (`localhost:5173`) |
| `npm run dev:app` | Atlas Intelligence dev server (`localhost:5173`) |
| `npm run storybook` | Atlas UI Storybook (`localhost:6006`) |
| `npm run build` | Builds Atlas UI first, then Atlas Intelligence |
| `npm run build:ui` | Builds only Atlas UI (`packages/atlas-ui/dist`) |
| `npm run build:app` | Builds only Atlas Intelligence (`apps/atlas-intelligence/dist`) |
| `npm run build-storybook` | Builds the static Storybook site |
| `npm run typecheck` | Runs `typecheck` in every workspace |
| `npm run lint` | Runs `lint` in every workspace |
| `npm run test` | Runs `test` in every workspace (Atlas UI's Vitest suite — 200+ tests) |

Each package also has its own scripts — run them directly with
`--workspace=<name>` from the root, or `cd` into the package and run them
normally. See `packages/atlas-ui/README.md` for Atlas UI's full
documentation (tokens, theming, component inventory).

### How Atlas Intelligence consumes Atlas UI

`apps/atlas-intelligence` depends on `packages/atlas-ui` through the npm
workspace protocol:

```json
// apps/atlas-intelligence/package.json
"dependencies": { "atlas-ui": "*" }
```

npm links this to `packages/atlas-ui` on disk (`node_modules/atlas-ui` is a
symlink). The app imports only from the package's public export surface:

```ts
import { ThemeProvider, Button, KPICard } from 'atlas-ui';
import 'atlas-ui/styles.css';
```

Deep imports (`atlas-ui/src/components/...`) are not supported and should
never be used — if something is needed that isn't exported from the
package root, it belongs in `packages/atlas-ui/src/index.ts`, not in a
reach-around import.

## Repository structure

```
atlas-workspace/
├── packages/
│   └── atlas-ui/
│       ├── src/
│       │   ├── components/     actions, ai, data-display, feedback,
│       │   │                   forms, navigation, overlays, ...
│       │   ├── tokens/         color, spacing, typography, radius,
│       │   │                   elevation, motion, z-index
│       │   ├── styles/         compiled tokens, global CSS
│       │   └── utils/          cn() and other shared utilities
│       └── .storybook/
└── apps/
    └── atlas-intelligence/
        └── src/
            ├── shell/          AppShell, sidebar, top bar, notifications
            ├── pages/          Dashboard, Review Queue, Document Review,
            │                   Workflows, Analytics, Settings
            ├── store/          app state (documents, notifications,
            │                   toasts, AI conversation)
            ├── mocks/          typed mock data (documents, KPIs,
            │                   activity, notifications, users)
            ├── nav/            sidebar navigation config
            ├── hooks/          shared hooks (e.g. media queries)
            └── types/          shared domain types
```

### Where code belongs

**`packages/atlas-ui`** — reusable and app-agnostic only: tokens, themes,
primitive/reusable components, generic patterns, Storybook documentation.
Nothing here may import from `apps/*`.

**`apps/atlas-intelligence`** — product-specific: routing, pages, product
navigation, business logic, mock product data, workflow state, document
review behavior, and all Atlas Intelligence content. Consumes Atlas UI
only through its package export surface.
