export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: { Row: { id: string; handle: string; display_name: string; avatar_url: string | null; bio: string | null; created_at: string; updated_at: string }; Insert: { id: string; handle: string; display_name: string; avatar_url?: string | null; bio?: string | null; created_at?: string; updated_at?: string }; Update: { id?: string; handle?: string; display_name?: string; avatar_url?: string | null; bio?: string | null; updated_at?: string }; Relationships: [] };
      projects: { Row: { id: string; owner_id: string; slug: string; name: string; description: string | null; category: string; technology: string | null; status: string; accent_color: string | null; avatar_url: string | null; cover_url: string | null; created_at: string; updated_at: string }; Insert: { id?: string; owner_id: string; slug: string; name: string; description?: string | null; category: string; technology?: string | null; status?: string; accent_color?: string | null; avatar_url?: string | null; cover_url?: string | null; created_at?: string; updated_at?: string }; Update: { id?: string; owner_id?: string; slug?: string; name?: string; description?: string | null; category?: string; technology?: string | null; status?: string; accent_color?: string | null; avatar_url?: string | null; cover_url?: string | null; updated_at?: string }; Relationships: [{ foreignKeyName: 'projects_owner_id_fkey'; columns: ['owner_id']; isOneToOne: false; referencedRelation: 'profiles'; referencedColumns: ['id'] }] };
      posts: { Row: { id: string; author_id: string; project_id: string | null; type: string; title: string | null; body: string; tags: string[]; ai_assisted: boolean; media_url: string | null; media_metadata: Json | null; created_at: string; updated_at: string }; Insert: { id?: string; author_id: string; project_id?: string | null; type: string; title?: string | null; body: string; tags?: string[]; ai_assisted?: boolean; media_url?: string | null; media_metadata?: Json | null; created_at?: string; updated_at?: string }; Update: { id?: string; author_id?: string; project_id?: string | null; type?: string; title?: string | null; body?: string; tags?: string[]; ai_assisted?: boolean; media_url?: string | null; media_metadata?: Json | null; updated_at?: string }; Relationships: [{ foreignKeyName: 'posts_author_id_fkey'; columns: ['author_id']; isOneToOne: false; referencedRelation: 'profiles'; referencedColumns: ['id'] }, { foreignKeyName: 'posts_project_id_fkey'; columns: ['project_id']; isOneToOne: false; referencedRelation: 'projects'; referencedColumns: ['id'] }] };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
