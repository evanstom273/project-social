import { describe, expect, it } from 'vitest';

import { getEnvConfig } from '@/config/env';

describe('getEnvConfig', () => {
  it('reports Supabase as unconfigured when env vars are absent', () => {
    const config = getEnvConfig();

    expect(config.isSupabaseConfigured).toBe(false);
    expect(config.supabaseUrl).toBeNull();
    expect(config.supabaseAnonKey).toBeNull();
  });

  it('reports media as unconfigured when public base URL is absent', () => {
    const config = getEnvConfig();

    expect(config.isMediaConfigured).toBe(false);
    expect(config.mediaPublicBaseUrl).toBeNull();
  });
});
