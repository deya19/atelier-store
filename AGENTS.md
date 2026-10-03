<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project status

This repository is the initial foundation for the Atelier Store application. The current work is limited to project setup and minimal integrations; do not add ecommerce features unless explicitly requested.

## Current architecture

- Next.js App Router with TypeScript and Tailwind CSS.
- `src/app/` contains the root layout, placeholder home route, global styles, and the Better Auth catch-all API route.
- `src/lib/db.ts` creates the Drizzle ORM client using Neon Postgres and `DATABASE_URL`.
- `src/lib/auth.ts` configures Better Auth with the Drizzle PostgreSQL adapter.
- `src/app/api/auth/[...all]/route.ts` exposes Better Auth through Next.js GET and POST handlers.
- `drizzle.config.ts` is prepared for future PostgreSQL schema and migration work.
- `.env.example` documents `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`.

## Scope boundaries

The project does not yet contain product, inventory, cart, checkout, payment, authentication UI, authorization, or database schemas. Keep future changes minimal and aligned with the requested scope.

## Verification

Use these commands after changes:

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
