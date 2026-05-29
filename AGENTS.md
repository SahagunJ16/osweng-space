# AGENTS.md — Rules for AI Coding Agents

This file defines mandatory rules for AI coding agents (Copilot, Cursor, Gemini, Claude, etc.) working in this repository. Follow every rule strictly. When in doubt, ask rather than assume.

---

## Before You Touch Any Code

1. Read `README.md` for the overall project structure, tech stack, and conventions.
2. Read `CONTRIBUTING.md` for coding practices, naming conventions, import rules, and the Git workflow.
3. Read the relevant app or package README (e.g. `apps/hub/README.md`) before editing files in that app or package.
4. **Inspect current files before editing.** Do not assume directory structure, exports, or file contents. Use directory listings and file reads first.

---

## Scope of Changes

- Make **minimal, focused changes** that address the task. Avoid refactoring unrelated code.
- Do **not** create new apps or packages without explicit instruction from the user.
- Do **not** change the package manager (pnpm), framework (Next.js), or core architecture without explicit approval.
- Ask before performing destructive actions: deleting packages, rewriting large files, changing Git history, or major refactors.

---

## Dependencies

- Do **not** add new dependencies unless they are genuinely necessary.
- When adding a dependency, explain why it is needed and why an existing package cannot solve the problem.
- Respect dependency ownership: if an app or package directly imports something, it must declare it in its own `package.json`. Do not rely on transitive dependencies.
- Shared UI dependencies belong in `packages/ui`. App-specific dependencies belong in the app.

---

## Import Conventions

Always use the correct alias. Never use relative paths to cross app/package boundaries.

| Alias             | Resolves to                                 | Where it applies         |
| ----------------- | ------------------------------------------- | ------------------------ |
| `@/*`             | App root (e.g. `apps/hub/`)                 | Inside each app          |
| `#/*`             | Package root `src/` directory               | Inside shared packages   |
| `@osweng-space/*` | Workspace package (e.g. `@osweng-space/ui`) | Anywhere in the monorepo |

When generating code inside a shared package (e.g. `packages/ui`), normalize internal imports to `#/*`.

---

## UI Components and Theme

- When adding shadcn/ui components, add them to `packages/ui` using the shadcn CLI:
  ```bash
  cd packages/ui
  pnpm dlx shadcn@latest add <component>
  ```
- Do **not** duplicate components inside individual apps if they belong in `@osweng-space/ui`.
- Use the shared `ThemeProvider`, `ThemeToggle`, and **layout primitives** from `@osweng-space/ui`. Do not create local theme implementations or duplicate layout styling.
  - `ThemeProvider` → `@osweng-space/ui/components/providers/theme-provider`
  - `ThemeToggle` → `@osweng-space/ui/components/theme/theme-toggle`
  - `AppShell` → `@osweng-space/ui/components/layout/app-shell`
  - `AppHeader` → `@osweng-space/ui/components/layout/app-header`
  - `AppFooter` → `@osweng-space/ui/components/layout/app-footer`
  - `MainContainer` → `@osweng-space/ui/components/layout/main-container`
- **Always use semantic theme tokens** in component classes (`bg-primary`, `text-accent-foreground`, `bg-destructive`, etc.). Do not hardcode color scales like `zinc-900` or `red-600`. This keeps components theme-aware and portable across apps.

---

## Styling

- Tailwind CSS v4 is **CSS-first** — there is no `tailwind.config.js`. Do not create one.
- Global styles and custom properties live in `packages/ui/src/styles/globals.css`. This file defines the **Caffeine** theme — oklch-based color tokens, chart colors, sidebar tokens, spacing, shadows, and typography for both light and dark modes.
- Each app imports shared styles via `@import "@osweng-space/ui/styles/globals.css";` in its own `app/globals.css`. Do not duplicate style definitions or redefine tokens locally.

---

## Testing

- Use [Vitest](https://vitest.dev/) for unit tests. Do not use Jest.
- Tests live alongside source files (`src/lib/utils.test.ts`), not in a separate `__tests__` folder.
- Each package or app that has tests must declare `"test": "vitest run"` in its own `package.json`.
- `pnpm test` (root) runs all package tests via Turborepo.
- Only test pure logic — utilities, data transforms, validation. Do not write render tests or snapshot tests unless the user explicitly asks.
- Tests must not require real network calls or environment secrets.
- Do not add Playwright or E2E tests without explicit instruction.

---

## After Making Changes

1. Run `pnpm verify` (type checking + linting + format check). Fix all errors before finishing.
2. Run `pnpm test` if you added or changed tested logic.
3. Run `pnpm build` if you changed any app/package config, `package.json`, or anything that affects production behavior.
4. Update documentation (`README.md`, the relevant app README, or `docs/app-setup-checklist.md`) if you changed any setup steps, conventions, or configuration.

---

## Security and Secrets

- Never read, log, print, or expose `.env.local` or any file containing private keys, tokens, or credentials.
- Never hardcode environment values into source files.
- Never commit `.env.local`.

---

## Hub-specific Notes

- Hub uses Webpack (`next dev --webpack`) — do not switch to Turbopack without explicit approval.
- To add a new app entry to the Hub portal, update `apps/hub/config/apps.ts`.
