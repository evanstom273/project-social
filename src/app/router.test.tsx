import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { AppRouter } from '@/app/router';
import { renderWithProviders } from '@/test/test-utils';

describe('AppRouter', () => {
	it('renders the feed inside the application shell', () => {
		renderWithProviders(<AppRouter />, { route: '/' });

		expect(screen.getByRole('heading', { name: /^feed$/i })).toBeInTheDocument();
		expect(screen.getByRole('tablist', { name: /feed perspective/i })).toBeInTheDocument();
		expect(screen.getByRole('region', { name: /create post/i })).toBeInTheDocument();
		expect(screen.getByText(/aetheria: chrono echoes/i)).toBeInTheDocument();

		expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument();
		expect(screen.getByLabelText('Desktop navigation')).toBeInTheDocument();
		expect(screen.getByLabelText('Discovery')).toBeInTheDocument();
	});

	it('navigates to placeholder routes from the feed', async () => {
		const user = userEvent.setup();

		renderWithProviders(<AppRouter />, { route: '/' });

		await user.click(screen.getByRole('link', { name: /^explore crafts$/i }));

		expect(
			screen.getByRole('heading', { name: /^explore$/i }),
		).toBeInTheDocument();
	});
});
