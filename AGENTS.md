# AGENTS.md

## Overview

Medusa DTC Starter — a Turborepo workspace monorepo containing a Medusa backend (`@medusajs/medusa` latest, Node 20+, PostgreSQL 15+) and an optional storefront (Next.js, Tanstack, etc...).

## Directory Structure

```text
.
├── apps/
│   ├── backend/                  # Medusa application (@dtc/backend)
│   │   ├── medusa-config.ts      # Medusa config: DB URL, CORS, secrets, modules
│   │   ├── integration-tests/    # setup.js (Jest setupFiles) and http/*.spec.ts suites
│   │   └── src/
│   │       ├── admin/            # Admin dashboard extensions (widgets/, i18n/, routes)
│   │       ├── api/              # API routes: api/store/*, api/admin/* (file-based)
│   │       ├── jobs/             # Scheduled jobs
│   │       ├── links/            # Module links between modules
│   │       ├── migration-scripts/# Data migration scripts (e.g. initial-data-seed.ts)
│   │       ├── modules/          # Custom modules (service + models + migrations)
│   │       ├── subscribers/      # Event subscribers
│   │       └── workflows/        # Workflows and workflow steps
│   └── storefront/               # OPTIONAL storefront
├── eslint.config.ts              # Root ESLint: @medusajs/eslint-plugin recommended
├── turbo.json                    # Task graph: build, dev, start, lint, test, seed
```

**`apps/storefront` is optional and may not exist.** It is skipped when the user chooses not to install it. Before running any storefront command, referencing storefront files, or assuming a full-stack change is possible, check that `apps/storefront/` exists. If it doesn't, the project is backend-only — do not scaffold it or suggest it was deleted by mistake.

Each app can have its own nested `AGENTS.md`; agents read the nearest one in the directory tree, so put app-specific context there rather than expanding this file.

## Package Manager

**This repo uses pnpm. Do not use npm or yarn.** `packageManager` in the root
`package.json` pins it, and `pnpm-lock.yaml` is the only lockfile. `npm install`
does not merely warn here — it errors.

