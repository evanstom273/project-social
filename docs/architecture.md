# Architecture

Project Social is a single-page React application with clear layer boundaries. Supabase,
Cloudflare R2, and IndexedDB are intentional technology choices — boundaries exist to keep
responsibilities separated and the codebase testable, not to make every integration
theoretically swappable.

## Layer overview

```
┌─────────────────────────────────────────────────────────────┐
│  app/          Bootstrap, routing, provider composition     │
├─────────────────────────────────────────────────────────────┤
│  features/     Route-facing UI and feature-specific logic   │
├─────────────────────────────────────────────────────────────┤
│  components/   Reusable design-system and layout primitives │
├─────────────────────────────────────────────────────────────┤
│  data/         Data-access functions consumed by features   │
├─────────────────────────────────────────────────────────────┤
│  integrations/ Direct adapters for external systems         │
├─────────────────────────────────────────────────────────────┤
│  domain/       Entities, types, pure business rules          │
├─────────────────────────────────────────────────────────────┤
│  config/       Environment and application constants        │
└─────────────────────────────────────────────────────────────┘
```

## Dependency rules

| Layer | May import from | Must not import |
|---|---|---|
| `features/` | `components/`, `data/`, `domain/`, `config/`, `lib/` | `integrations/` directly |
| `components/` | `domain/`, `config/`, `lib/` | `features/`, `data/`, `integrations/` |
| `data/` | `integrations/`, `domain/`, `config/` | React |
| `integrations/` | `config/`, `domain/` | `features/`, React |
| `domain/` | — | React, I/O, integrations |

## External systems

### Supabase (`src/integrations/supabase/`)

- **PostgreSQL** — source of truth for structured data
- **Auth** — user identity (wired through `AuthProvider` when implemented)
- **Realtime** — only where it provides genuine value

Feature code calls `src/data/*.ts` functions. Those functions use the Supabase client from
`integrations/supabase/client.ts`. Database types will be generated into
`database.types.ts` once migrations exist.

### Cloudflare R2 (`src/integrations/storage/`)

- Stores user-uploaded images and short videos
- Browser clients never receive object-storage credentials
- Uploads require a **server-side signing endpoint** (implementation TBD)
- `media-storage.ts` defines the frontend boundary; see `integrations/storage/README.md`

### IndexedDB (`src/integrations/local/`)

- Deliberate local persistence: composer drafts, selective cache metadata
- **Not** a replica of remote data and **not** a bidirectional sync target
- Supabase remains the source of truth for published content

## Data access (`src/data/`)

Contains functions such as `saveDraft()` and (later) `listPosts()`. This is the only layer
features should use for persistence operations.

Abstractions appear when they improve separation, testability, or clarity — not to keep
Supabase replaceable.

## Authentication (`src/app/providers/AuthProvider.tsx`)

Currently exposes an unauthenticated stub. When Supabase Auth is implemented:

1. Session subscription lives in `integrations/supabase/auth.ts` (to be added)
2. `AuthProvider` exposes `user`, `isLoading`, and sign-in/out actions
3. Auth UI remains in `features/auth/`

## Routing

React Router drives client-side navigation. `/` is the landing experience inside the
application shell. Most destinations are placeholders until their features are built.

Reserved route shapes for later:

- `/p/:slug` — project page
- `/c/:slug` — community page

## Styling

Design tokens from `project-social-design.md` are implemented as CSS custom properties and
Tailwind theme values in `src/styles/index.css`. New UI should use these tokens rather than
hard-coded colours.

## Testing

- **Vitest** + **Testing Library** for unit and component tests
- Domain rules and config helpers are pure and easy to test in isolation
- Router tests verify shell rendering and navigation between initial routes

## Explicit non-goals (for now)

- Generic bidirectional sync between IndexedDB and Supabase
- TanStack Query (add when first real remote queries land)
- Microservices, Redis, Elasticsearch, queues, containers
- Server-side upload signer implementation in this repository
- Full social feed, working auth, or media uploads

## Deployment notes

The app is a static Vite build suitable for **Cloudflare Pages** (or similar). SPA routing
requires serving `index.html` for unknown paths — see `public/_redirects`.

Set production environment variables in the hosting provider dashboard. Never commit secrets.
