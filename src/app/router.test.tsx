import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { AppRouter } from '@/app/router';
import { clearPublishedPosts } from '@/integrations/local/published-post-store';
import { clearProjects } from '@/integrations/local/project-store';
import { renderWithProviders } from '@/test/test-utils';

describe('AppRouter', () => {
	beforeEach(async () => {
		await clearPublishedPosts();
		await clearProjects();
	});

	it('renders the Stitch shell and empty feed on the home route', async () => {
		renderWithProviders(<AppRouter />, { route: '/' });

		expect(screen.getByRole('heading', { name: /^feed$/i })).toBeInTheDocument();
		expect(screen.getByRole('tablist', { name: /feed perspective/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /^new post$/i })).toBeInTheDocument();
		expect(screen.getByLabelText(/search feed/i)).toBeInTheDocument();
		expect(screen.queryByLabelText(/create post/i)).not.toBeInTheDocument();

		expect(await screen.findByText(/nothing in the feed yet/i)).toBeInTheDocument();

		expect(screen.getByLabelText('Open navigation menu')).toBeInTheDocument();
		expect(screen.getByLabelText('Sidebar navigation')).toBeInTheDocument();
		expect(screen.getByLabelText('Discovery')).toBeInTheDocument();
		expect(screen.getByLabelText('Primary navigation')).toBeInTheDocument();
		expect(screen.queryByLabelText('Mobile navigation')).not.toBeInTheDocument();
	});

	it('opens the expanded composer from New Post', async () => {
		const user = userEvent.setup();

		renderWithProviders(<AppRouter />, { route: '/' });

		await user.click(screen.getByRole('button', { name: /^new post$/i }));

		expect(screen.getByRole('dialog', { name: /new post/i })).toBeInTheDocument();
		expect(screen.queryByText(/posting identity/i)).not.toBeInTheDocument();
		expect(screen.queryByLabelText(/^username$/i)).not.toBeInTheDocument();
		expect(screen.getByLabelText(/^description$/i)).toBeInTheDocument();
	});

	it('does not publish when unauthenticated', async () => {
		const user = userEvent.setup();

		renderWithProviders(<AppRouter />, { route: '/' });

		await user.click(screen.getByRole('button', { name: /^new post$/i }));
		await user.type(screen.getByLabelText(/^description$/i), 'Built a new prototype today.');
		await user.click(screen.getByRole('button', { name: /publish update/i }));

		await waitFor(() => expect(screen.getByRole('dialog', { name: /new post/i })).toBeInTheDocument());
		expect(screen.queryByRole('article')).not.toBeInTheDocument();
	});

	it('redirects unknown post ids to home', async () => {
		renderWithProviders(<AppRouter />, { route: '/posts/unknown-post' });

		expect(await screen.findByRole('heading', { name: /^feed$/i })).toBeInTheDocument();
		expect(screen.getByText(/nothing in the feed yet/i)).toBeInTheDocument();
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
