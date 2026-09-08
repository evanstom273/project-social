import type { Project } from '@/domain/types';
import type { ProjectInput } from '@/integrations/local/project-store';
import { getSupabaseClient } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/database.types';

function slugify(name: string) { return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'project'; }
type ProjectRow = Database['public']['Tables']['projects']['Row'];
function mapProject(row: ProjectRow): Project { return { id: row.id, slug: row.slug, name: row.name, description: row.description, accentColor: row.accent_color, avatarUrl: row.avatar_url, creatorId: row.owner_id, category: row.category, technology: row.technology, status: row.status as Project['status'], createdAt: row.created_at, updatedAt: row.updated_at, coverUrl: row.cover_url }; }
export async function listRemoteProjects(ownerId: string) { const { data, error } = await getSupabaseClient().from('projects').select('*').eq('owner_id', ownerId).order('updated_at', { ascending: false }); if (error) throw error; return (data ?? []).map(mapProject); }
export const listPublicProjects = listRemoteProjects;
export async function createRemoteProject(ownerId: string, input: ProjectInput) { const { data, error } = await getSupabaseClient().from('projects').insert({ owner_id: ownerId, slug: `${slugify(input.name)}-${crypto.randomUUID().slice(0, 8)}`, name: input.name.trim(), description: input.description.trim() || null, category: input.category.trim() || 'Other', technology: input.technology.trim() || null, status: input.status }).select('*').single(); if (error) throw error; return mapProject(data); }
export async function updateRemoteProject(id: string, input: ProjectInput) { const { data, error } = await getSupabaseClient().from('projects').update({ name: input.name.trim(), description: input.description.trim() || null, category: input.category.trim() || 'Other', technology: input.technology.trim() || null, status: input.status }).eq('id', id).select('*').single(); if (error) throw error; return mapProject(data); }
export async function deleteRemoteProject(id: string) { const { error } = await getSupabaseClient().from('projects').delete().eq('id', id); if (error) throw error; }
