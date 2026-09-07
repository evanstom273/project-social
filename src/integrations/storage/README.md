# Media storage integration

User-uploaded images and short videos are stored in **Cloudflare R2**. The frontend only
interacts with media through `media-storage.ts`.

## Security boundary

Browsers must **never** receive R2 credentials or direct write access to the bucket.
Uploads require a **server-side signing mechanism** that:

1. Authenticates the user.
2. Validates file type, size, and purpose (e.g. post image, post video ≤ 60s).
3. Returns a short-lived signed upload URL or proxies the upload.

The exact server implementation (Cloudflare Worker, Supabase Edge Function, or other)
will be decided when media uploads are built. This repository does not include that
server code yet.

## Environment variables

| Variable | Purpose |
|---|---|
| `VITE_MEDIA_PUBLIC_BASE_URL` | Public CDN or R2 custom domain for reading media |
| `VITE_MEDIA_UPLOAD_API_URL` | Endpoint that issues signed upload URLs |

## Usage

Features should call `src/data/media.ts` rather than importing this module directly.
