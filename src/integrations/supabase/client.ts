import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { getEnvConfig } from '@/config/env';

import type { Database } from './database.types';

let client: SupabaseClient<Database> | null = null;

export function getSupabaseClient(): SupabaseClient<Database> {
  if (client) {
    return client;
  }

  const env = getEnvConfig();

  if (!env.isSupabaseConfigured) {
    throw new Error(
      'Supabase client requested but VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are not set.',
    );
  }

  client = createClient<Database>(env.supabaseUrl!, env.supabaseAnonKey!);
  return client;
}

export function isSupabaseAvailable(): boolean {
  return getEnvConfig().isSupabaseConfigured;
}
