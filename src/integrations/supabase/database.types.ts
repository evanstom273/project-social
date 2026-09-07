/**
 * Placeholder for generated Supabase database types.
 *
 * When database migrations exist, replace this file with output from:
 *   supabase gen types typescript --project-id <id> > src/integrations/supabase/database.types.ts
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
