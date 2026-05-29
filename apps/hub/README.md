# hub

The main portal application for Osweng Space. Displays a curated list of my apps, projects, and tools.

> **Note:** Hub is one implementation example of the monorepo's app pattern, not the universal template. For the canonical setup steps, see [docs/app-setup-checklist.md](../../docs/app-setup-checklist.md).

## Overview

- **Framework:** Next.js 16 (App Router, Webpack)
- **Styling:** Tailwind CSS v4 via `@osweng-space/ui` global styles
- **Components:** shadcn/ui via `@osweng-space/ui`
- **Theme Support:** Dark/light mode powered by `next-themes` — `ThemeProvider` and `ThemeToggle` are shared from `@osweng-space/ui`
- **Port (dev):** `16000`

## Structure

```
apps/hub/
├── app/
│   ├── favicon.ico
│   ├── fonts/                  # Self-hosted Geist fonts
│   ├── globals.css             # Imports shared @osweng-space/ui styles
│   ├── layout.tsx              # Root layout (fonts, ThemeProvider, SiteHeader, SiteFooter)
│   ├── manifest.ts             # PWA manifest generator
│   └── page.tsx                # Home page
├── components/
│   ├── home/                   # Page-level components (HeroSection, AppGrid, AppCard)
│   └── layout/                 # SiteHeader, SiteFooter
├── config/
│   ├── apps.ts                 # Hub app entries (name, description, href, status)
│   └── site.ts                 # Site-wide metadata (name, description, URL)
├── lib/
│   └── viewport.ts             # Next.js viewport and PWA theme-color config
└── public/
    └── icons/                  # PWA icons (icon.svg, icon-192.png, icon-512.png, generate-icons.py)
```

## Path Aliases

| Alias | Resolves to                            |
| ----- | -------------------------------------- |
| `@/*` | App root (`apps/hub/`)                 |
| `#/*` | Shared UI package (`packages/ui/src/`) |

## Shared Packages Consumed

| Package                  | Used for                                                          |
| ------------------------ | ----------------------------------------------------------------- |
| `@osweng-space/ui`       | Components, ThemeProvider, ThemeToggle, Layout Primitives, styles |
| `@osweng-space/supabase` | Supabase browser client                                           |

### Styles

`app/globals.css` imports the shared styles from `@osweng-space/ui`:

```css
@import "@osweng-space/ui/styles/globals.css";
```

All Tailwind CSS v4 custom properties and base resets are defined in `packages/ui/src/styles/globals.css`.

### Theme

The `ThemeProvider` wraps the root layout. `ThemeToggle` is used in `SiteHeader`, imported directly from `@osweng-space/ui`:

```tsx
import { ThemeProvider } from "@osweng-space/ui/components/providers/theme-provider";
import { ThemeToggle } from "@osweng-space/ui/components/theme/theme-toggle";
```

Do not add local theme components — use the shared ones.

### Layout Primitives

The root layout and site components compose the shared layout primitives from `@osweng-space/ui`:

- `AppShell` wraps the layout content in `app/layout.tsx`
- `AppHeader` and `MainContainer` structure `SiteHeader`
- `AppFooter` and `MainContainer` structure `SiteFooter`
- `MainContainer` aligns the main content in `app/page.tsx`

## Running Locally

Run from the **monorepo root** (recommended):

```bash
pnpm dev
```

Or scoped to this app only:

```bash
pnpm --filter hub dev
```

The dev server starts at [http://localhost:16000](http://localhost:16000).

> Hub uses Webpack (`next dev --webpack`) instead of Turbopack. Do not switch to Turbopack without verifying it is stable for this project.

## PWA

Hub is fully PWA-ready:

- **`app/manifest.ts`** — Outputs `/manifest.webmanifest` at runtime via Next.js native manifest API.
- **`lib/viewport.ts`** — Mobile viewport and theme-color configuration, exported from the root layout.
- **`public/icons/`** — `icon.svg`, `icon-192.png` (192×192 maskable), `icon-512.png` (512×512 maskable), and `generate-icons.py` for PNG regeneration.

Verify PWA compliance at `http://localhost:16000/manifest.webmanifest` or via Lighthouse.

## Adding a New App Entry to Hub

Open `config/apps.ts` and add an entry to the `hubApps` array:

```ts
{
  name: "App Name",
  description: "Short description.",
  href: "https://your-app-url.com",
  status: "planned", // or "available"
}
```
