import { type ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthProvider } from '@/app/providers/AuthProvider';
import { ComposeProvider } from '@/app/providers/ComposeProvider';

export function renderWithProviders(
  ui: ReactElement,
  { route = '/' }: { route?: string } = {},
) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <ComposeProvider>{ui}</ComposeProvider>
      </AuthProvider>
    </MemoryRouter>,
  );
}
