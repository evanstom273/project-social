# Data access layer

Functions in this directory are the **only** entry point features should use for reading
and writing application data.

## Principles

- Keep React components free of database query logic.
- Supabase PostgreSQL is the intentional remote data store; abstractions exist for
  separation of concerns and testability, not hypothetical vendor replacement.
- Local persistence (drafts, selective cache) lives behind these modules too.

## Current modules

| Module | Status | Backing store |
|---|---|---|
| `drafts.ts` | Implemented | IndexedDB via `integrations/local/` |

## Future modules (examples)

| Module | Backing store |
|---|---|
| `posts.ts` | Supabase |
| `projects.ts` | Supabase |
| `communities.ts` | Supabase |
| `follows.ts` | Supabase |
| `media.ts` | R2 via server-side signing + Supabase metadata |

Add functions here as features are built. Co-locate Supabase query code in dedicated files
under `integrations/supabase/queries/` if files grow large, but keep the public API in
`src/data/`.
