import { type ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthProvider } from '@/app/providers/AuthProvider';
import { ComposeProvider } from '@/app/providers/ComposeProvider';
import { FeedPostsProvider } from '@/app/providers/FeedPostsProvider';
import { ProjectsProvider } from '@/app/providers/ProjectsProvider';

export function renderWithProviders(
  ui: ReactElement,
  { route = '/' }: { route?: string } = {},
) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <FeedPostsProvider>
          <ProjectsProvider><ComposeProvider>{ui}</ComposeProvider></ProjectsProvider>
        </FeedPostsProvider>
      </AuthProvider>
    </MemoryRouter>,
  );
}
