import { createContext, useContext } from 'react';

export type AuthUser = {
  id: string;
  email: string | null;
};

export type AuthProfile = { id: string; handle: string; displayName: string; avatarUrl: string | null; bio: string | null };

export type AuthContextValue = {
  user: AuthUser | null;
  profile: AuthProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<AuthProfile | null>;
  signUp: (input: { email: string; password: string; handle: string; displayName: string; ageConfirmed: boolean }) => Promise<{ needsEmailConfirmation: boolean }>;
  signOut: () => Promise<void>;
  saveProfile: (input: { handle: string; displayName: string; bio: string; avatarUrl?: string | null }) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
