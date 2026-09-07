export const ROUTES = {
	home: '/',
	explore: '/explore',
	create: '/create',
	communities: '/communities',
	projects: '/projects',
	saved: '/saved',
	profile: '/profile',
	login: '/auth/login',
	signup: '/auth/signup',
	project: (slug: string) => `/p/${slug}`,
	community: (slug: string) => `/c/${slug}`,
} as const;

export const MAX_VIDEO_DURATION_SECONDS = 60;

export const APP_NAME = 'Project Social';

export const SHELL_HEADER_NAV_ITEMS: Array<{
	to: string;
	label: string;
	end?: boolean;
}> = [
	{ to: ROUTES.home, label: 'Home', end: true },
	{ to: ROUTES.explore, label: 'Explore' },
	{ to: ROUTES.communities, label: 'Communities' },
	{ to: ROUTES.projects, label: 'Projects' },
	{ to: ROUTES.saved, label: 'Saved' },
];

export const SHELL_SIDEBAR_NAV_ITEMS: Array<{
	to: string;
	label: string;
	end?: boolean;
	icon: 'home' | 'explore' | 'communities' | 'projects' | 'saved';
}> = [
	{ to: ROUTES.home, label: 'Home Feed', end: true, icon: 'home' },
	{ to: ROUTES.explore, label: 'Explore Crafts', icon: 'explore' },
	{ to: ROUTES.communities, label: 'Communities', icon: 'communities' },
	{ to: ROUTES.projects, label: 'My Projects', icon: 'projects' },
	{ to: ROUTES.saved, label: 'Saved Items', icon: 'saved' },
];
