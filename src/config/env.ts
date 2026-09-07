export type EnvConfig = {
  supabaseUrl: string | null;
  supabaseAnonKey: string | null;
  mediaPublicBaseUrl: string | null;
  mediaUploadApiUrl: string | null;
  isSupabaseConfigured: boolean;
  isMediaConfigured: boolean;
};

function readEnv(key: string): string | null {
  const value = import.meta.env[key];
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function getEnvConfig(): EnvConfig {
  const supabaseUrl = readEnv('VITE_SUPABASE_URL');
  const supabaseAnonKey = readEnv('VITE_SUPABASE_ANON_KEY');
  const mediaPublicBaseUrl = readEnv('VITE_MEDIA_PUBLIC_BASE_URL');
  const mediaUploadApiUrl = readEnv('VITE_MEDIA_UPLOAD_API_URL');

  return {
    supabaseUrl,
    supabaseAnonKey,
    mediaPublicBaseUrl,
    mediaUploadApiUrl,
    isSupabaseConfigured: Boolean(supabaseUrl && supabaseAnonKey),
    isMediaConfigured: Boolean(mediaPublicBaseUrl),
  };
}

export function assertSupabaseConfigured(config: EnvConfig): void {
  if (!config.isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    );
  }
}
