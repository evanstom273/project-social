import type { AuthProfile } from '@/app/providers/auth-context';
import { getSupabaseClient } from './client';

export function normalizeHandle(value: string) { return value.trim().replace(/^@/, '').toLowerCase(); }
export function isValidHandle(value: string) { return /^[a-z0-9_]{3,30}$/.test(normalizeHandle(value)); }
function mapProfile(row: { id: string; handle: string; display_name: string; avatar_url: string | null; bio: string | null }): AuthProfile { return { id: row.id, handle: row.handle, displayName: row.display_name, avatarUrl: row.avatar_url, bio: row.bio }; }

export async function getProfile(userId: string) { const { data, error } = await getSupabaseClient().from('profiles').select('*').eq('id', userId).maybeSingle(); if (error) throw error; return data ? mapProfile(data) : null; }
export async function saveProfile(userId: string, input: { handle: string; displayName: string; bio: string; avatarUrl?: string | null }) {
  const handle = normalizeHandle(input.handle);
  if (!isValidHandle(handle)) throw new Error('Handle must be 3–30 characters using lowercase letters, numbers, or underscores.');
  const { data, error } = await getSupabaseClient().from('profiles').upsert({ id: userId, handle, display_name: input.displayName.trim(), bio: input.bio.trim() || null, avatar_url: input.avatarUrl ?? null }, { onConflict: 'id' }).select('*').single();
  if (error) { if (error.code === '23505') throw new Error('That handle is already taken.'); throw error; }
  return mapProfile(data);
}
export async function getPublicProfileByHandle(handle: string) { const { data, error } = await getSupabaseClient().from('profiles').select('*').eq('handle', normalizeHandle(handle)).maybeSingle(); if (error) throw error; return data ? mapProfile(data) : null; }
