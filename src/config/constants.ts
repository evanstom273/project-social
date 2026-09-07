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

export const NAV_ITEMS: Array<{
  to: string;
  label: string;
  end?: boolean;
  emphasis?: boolean;
}> = [
  { to: ROUTES.home, label: 'Home', end: true },
  { to: ROUTES.explore, label: 'Explore' },
  { to: ROUTES.create, label: 'Create', emphasis: true },
  { to: ROUTES.projects, label: 'Projects' },
  { to: ROUTES.profile, label: 'Profile' },
];

export const DESKTOP_NAV_ITEMS: Array<{
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
