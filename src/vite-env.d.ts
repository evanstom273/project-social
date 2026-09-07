/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_MEDIA_PUBLIC_BASE_URL?: string;
  readonly VITE_MEDIA_UPLOAD_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
