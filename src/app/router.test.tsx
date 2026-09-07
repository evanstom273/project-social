import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { AppRouter } from '@/app/router';
import { renderWithProviders } from '@/test/test-utils';

describe('AppRouter', () => {
  it('renders the landing page inside the application shell', () => {
    renderWithProviders(<AppRouter />, { route: '/' });

    expect(
      screen.getByRole('heading', {
        name: /discover, follow and share things while they're being made/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument();
    expect(screen.getByLabelText('Desktop navigation')).toBeInTheDocument();
  });

  it('navigates to placeholder routes from the landing page', async () => {
    const user = userEvent.setup();

    renderWithProviders(<AppRouter />, { route: '/' });

    await user.click(screen.getByRole('link', { name: /explore projects/i }));

    expect(
      screen.getByRole('heading', { name: /^explore$/i }),
    ).toBeInTheDocument();
  });
});
