# Contributing to Osweng Space

Thank you for working on this project. Follow these guidelines to keep the codebase consistent and healthy.

---

## Before You Push

Run these commands before every push. Do not skip them.

```bash
# Type checking + linting + format check
pnpm verify
```

Additionally:

| Scenario                                          | Required command        |
| ------------------------------------------------- | ----------------------- |
| Changed app/package config or production behavior | `pnpm build`            |
| Changed UI or runtime behavior                    | `pnpm dev` (spot-check) |
| Added or changed logic with unit tests            | `pnpm test`             |

Push only after verification passes.

---

## Coding Practices

- **TypeScript-first.** All new files use TypeScript. Avoid `any`; use proper types or `unknown`.
- **Keep it simple and readable.** Prefer explicit code over clever abstractions. Optimize for the next reader.
- **No unnecessary abstractions.** Don't create shared utilities, hooks, or wrappers prematurely. Add them when there is genuine reuse across two or more callers.
- **App-specific logic stays in the app.** Don't push app-specific concerns into shared packages.
- **Reusable UI and Layout Primitives live in `packages/ui`.** If a component or layout structure (e.g. shell, header, footer, main container) is used by more than one app, or establishes a baseline standard pattern for future apps, it belongs in `@repo/ui`. Individual apps should compose these shared primitives instead of duplicating structural styles.
- **Shared Supabase helpers live in `packages/supabase`.** Keep the Supabase client wrapper and any shared data helpers there.
- **Use semantic theme tokens in components.** Write `bg-primary`, `text-accent-foreground`, `bg-destructive`, etc. — not hardcoded color scales like `zinc-900` or `red-600`. This keeps components theme-aware and reusable across apps.

---

## Naming Conventions

| Thing                           | Convention                                    | Example                     |
| ------------------------------- | --------------------------------------------- | --------------------------- |
| Folders and files               | kebab-case                                    | `site-header.tsx`           |
| React components                | PascalCase                                    | `SiteHeader`                |
| Functions and variables         | camelCase                                     | `getAppList`                |
| Types and interfaces            | PascalCase                                    | `AppConfig`, `SiteMetadata` |
| Constants (true constants only) | `UPPER_SNAKE_CASE` or descriptive `camelCase` | `DEFAULT_PORT`, `hubApps`   |

Use `UPPER_SNAKE_CASE` only for values that are truly constant across the entire runtime (env-like values, magic numbers). For most named exports, `camelCase` is preferred.

---

## Import Conventions

| Alias     | Resolves to                         | Where it applies         |
| --------- | ----------------------------------- | ------------------------ |
| `@/*`     | App root (e.g. `apps/hub/`)         | Inside each app          |
| `~/*`     | Package root `src/` directory       | Inside shared packages   |
| `@repo/*` | Workspace package (e.g. `@repo/ui`) | Anywhere in the monorepo |

Always use the correct alias. Never use relative paths to cross app/package boundaries.

---

## Testing

- Use [Vitest](https://vitest.dev/) for unit tests. Do not use Jest.
- Tests live alongside source files: `src/lib/utils.test.ts`, not in a separate `__tests__` directory.
- Each package/app that has tests declares its own `"test": "vitest run"` script.
- `pnpm test` (root) runs all tests via Turborepo.
- Only test logic that is worth testing — pure functions, data transformations, validation helpers. Do not write tests just to hit coverage numbers.
- Do not add Playwright or browser E2E tests until an app has enough user-facing behavior to justify the setup cost.
- Tests must not require real network calls or environment secrets. If mocking is unavoidable, keep it minimal.

---

## Dependency Ownership

- If an app or package **directly imports** a dependency, it must declare that dependency in its own `package.json`.
- Do not rely on transitive dependencies from other workspace packages.
- Shared UI dependencies (Radix, `class-variance-authority`, `tailwind-merge`, etc.) belong in `packages/ui/package.json`.
- App-specific dependencies belong in that app's `package.json`.
- Explain why before adding a new dependency — prefer the platform and existing packages.

---

## Git Workflow

- Make **small, focused commits**. Each commit should represent one logical change.
- Write **clear commit messages** describing what changed and why.
- Never commit `.env.local` or any file containing secrets.
- Push only after `pnpm verify` passes.
- Pull Requests should include:
  - A short summary of what changed and why.
  - Verification results (`pnpm verify`, `pnpm build` if applicable).
  - Screenshots or recordings for any UI changes.

---

## Code Review Checklist

Before approving or merging, confirm:

- [ ] Types pass (`pnpm check-types`)
- [ ] Lint passes (`pnpm lint`)
- [ ] Formatting passes (`pnpm format:check`)
- [ ] No secrets or environment values are hardcoded
- [ ] No dead code or unused imports
- [ ] Docs updated if setup, conventions, or configuration changed
- [ ] PR includes screenshots for UI changes
