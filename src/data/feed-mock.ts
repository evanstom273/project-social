import type {
	FeedAuthor,
	FeedPost,
	SidebarCommunity,
	SidebarProject,
} from '@/domain/feed-types';

export const MOCK_CURRENT_USER: FeedAuthor = {
	id: 'user-elena',
	displayName: 'Elena Rostova',
	handle: 'elena_crafts',
	avatarUrl: null,
};

export const MOCK_ACTIVE_PROJECTS: SidebarProject[] = [
	{
		id: 'proj-aetheria',
		name: 'Aetheria RPG',
		category: 'Indie Game',
		followers: '1.2k followers',
		initial: 'A',
		accentClassName: 'text-primary',
	},
	{
		id: 'proj-lumina',
		name: 'Lumina Tracker',
		category: 'Hardware',
		followers: '780 followers',
		initial: 'L',
		accentClassName: 'text-secondary',
	},
	{
		id: 'proj-meshtools',
		name: 'MeshTools',
		category: 'Blender Tool',
		followers: '2.4k followers',
		initial: 'M',
		accentClassName: 'text-accent-rose',
	},
];

export const MOCK_NEW_PROJECTS: SidebarProject[] = [
	{
		id: 'proj-chrono',
		name: 'ChronoSynth Eurorack',
		category: 'Modular Analog Synthesizer',
		followers: '120 followers',
		initial: 'C',
		accentClassName: 'text-secondary',
	},
	{
		id: 'proj-pebble',
		name: 'PebbleOS',
		category: 'Minimalist E-Ink Firmware',
		followers: '89 followers',
		initial: 'P',
		accentClassName: 'text-primary',
	},
];

export const MOCK_ACTIVE_COMMUNITIES: SidebarCommunity[] = [
	{ id: 'comm-indiedev', name: 'IndieDev' },
	{ id: 'comm-blender', name: 'BlenderArt' },
	{ id: 'comm-hardware', name: 'HardwareHacks' },
	{ id: 'comm-wood', name: 'Woodworking' },
	{ id: 'comm-synth', name: 'Synthesizers' },
];

export const CRAFT_TAGS = [
	'GameDev',
	'Hardware',
	'AudioDSP',
	'Blender3D',
	'Woodworking',
	'CreativeWriting',
	'Tooling',
] as const;

export const MOCK_FEED_POSTS: FeedPost[] = [];

export function listMockFeedPosts(): FeedPost[] {
	return MOCK_FEED_POSTS;
}

export function getMockFeedPostById(postId: string): FeedPost | undefined {
	return MOCK_FEED_POSTS.find((post) => post.id === postId);
}
