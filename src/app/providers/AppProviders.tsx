import { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from '@/app/providers/AuthProvider';
import { ComposeProvider } from '@/app/providers/ComposeProvider';
import { FeedPostsProvider } from '@/app/providers/FeedPostsProvider';

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FeedPostsProvider>
          <ComposeProvider>{children}</ComposeProvider>
        </FeedPostsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
