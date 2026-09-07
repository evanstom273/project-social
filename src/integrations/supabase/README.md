# Supabase integration

This directory owns the Supabase client and any direct Supabase access code.

## Responsibilities

- **PostgreSQL** — primary structured data store (posts, projects, communities, follows, etc.)
- **Auth** — user identity and session management
- **Realtime** — selected live updates where they provide genuine value

## Boundaries

- Feature components and pages should not import `@supabase/supabase-js` directly.
- Use the `src/data/` layer for query and mutation functions that features consume.
- Only this directory (and `src/data/` modules that wrap it) should talk to Supabase.

## Setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Add SQL migrations under a future `supabase/migrations/` directory at the repo root.
4. Generate types into `database.types.ts` when the schema exists.

## Auth (not yet implemented)

Session state will be exposed through `src/app/providers/AuthProvider.tsx`, backed by
`supabase.auth` in this directory when authentication is built.

## Realtime (not yet implemented)

Subscribe only where realtime genuinely improves UX. Supabase remains the source of truth;
IndexedDB is not a sync target for remote data.
