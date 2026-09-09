# Ustah

A direct-to-consumer ecommerce monorepo built on [Medusa](https://medusajs.com) v2 and Next.js, with a Medusa backend and a Next.js storefront sharing a Turborepo workspace.

## Features

- All of [Medusa's commerce features](https://docs.medusajs.com/resources/commerce-modules)
- Multi-region support with automatic country detection
- Product catalog with variant selection
- Cart with promotion codes
- Multi-step checkout with shipping and payment
- Customer accounts with order history and address management
- Order transfer between accounts

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `^20.19.0 || >=22.12.0`
- [PostgreSQL](https://www.postgresql.org/) v15+
- npm v11+ — this repo pins `npm` via the `packageManager` field. Do not use pnpm or yarn; they will refuse to run, and would create a second lockfile.

### Local Installation

1. Clone the repository and install dependencies:

```bash
git clone git@github.com:Lirak-f/ustah.git
cd ustah
npm install
```

2. Set up environment variables for the backend:

```bash
cp apps/backend/.env.template apps/backend/.env
```

3. Set the database URL in `apps/backend/.env`:

```bash
# Replace with actual database URL, make sure the database exists.
DATABASE_URL=postgres://postgres:@localhost:5432/ustah
```

4. Run migrations:

```bash
cd apps/backend
npx medusa db:migrate
```

5. Add admin user:

```bash
cd apps/backend
npx medusa user -e admin@test.com -p supersecret
```

6. Start the Medusa backend:

```bash
npm run backend:dev
```

7. Open the admin dashboard at `localhost:9000/app` and log in. Retrieve your publishable API key at Settings > Publishable API key.

8. Create `apps/storefront/.env.local` with your Medusa publishable API key:

```bash
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_6c3...
```

9. Start the storefront:

```bash
npm run storefront:dev
```

The storefront runs on `http://localhost:8000`.

You can also run the following command from the root to start both backend and storefront:

```bash
npm run dev
```

## Commands

Run from the repo root. Turbo fans each task out to both apps.

```bash
npm run dev              # backend + storefront
npm run backend:dev      # backend only (http://localhost:9000, admin at /app)
npm run storefront:dev   # storefront only (http://localhost:8000)
npm run build            # build all apps
npm run start            # build, then start
npm run lint             # lint all apps
npm run test             # backend test suites (needs a reachable PostgreSQL)
```

## Configuration

The storefront is configured via environment variables in `apps/storefront/.env.local`:

| Variable                             | Description                                  | Default                  |
| ------------------------------------ | -------------------------------------------- | ------------------------ |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Publishable API key from your Medusa backend | —                        |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL`     | URL of your Medusa backend                   | `http://localhost:9000`  |
| `NEXT_PUBLIC_DEFAULT_REGION`         | Default region country code                  | `dk`                     |
| `NEXT_PUBLIC_BASE_URL`               | Base URL of the storefront                   | `https://localhost:8000` |

Backend variables (CORS origins, `DATABASE_URL`, `REDIS_URL`, and the JWT/cookie secrets) live in `apps/backend/.env` — see `apps/backend/.env.template`.

## Resources

- [Medusa Documentation](https://docs.medusajs.com)
- [AGENTS.md](./AGENTS.md) — directory structure, conventions, and commands for this repo
