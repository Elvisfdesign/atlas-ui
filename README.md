# Atlas Workspace

An npm workspace monorepo containing the Atlas Design System's React
implementation and the products that consume it.

```
atlas-workspace/
├── packages/
│   └── atlas-ui/            Reusable, app-agnostic component library
│                            (tokens, theme, primitives, Storybook docs)
└── apps/
    └── atlas-intelligence/  Consuming application (currently a minimal
                             proof-of-integration screen — Phase 0 only)
```

## Why a monorepo

Atlas UI is a design-system library, not an app — it has no routing,
business logic, or product-specific pages. Atlas Intelligence (and any
future Atlas product) is a separate consumer that imports Atlas UI as a
package. Keeping them as sibling workspaces means:

- Atlas UI stays reusable across multiple products.
- Changes to components are immediately live for consuming apps via the
  workspace symlink — no publish/version step needed during development.
- Import boundaries are enforced by the package boundary itself (see
  below), not by convention alone.

## Getting started

```bash
npm install          # installs and links all workspaces
```

| Command | What it does |
|---|---|
| `npm run dev` | Atlas UI's own dev playground (`localhost:5173`) |
| `npm run dev:app` | Atlas Intelligence dev server (`localhost:5173`) |
| `npm run storybook` | Atlas UI Storybook (`localhost:6006`) — the component documentation surface |
| `npm run build` | Builds Atlas UI first, then Atlas Intelligence |
| `npm run build:ui` | Builds only Atlas UI (`packages/atlas-ui/dist`) |
| `npm run build:app` | Builds only Atlas Intelligence (`apps/atlas-intelligence/dist`) |
| `npm run build-storybook` | Builds the static Storybook site |
| `npm run typecheck` | Runs `typecheck` in every workspace |
| `npm run lint` | Runs `lint` in every workspace |
| `npm run test` | Runs `test` in every workspace (Atlas UI's Vitest suite) |

Each package also has its own scripts — run them directly with
`--workspace=<name>` from the root, or `cd` into the package and run them
normally. See `packages/atlas-ui/README.md` for Atlas UI's full
documentation (tokens, theming, component inventory).

## How Atlas Intelligence consumes Atlas UI

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

## Where code belongs

**`packages/atlas-ui`** — reusable and app-agnostic only:
tokens, themes, primitive/reusable components, generic layouts, generic
patterns and templates, Storybook documentation. Nothing here may import
from `apps/*`.

**`apps/atlas-intelligence`** — product-specific:
routing, pages, product navigation, business logic, mock product data,
workflow state, document review behavior, and all Atlas Intelligence
content. Consumes Atlas UI only through its package export surface.

## Current status (Phase 0)

This is the workspace/build-repair migration only. `apps/atlas-intelligence`
contains a minimal proof-of-integration screen (ThemeProvider + a Button +
a KPICard + a light/dark toggle) confirming the app correctly consumes the
real Atlas UI package build — not the Atlas Intelligence product shell or
any product pages, which come next.
