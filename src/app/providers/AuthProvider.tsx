import { type ReactNode, useEffect, useMemo, useState } from 'react';

import {
  AuthContext,
  type AuthContextValue,
} from '@/app/providers/auth-context';
import { getSupabaseClient, isSupabaseAvailable } from '@/integrations/supabase/client';
import { getProfile, saveProfile as persistProfile } from '@/integrations/supabase/profiles';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextValue['user']>(null);
  const [profile, setProfile] = useState<AuthContextValue['profile']>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { if (!isSupabaseAvailable()) { setIsLoading(false); return; } const client = getSupabaseClient(); let active = true; const load = async () => { try { const { data } = await client.auth.getSession(); if (!active) return; const sessionUser = data.session?.user ?? null; setUser(sessionUser ? { id: sessionUser.id, email: sessionUser.email ?? null } : null); setProfile(sessionUser ? await getProfile(sessionUser.id) : null); } finally { if (active) setIsLoading(false); } }; void load().catch(() => { if (active) { setUser(null); setProfile(null); } }); const { data: listener } = client.auth.onAuthStateChange((_event, session) => { const sessionUser = session?.user ?? null; setUser(sessionUser ? { id: sessionUser.id, email: sessionUser.email ?? null } : null); void (sessionUser ? getProfile(sessionUser.id).then(setProfile).catch(() => setProfile(null)) : Promise.resolve(setProfile(null))); }); return () => { active = false; listener.subscription.unsubscribe(); }; }, []);
  const value = useMemo<AuthContextValue>(() => ({ user, profile, isLoading, isAuthenticated: Boolean(user), signIn: async (email, password) => { const { error } = await getSupabaseClient().auth.signInWithPassword({ email, password }); if (error) throw error; }, signUp: async ({ email, password, handle, displayName, ageConfirmed }) => { if (!ageConfirmed) throw new Error('Please confirm that you meet the minimum age requirement.'); const { data, error } = await getSupabaseClient().auth.signUp({ email, password, options: { data: { handle, display_name: displayName } } }); if (error) throw error; if (data.user && data.session) { const next = await persistProfile(data.user.id, { handle, displayName, bio: '' }); setProfile(next); } return { needsEmailConfirmation: !data.session }; }, signOut: async () => { const { error } = await getSupabaseClient().auth.signOut(); if (error) throw error; }, saveProfile: async (input) => { if (!user) throw new Error('You must be signed in.'); const next = await persistProfile(user.id, input); setProfile(next); } }), [user, profile, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
