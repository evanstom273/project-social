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
  useEffect(() => {
    if (!isSupabaseAvailable()) {
      setIsLoading(false);
      return;
    }

    const client = getSupabaseClient();
    let active = true;

    async function hydrate(sessionUser: { id: string; email?: string | null } | null) {
      if (!active) return null;
      setUser(sessionUser ? { id: sessionUser.id, email: sessionUser.email ?? null } : null);
      if (!sessionUser) {
        setProfile(null);
        return null;
      }

      try {
        const nextProfile = await getProfile(sessionUser.id);
        if (active) setProfile(nextProfile);
        return nextProfile;
      } catch {
        if (active) setProfile(null);
        return null;
      }
    }

    async function load() {
      try {
        const { data } = await client.auth.getSession();
        await hydrate(data.session?.user ?? null);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void load().catch(() => {
      if (active) {
        setUser(null);
        setProfile(null);
        setIsLoading(false);
      }
    });

    const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
      void hydrate(session?.user ?? null);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    profile,
    isLoading,
    isAuthenticated: Boolean(user),
    signIn: async (email, password) => {
      const { data, error } = await getSupabaseClient().auth.signInWithPassword({ email, password });
      if (error) throw error;
      const signedInUser = data.user;
      setUser({ id: signedInUser.id, email: signedInUser.email ?? null });
      try {
        const nextProfile = await getProfile(signedInUser.id);
        setProfile(nextProfile);
        return nextProfile;
      } catch {
        setProfile(null);
        return null;
      }
    },
    signUp: async ({ email, password, handle, displayName, ageConfirmed }) => {
      if (!ageConfirmed) throw new Error('Please confirm that you meet the minimum age requirement.');
      const { data, error } = await getSupabaseClient().auth.signUp({
        email,
        password,
        options: {
          data: { handle, display_name: displayName },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      if (data.user && data.session) {
        setUser({ id: data.user.id, email: data.user.email ?? null });
        const next = await persistProfile(data.user.id, { handle, displayName, bio: '' });
        setProfile(next);
      }
      return { needsEmailConfirmation: !data.session };
    },
    signOut: async () => {
      const { error } = await getSupabaseClient().auth.signOut();
      if (error) throw error;
    },
    saveProfile: async (input) => {
      if (!user) throw new Error('You must be signed in.');
      const next = await persistProfile(user.id, input);
      setProfile(next);
    },
  }), [user, profile, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