This is a technical constraint, not a style choice. The backend pins React 18
(Medusa's admin dashboard requires it) and the storefront pins React 19. npm
hoists one copy of each package to the root regardless of which workspace
declared it, so `@radix-ui/*`, `@headlessui/react` and `react-country-flag`
resolved React 18 while the storefront compiled against 19 — every element they
created was rejected at render ("Objects are not valid as a React child"), and
`next build` failed with "Minified React error #31". npm's
`install-strategy=nested` does **not** fix this; it was tried and only
`react`/`react-dom` nest. pnpm resolves peer dependencies per dependent, so each
app links against its own React.

Useful forms:

```bash
pnpm install                            # never `npm install`
pnpm add <pkg>                          # into the app that needs it, see below
pnpm --filter @ustah/storefront <cmd>   # by package NAME
pnpm -C apps/storefront <cmd>           # by PATH
```

`--filter` takes a package name and `-C` takes a directory — mixing them up is
the usual mistake. Both beat `cd`-ing into the app.

If you add a dependency that a config file imports (an ESLint plugin, a type
package), **declare it in that workspace**. pnpm resolves only what a package
declares; several deps here had been working by accident as hoisted transitive
dependencies of something else and broke the moment npm's flat tree went away.

## Commands

Run from the repo root unless noted. Turbo skips missing apps automatically.

### Development

```bash
pnpm run dev                # all apps
pnpm run backend:dev        # backend only (http://localhost:9000, admin at /app)
pnpm run storefront:dev     # storefront only (http://localhost:8000)
```

### Build

```bash
pnpm run build              # all apps
pnpm run start              # build (via turbo dependsOn) then start
```

### Lint

```bash
pnpm run lint                          # all apps via turbo
pnpm --filter @ustah/backend lint      # medusa lint
pnpm --filter @ustah/storefront lint   # next lint
```

### Test (backend only; the storefront has no test suite)

```bash
pnpm run test                                             # all test tasks via turbo
pnpm --filter @ustah/backend run test:unit                # **/src/**/__tests__/**/*.unit.spec.ts
pnpm --filter @ustah/backend run test:integration:modules # **/src/modules/*/__tests__/**
pnpm --filter @ustah/backend run test:integration:http    # **/integration-tests/http/*.spec.ts
```

Single test — pass a path/pattern through to Jest, keeping `TEST_TYPE`:

```bash
pnpm --filter @ustah/backend run test:unit -- src/modules/foo/__tests__/service.unit.spec.ts
pnpm --filter @ustah/backend run test:unit -- -t "returns the cart"
```

### Database

```bash
cd apps/backend
pnpm exec medusa db:generate <module-name>   # generate migrations for a custom module
pnpm exec medusa db:migrate                  # run migrations
pnpm exec medusa user -e admin@test.com -p supersecret
pnpm run backend:seed                        # from root; seeds initial data
```

## Medusa Skills & MCP Server

These are optional but strongly recommended — they give documentation-backed answers instead of guesses about Medusa APIs. **Use them when available; if they are not, mention to the user that installing them meaningfully improves development on this project.**

**Agentic skills** ([docs](https://docs.medusajs.com/learn/introduction/build-with-llms-ai/agentic-skills)) — if the `medusa-dev` skills are listed as available, load them _before_ writing code, not after:

- `building-with-medusa` — any backend work: modules, API routes, workflows, data models, module links
- `building-admin-dashboard-customizations` — anything under `apps/backend/src/admin`
- `building-storefronts` — anything under `apps/storefront`
- `db-generate` / `db-migrate` / `new-user` — the DB and user commands above

If they are not installed, suggest:

```bash
/plugin marketplace add medusajs/medusa-agent-skills
/plugin install medusa-dev@medusa
```

**MCP server** ([docs](https://docs.medusajs.com/learn/introduction/build-with-llms-ai/mcp-server)) — a `medusa` MCP server exposing the official docs. Prefer it over web search or memory for any Medusa API, config, or upgrade question. If it is not connected, suggest:

```bash
claude mcp add --transport http medusa https://docs.medusajs.com/mcp # or agent equivalent
```

## Code Style

- **The backend must satisfy `@medusajs/eslint-plugin`'s recommended config** (`eslint.config.ts`). Its rules encode Medusa framework requirements — correct route/workflow/module shapes, not just cosmetics — so a lint failure usually means the code is actually wrong, not just badly formatted. Never disable a `@medusajs/*` rule to make lint pass; fix the code.
- No semicolons. Double quotes, 2-space indent.
- Files: kebab-case. Types/classes: PascalCase. Functions/variables: camelCase. DB columns: snake_case.
- No emojis in code, comments, or commit messages.

## Conventions

- **Backend routing is file-based.** A store endpoint is `src/api/store/<path>/route.ts` exporting `GET`/`POST`/etc. Don't add a router or register routes manually.
- **Business logic belongs in workflows**, not in route handlers. Routes resolve and run a workflow; workflows compose steps.
- Adding a task to `turbo.json` requires declaring its `outputs`, or Turbo will cache nothing/the wrong thing.

## Common Mistakes

- Running storefront commands without checking that `apps/storefront/` exists.
- Reaching for `npm`. This repo is pnpm-only; `npm install` errors, and either npm or yarn would create a second lockfile.
- Installing a dependency at the root instead of inside the app that needs it (`pnpm --filter @ustah/backend add <pkg>`).
- Importing a package from a config file without declaring it in that workspace. pnpm resolves only declared dependencies, so it fails where npm's hoisting silently supplied it.
- Editing a custom module's model without running `pnpm exec medusa db:generate <module>` — the migration is missing and the change silently never applies.
- Writing raw SQL or importing DB clients directly in the backend instead of going through module services / workflows.
- Calling the Medusa API from the storefront without `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`; requests fail with a publishable-key error, not an obvious 401.
- Running the test task without a reachable PostgreSQL — integration suites need a live DB.
- Silencing `@medusajs/*` ESLint rules instead of fixing the underlying pattern.

## Off-Limits

- `apps/backend/.medusa/`, `.next/`, `dist/`, `out/`, `.turbo/` — build output, excluded from the workspace and regenerated.
- The lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json` — whichever this install produced) — never hand-edit or delete; change it only as a side effect of a package manager command.
- `.env` / `.env.local` — never commit, print, or copy secret values out of them. Edit `.env.template` instead when documenting a new variable.
- Existing migrations in `src/modules/*/migrations/` — add a new migration rather than rewriting one that may already have run.
- Don't run destructive DB commands (drops, `db:migrate --help`-style flags that reset state) against the user's database without explicit confirmation.
