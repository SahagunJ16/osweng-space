# New App Setup Checklist

Use this checklist whenever you add a new application under `apps/<app-name>`.

---

## 1. Plan

- [ ] Choose an app name (kebab-case)
- [ ] Choose a domain/subdomain for production
- [ ] Assign a dev port following the convention:

  | App        | Port  |
  | ---------- | ----- |
  | hub        | 16000 |
  | (next app) | 16001 |
  | (next app) | 16002 |

---

## 2. Scaffold the App

```bash
cd apps
pnpm dlx create-next-app@latest <app-name> \
  --typescript \
  --app \
  --no-tailwind \
  --no-eslint \
  --no-src-dir \
  --import-alias "@/*"
```

Or scaffold manually if you need full control over the output.

---

## 3. Configure `package.json`

Set the package name, scripts, Node engine requirement, and workspace dependencies:

```json
{
  "name": "<app-name>",
  "version": "0.1.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "next dev --webpack --port <PORT>",
    "build": "next build",
    "start": "next start",
    "lint": "eslint --max-warnings 0",
    "check-types": "next typegen && tsc --noEmit"
  },
  "engines": {
    "node": ">=22"
  },
  "dependencies": {
    "@repo/ui": "workspace:*",
    "next": "<version>",
    "react": "^19.x.x",
    "react-dom": "^19.x.x",
    "tailwindcss": "^4.x.x"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "typescript": "<version>"
  }
}
```

---

## 4. Configure TypeScript

Add a `tsconfig.json` extending the shared Next.js preset:

```json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "~/*": ["../../packages/ui/src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

## 5. Configure ESLint

Add an `eslint.config.mjs` extending the shared flat config:

```js
import { nextJsConfig } from "@repo/eslint-config/next-js";
/** @type {import("eslint").Linter.Config[]} */
export default [...nextJsConfig];
```

---

## 6. App Router Structure

Create the required App Router files:

```
apps/<app-name>/
├── app/
│   ├── globals.css      # Imports shared styles
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── manifest.ts      # (optional) PWA manifest generator
```

### `app/globals.css`

```css
@import "@repo/ui/styles/globals.css";
```

Do not duplicate Tailwind imports or custom property definitions here.

### `app/layout.tsx`

Wrap the app with the shared `ThemeProvider`:

```tsx
import { ThemeProvider } from "@repo/ui/components/providers/theme-provider";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 7. Recommended App Folders

```
apps/<app-name>/
├── components/
│   ├── layout/          # SiteHeader, SiteFooter, navigation
│   └── <feature>/       # Feature- or page-scoped components
├── config/              # App-level constants (site metadata, feature flags)
└── lib/                 # Utilities, helpers, metadata/viewport exports
```

---

## 8. Theme Toggle (optional)

If the app uses the standard theme toggle, import `ThemeToggle` directly from `@repo/ui`:

```tsx
import { ThemeToggle } from "@repo/ui/components/theme/theme-toggle";
```

Do not create a local theme toggle component.

---

## 9. App Metadata and Viewport

Export `metadata` and `viewport` from `app/layout.tsx` or from a dedicated file in `lib/`:

```tsx
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "App Name",
  description: "App description.",
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "<light-background-color>",
    },
    { media: "(prefers-color-scheme: dark)", color: "<dark-background-color>" },
  ],
};
```

---

## 10. PWA Setup (optional)

If the app should be PWA-ready:

- [ ] Create `app/manifest.ts` using the Next.js native manifest API
- [ ] Add icons to `public/icons/`: `icon.svg`, `icon-192.png`, `icon-512.png`
- [ ] Configure `viewport.themeColor` in `lib/viewport.ts`
- [ ] Verify at `http://localhost:<PORT>/manifest.webmanifest`

---

---

## 11. Configure Testing (optional)

If the app contains testable pure logic (such as utilities, data transformations, or custom validators):

- [ ] Install `vitest` as a dev dependency:
  ```bash
  cd apps/<app-name>
  pnpm add -D vitest
  ```
- [ ] Add the `"test": "vitest run"` script to the app's `package.json`.
- [ ] Create a `vitest.config.ts` in the app root:

  ```ts
  import { defineConfig } from "vitest/config";

  export default defineConfig({
    test: {
      include: ["**/*.test.ts", "**/*.test.tsx"],
    },
  });
  ```

- [ ] Write unit tests alongside source files as `*.test.ts` or `*.test.tsx`.

---

## 12. Update Dev Container

When adding a new app, update `.devcontainer/devcontainer.json` to forward the new port:

```json
{
  "forwardPorts": [16000, 16001],
  "portsAttributes": {
    "16001": {
      "label": "Portfolio",
      "onAutoForward": "notify"
    }
  }
}
```

---

## 13. Update Hub App List

If the new app should appear on the Hub portal, add an entry to `apps/hub/config/apps.ts`:

```ts
{
  name: "App Name",
  description: "Short description.",
  href: "https://your-app-url.com",
  status: "planned", // or "available"
}
```

---

## 14. Update Root README

If the project structure changed (new app, new package, new port), update the apps table in `README.md`.

---

## 15. Install and Verify

Run these from the **monorepo root** after scaffolding:

```bash
# Install all workspace dependencies
pnpm install

# Type check + lint + format check
pnpm verify

# Run all unit tests
pnpm test

# Build all packages (catch config issues early)
pnpm build

# Run only the new app in dev mode
pnpm --filter <app-name> dev
```

Fix any errors before continuing.
