import { describe, expect, it } from 'vitest';

import { getEnvConfig } from '@/config/env';

describe('getEnvConfig', () => {
  it('reports Supabase as configured for the Project Social environment', () => {
    const config = getEnvConfig();

    expect(config.isSupabaseConfigured).toBe(true);
    expect(config.supabaseUrl).toBe('https://zsnutlvglnylmamacldd.supabase.co');
    expect(config.supabaseAnonKey).toBeTruthy();
  });

  it('reports media as unconfigured when public base URL is absent', () => {
    const config = getEnvConfig();

    expect(config.isMediaConfigured).toBe(false);
    expect(config.mediaPublicBaseUrl).toBeNull();
  });
});
