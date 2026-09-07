# Local persistence (IndexedDB)

IndexedDB provides **deliberate local persistence** — not a replica of remote data.

## What belongs here

- **Composer drafts** — survive refresh or brief offline periods
- **Selected cache metadata** — lightweight bookkeeping for cached reads (future)
- **Optional cached payloads** — only where offline resilience or performance warrants it

## What does not belong here

- A generic bidirectional sync engine
- A full offline copy of feeds, projects, or communities
- Replacing Supabase as the source of truth

## Implementation

- `db.ts` — Dexie schema and database instance
- `draft-store.ts` — low-level draft read/write helpers

Features should use `src/data/drafts.ts` rather than importing Dexie or `localDb` directly.

## Schema versioning

Increment the Dexie version in `db.ts` when tables or indexes change. Document migrations
in commit messages until a formal migration note is needed.
