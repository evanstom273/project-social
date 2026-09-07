# Project Social

A project-centred social platform for discovering, following and sharing things while they're being made.

## Stack

- TypeScript, React, Vite, Tailwind CSS
- pnpm, Vitest
- Supabase (PostgreSQL, Auth, Realtime) — integration boundaries established
- Cloudflare R2 — media storage boundary established
- IndexedDB (Dexie) — local drafts and selective cache

See [docs/architecture.md](./docs/architecture.md) for layer boundaries, integration homes, and architectural decisions.

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 9+

## Setup

```bash
pnpm install
cp .env.example .env.local
```

Edit `.env.local` when you have Supabase or media environment values. The application runs without them for local UI development.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the Vite dev server |
| `pnpm build` | Typecheck and produce a production build |
| `pnpm preview` | Preview the production build locally |
| `pnpm typecheck` | Run TypeScript without emitting |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run Vitest once |
| `pnpm test:watch` | Run Vitest in watch mode |

## Project structure

```
src/
  app/            Application bootstrap, routing, providers
  components/     Design-system and layout components
  config/         Environment and constants
  data/           Data-access functions for features
  domain/         Types and pure business rules
  features/       Feature-specific pages and logic
  integrations/   Supabase, R2, IndexedDB adapters
  lib/            Shared utilities
  styles/         Global styles and design tokens
```

## Design

Visual language and component guidance live in [`project-social-design.md`](./project-social-design.md).
Product concept: [`Project_Centred_Social_Network_Concept.docx`](./Project_Centred_Social_Network_Concept.docx).

## Deployment (first open)

1. Run `pnpm build` — output is in `dist/`.
2. Deploy `dist/` to Cloudflare Pages (or equivalent static host).
3. Configure SPA fallback so client routes resolve to `index.html` (`public/_redirects` is included for Cloudflare).
4. Set environment variables in the host dashboard when Supabase and media services are ready.

No secrets belong in the repository. Use `.env.local` locally and provider secrets in production.

## Current status

This repository contains the application scaffold: architecture, design-token foundation,
responsive application shell, landing page at `/`, placeholder routes, integration boundaries,
and tests. Authentication, remote feeds, media uploads, and realtime are not yet implemented.
