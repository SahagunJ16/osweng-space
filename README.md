# Osweng Space

A unified monorepo and dashboard gateway for my apps, projects, tools, and digital resources.

## Technologies

| Layer              | Technology                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------------- |
| Monorepo Manager   | [Turborepo](https://turbo.build/repo) v2                                                     |
| Package Manager    | [pnpm](https://pnpm.io/) v9 (Workspace mode)                                                 |
| Frontend Framework | [Next.js 16](https://nextjs.org/) (App Router)                                               |
| Styling            | [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first), [shadcn/ui](https://ui.shadcn.com/) |
| Language           | [TypeScript](https://www.typescriptlang.org/) 5.9                                            |
| Backend            | [Supabase](https://supabase.com/) (shared client helpers)                                    |
| Linting            | [ESLint](https://eslint.org/) 9 (flat config)                                                |
| Formatting         | [Prettier](https://prettier.io)                                                              |

---

## Repository Structure

```
osweng-space/
├── .devcontainer/
│   └── devcontainer.json         # Dev container configuration (VS Code / GitHub Codespaces)
├── apps/
│   └── hub/                      # Next.js 16 portal — main landing page (port 16000)
├── packages/
│   ├── ui/                       # Shared React component library (@osweng-space/ui)
│   ├── supabase/                 # Shared Supabase client helpers (@osweng-space/supabase)
│   ├── eslint-config/            # Shared ESLint flat configs (@osweng-space/eslint-config)
│   └── typescript-config/       # Shared tsconfig presets (@osweng-space/typescript-config)
├── .env.example                  # Template for required environment variables
├── prettier.config.mjs           # Root Prettier configuration
├── pnpm-workspace.yaml           # pnpm workspace definition
└── turbo.json                    # Turborepo task pipeline
```

### Apps

Each app lives under `apps/<name>`, runs its own Next.js dev server on a dedicated port, and consumes shared packages from `packages/*`.

| App     | Path       | Port  | Description                                        |
| ------- | ---------- | ----- | -------------------------------------------------- |
| **hub** | `apps/hub` | 16000 | Primary portal — lists all active and planned apps |

Future apps will follow the same structure. See [docs/app-setup-checklist.md](docs/app-setup-checklist.md) for the setup pattern.

### Shared Packages

| Package                           | Description                                                                                                                                              |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@osweng-space/ui`                | Component library built on Tailwind CSS v4, React 19, and shadcn/ui. Exports components, a shared `ThemeProvider`, `ThemeToggle`, and global CSS styles. |
| `@osweng-space/supabase`          | Exports `createBrowserSupabaseClient()` — a thin wrapper around the Supabase JS client.                                                                  |
| `@osweng-space/eslint-config`     | ESLint 9 flat configs for Next.js apps and generic TypeScript packages.                                                                                  |
| `@osweng-space/typescript-config` | Base `tsconfig.json` presets (`base.json`, `nextjs.json`, `react-library.json`).                                                                         |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 22
- [pnpm](https://pnpm.io/) v9

```bash
corepack enable
corepack prepare pnpm@9.0.0 --activate
```

### Dev Container (recommended)

This project includes a dev container configuration for [VS Code Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers) and [GitHub Codespaces](https://github.com/features/codespaces). It comes pre-configured with:

- Node.js 22 LTS
- pnpm v9 enabled via Corepack
- All recommended VS Code extensions (ESLint, Prettier, Tailwind CSS IntelliSense, etc.)
- Auto-forwarded ports for active app dev servers

To start using it:

1. Install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension in VS Code.
2. Open this repository and select **Reopen in Container** when prompted.
3. Wait for the container to build and `pnpm install` to run automatically.
4. Copy `.env.example` to `.env.local` and fill in your values (see [Environment Variables](#environment-variables)).

### Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/SahagunJ16/osweng-space.git
cd osweng-space

# 2. Install dependencies
pnpm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

---

## Environment Variables

Define these in a `.env.local` file at the **monorepo root**:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Both variables are declared under `globalEnv` in `turbo.json` so Turborepo includes them in task cache invalidation.

---

## Developer Commands

All commands are run from the monorepo root.

```bash
# Start all apps in development mode
pnpm dev

# Build all apps and packages for production
pnpm build

# Run ESLint across all packages
pnpm lint

# Run TypeScript type checking across all packages
pnpm check-types

# Format all files with Prettier
pnpm format

# Check formatting without writing changes
pnpm format:check

# Run type checking + linting + format check
pnpm verify

# Run verify, then build for production
pnpm build:clean

# Run verify, then start the dev server
pnpm start:clean

# Run unit tests across all packages
pnpm test
```

To run a command scoped to a single app or package, use the `--filter` flag:

```bash
pnpm --filter hub dev
pnpm --filter @osweng-space/ui check-types
```

---

## Testing

Unit tests use [Vitest](https://vitest.dev/) and live alongside source files as `*.test.ts`.

```bash
# Run all tests via Turborepo
pnpm test

# Run tests scoped to one package
pnpm --filter @osweng-space/ui test
```

Current test coverage:

| Package            | Tests                                    |
| ------------------ | ---------------------------------------- |
| `@osweng-space/ui` | `src/lib/utils.test.ts` — `cn()` utility |

**CI:** The GitHub Actions workflow (`.github/workflows/verify.yml`) runs `pnpm verify` and `pnpm build` on every push to `main` and every pull request. Run `pnpm test` locally before opening a PR.

**Not yet added:** E2E / browser tests (Playwright). Add these when an app has enough user-facing behavior to justify the setup cost.

---

## Import Conventions

| Alias             | Resolves to                                 | Where it applies         |
| ----------------- | ------------------------------------------- | ------------------------ |
| `@/*`             | App root (e.g. `apps/hub/`)                 | Inside each app          |
| `#/*`             | Package root `src/` directory               | Inside shared packages   |
| `@osweng-space/*` | Workspace package (e.g. `@osweng-space/ui`) | Anywhere in the monorepo |

---

## Design System

### Tailwind CSS v4

Tailwind v4 is **CSS-first** — there is no `tailwind.config.js`. All theme tokens and utility configuration live directly inside CSS files.

Global CSS (custom properties, base resets, Tailwind imports) is defined in `packages/ui/src/styles/globals.css` and consumed by each app:

```css
/* apps/<app>/app/globals.css */
@import "@osweng-space/ui/styles/globals.css";
```

### shadcn/ui

Components are added via the shadcn CLI and placed in `packages/ui` so they are shared across all apps:

```bash
cd packages/ui
pnpm dlx shadcn@latest add <component>
```

The `components.json` in `packages/ui` sets `"tailwind.config"` to an empty string because Tailwind v4 does not use a config file.

### Theme

Shared theme components live in `@osweng-space/ui` and are imported directly by each app:

- `ThemeProvider` → `@osweng-space/ui/components/providers/theme-provider`
- `ThemeToggle` → `@osweng-space/ui/components/theme/theme-toggle`

Individual apps should not duplicate theme logic.

Theme tokens (colors, radius, spacing, shadows, typography) are defined in `packages/ui/src/styles/globals.css` using the **Caffeine** palette — oklch-based color values for both light and dark modes.

When writing components, use semantic theme tokens (`bg-primary`, `text-accent-foreground`, `bg-destructive`, etc.) rather than hardcoded color scales (e.g. `zinc-900`, `red-600`). This ensures components respond correctly to the active theme and remain reusable across apps.

### Layout Primitives

Shared layout primitives live in `@osweng-space/ui` and are imported directly by each app:

- `AppShell` → `@osweng-space/ui/components/layout/app-shell`
- `AppHeader` → `@osweng-space/ui/components/layout/app-header`
- `AppFooter` → `@osweng-space/ui/components/layout/app-footer`
- `MainContainer` → `@osweng-space/ui/components/layout/main-container`

Each app maintains ownership of its specific header and footer content (e.g., navigation links, site branding), but composes these shared layout primitives to ensure a unified layout structure, styling, and responsiveness across the entire monorepo.

---

## Progressive Web App (PWA) Setup

The Hub app is PWA-ready. Future apps can follow the same pattern:

- **`app/manifest.ts`** — Next.js native manifest generator outputs `/manifest.webmanifest` at runtime.
- **`lib/viewport.ts`** — Mobile-optimized viewport and theme color configuration, exported from the root layout.
- **`public/icons/`** — Contains `icon.svg`, `icon-192.png`, and `icon-512.png` maskable icons, plus `generate-icons.py` for PNG regeneration.

See [docs/app-setup-checklist.md](docs/app-setup-checklist.md) for the full PWA setup steps when creating a new app.

---

## Further Reading

- [CONTRIBUTING.md](CONTRIBUTING.md) — Coding practices, naming conventions, Git workflow, and code review checklist.
- [AGENTS.md](AGENTS.md) — Rules and workflow for AI coding agents working in this repo.
- [docs/app-setup-checklist.md](docs/app-setup-checklist.md) — Step-by-step checklist for adding a new app to the monorepo.
- [apps/hub/README.md](apps/hub/README.md) — Hub-specific documentation.
