import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { AppRouter } from '@/app/router';
import { renderWithProviders } from '@/test/test-utils';

describe('AppRouter', () => {
	it('renders the Stitch shell and feed on the home route', () => {
		renderWithProviders(<AppRouter />, { route: '/' });

		expect(screen.getByRole('heading', { name: /^feed$/i })).toBeInTheDocument();
		expect(screen.getByRole('tablist', { name: /feed perspective/i })).toBeInTheDocument();
		expect(screen.getByLabelText(/create post/i)).toBeInTheDocument();
		expect(screen.getByText(/aetheria: chrono echoes/i)).toBeInTheDocument();

		expect(screen.getByLabelText('Open navigation menu')).toBeInTheDocument();
		expect(screen.getByLabelText('Sidebar navigation')).toBeInTheDocument();
		expect(screen.getByLabelText('Discovery')).toBeInTheDocument();
		expect(screen.getByLabelText('Primary navigation')).toBeInTheDocument();
		expect(screen.queryByLabelText('Mobile navigation')).not.toBeInTheDocument();
	});

	it('navigates to placeholder routes from the sidebar', async () => {
		const user = userEvent.setup();

		renderWithProviders(<AppRouter />, { route: '/' });

		await user.click(screen.getByRole('link', { name: /^explore crafts$/i }));

		expect(
			screen.getByRole('heading', { name: /^explore$/i }),
		).toBeInTheDocument();
	});
});
