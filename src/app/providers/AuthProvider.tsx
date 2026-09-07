import { type ReactNode, useMemo } from 'react';

import {
  AuthContext,
  type AuthContextValue,
} from '@/app/providers/auth-context';

export function AuthProvider({ children }: { children: ReactNode }) {
  const value = useMemo<AuthContextValue>(
    () => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    }),
    [],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
