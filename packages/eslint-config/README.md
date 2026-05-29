# @repo/eslint-config

Shared ESLint 9 flat configurations used across the monorepo.

## Configs

| Export                               | Used by                                                         |
| ------------------------------------ | --------------------------------------------------------------- |
| `@repo/eslint-config/base`           | Generic TypeScript packages (e.g. `@repo/supabase`, `@repo/ui`) |
| `@repo/eslint-config/next-js`        | Next.js applications (e.g. `apps/hub`)                          |
| `@repo/eslint-config/react-internal` | React component packages without a Next.js context              |

## Usage

In a TypeScript package's `eslint.config.mjs`:

```js
import { config } from "@repo/eslint-config/base";

export default [...config, { ignores: ["dist/**"] }];
```

For Next.js apps:

```js
import { config } from "@repo/eslint-config/next-js";

export default [...config];
```
