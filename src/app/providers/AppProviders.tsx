import { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@/app/providers/AuthProvider';
import { ComposeProvider } from '@/app/providers/ComposeProvider';

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ComposeProvider>{children}</ComposeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
