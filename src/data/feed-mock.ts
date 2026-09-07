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

const VIDEO_THUMB =
	'https://lh3.googleusercontent.com/aida-public/AB6AXuAnIZx_qhTGZ6edXwD-ypg-VcHSWQFlkxohTrcIdy4nv-eFvzP7E2B6jWR7OdLU4AtPRPPkahgw1IsIMjAIrziVRyOUDg7JW-y5gFqdTUt0i6ahNQVaAmNtmg7iI2LcTZKvM8359WuWPVqXsHLfLIbkDhNP3fmjmP31STaqcea8hGuSlCbGcCpRKObEVQbiGC_QRSxU9nFgDoI9zcOi1FXOcpRX-UI_IfcCwfqlBYBsI18eKkE_GKv28w';

const WOOD_IMAGE =
	'https://lh3.googleusercontent.com/aida-public/AB6AXuCTTX3iwyBirM62rri8yBwvrccnMZgW9Ug5h7pD8J2it2BzKDEvrNFxlpVzOJt0oxjZeFMlHrB1CxNJ9nrQ0u8oDrmjHk688MLQ6ouj4KvtLfCcTOG8Wqn_aC9oAMRbiyt3G3uIAowlhSTByjosen2KSzjuIZlxuo3xYzerQoB1ueXVPf-qlVQ02zg95n1MDxwhk8novkwGhtyR5ePTK2asOFF74gqfT1k-HjJch1ir1KUL21EgDrWdpQ';

export const MOCK_FEED_POSTS: FeedPost[] = [
	{
		id: 'post-1',
		type: 'milestone',
		project: {
			id: 'proj-aetheria-full',
			slug: 'aetheria-chrono-echoes',
			name: 'Aetheria: Chrono Echoes',
			category: 'Game Dev · UE5',
			initial: 'A',
			accentClassName: 'text-primary',
		},
		author: {
			id: 'author-kaelen',
			displayName: 'Kaelen Voss',
			handle: 'kaelenv',
			avatarUrl: null,
		},
		postedAgo: '18m ago',
		body: 'Finally locked the directional parry system with custom hitstop timing and particle burst shaders. Running locked 60fps on our Steam Deck test target!',
		badge: 'Milestone: Alpha Combat',
		tags: ['GameDev', 'CombatDesign', 'UE5', 'SteamDeck'],
		media: {
			kind: 'video',
			imageUrl: VIDEO_THUMB,
			alt: 'Female warrior parrying a dark neon mechanical golem with energy sword in Unreal Engine 5',
			duration: '0:42',
			overlayLeft: '1080p60 · Steam Deck Profile v0.8.4',
			overlayRight: 'Unreal Engine 5.4',
		},
		likes: 142,
		comments: 28,
		mediaFilter: 'video',
	},
	{
		id: 'post-2',
		type: 'question',
		project: {
			id: 'proj-lumina-full',
			slug: 'lumina-tracker',
			name: 'Lumina Tracker',
			category: 'Hardware · RP2040',
			initial: 'L',
			accentClassName: 'text-secondary',
		},
		author: {
			id: 'author-marcus',
			displayName: 'Marcus Vance',
			handle: 'mvance_hw',
			avatarUrl: null,
		},
		postedAgo: '1h ago',
		title: 'Why is the I2C bus locking up on warm boot with this IMU?',
		body: "We're interfacing an ICM-42688-P with an RP2040 over I2C at 400kHz. On a cold power cycle everything negotiates fine, but a software reset or warm reboot leaves SDA pulled low indefinitely until hard VBUS reset. 4.7kΩ pullups on 3.3V rail. Has anyone seen this clock-stretching lockup before?",
		badge: 'Question · 4 Answers',
		tags: ['Hardware', 'RP2040', 'EmbeddedC', 'I2C'],
		media: {
			kind: 'diagram',
			title: 'Logic Analyzer Trace (Saleae 24MHz)',
			subtitle: 'SCL: 400kHz · SDA: STUCK_LOW',
			sclLabel: 'PULSING',
			sdaLabel: 'BUS_BUSY',
			footerLeft: 'Pin: GPIO4 (SDA), GPIO5 (SCL) · RP2040 Pico SDK 1.5',
			footerLink: 'Inspect Schematics',
		},
		likes: 47,
		comments: 4,
		commentLabel: '4 Answers',
		mediaFilter: 'code',
	},
	{
		id: 'post-3',
		type: 'resource',
		project: {
			id: 'proj-meshtools-full',
			slug: 'meshtools-toolkit',
			name: 'MeshTools Toolkit',
			category: 'Open Source · Blender Addon',
			initial: 'M',
			accentClassName: 'text-primary',
		},
		author: {
			id: 'author-soren',
			displayName: 'Soren Lind',
			handle: 'soren_crafts',
			avatarUrl: null,
		},
		postedAgo: '3h ago',
		body: 'Released a free dual-quaternion skinning weight transfer script for Blender 4.2+. Handles high-poly to low-poly deformation baking with volume preservation around joint twists without pinching.',
		badge: 'Free Resource · MIT',
		tags: ['Blender3D', 'Python', 'OpenSource', 'Rigging'],
		media: {
			kind: 'resource',
			fileName: 'meshtools_dq_transfer_v1.2.zip',
			fileMeta: '48 KB · Python 3.11 addon · MIT License',
			codeSnippet:
				'# Dual-Quaternion Weight Transfer Operator\nimport bpy, bmesh\ndef transfer_dq_weights(source_obj, target_obj, epsilon=1e-5):\n    kd_tree = bmesh.ops.create_kd_tree(source_obj.data)\n    return [kd_tree.find_nearest(v.co) for v in target_obj.data.vertices]',
		},
		likes: 186,
		comments: 19,
		mediaFilter: 'code',
	},
	{
		id: 'post-4',
		type: 'update',
		project: {
			id: 'proj-atelier',
			slug: 'atelier-noire',
			name: 'Atelier Noire',
			category: 'Craft & Woodworking',
			initial: 'W',
			accentClassName: 'text-primary',
		},
		author: {
			id: 'author-soren',
			displayName: 'Soren Lind',
			handle: 'soren_crafts',
			avatarUrl: null,
		},
		postedAgo: '5h ago',
		body: 'Bookmatched English walnut slab flattened and sanded up to 320 grit. First coat of hardwax oil applied—the chatoyancy in this grain pattern is unreal under natural raking light.',
		badge: 'Update · Devlog #12',
		tags: ['Woodworking', 'FurnitureMakers', 'Workshop', 'Handcrafted'],
		media: {
			kind: 'image',
			imageUrl: WOOD_IMAGE,
			alt: 'Close up artisan photograph of a bookmatched English walnut live edge tabletop being hand finished in a wood shop',
			caption: 'English Walnut · Osmo Polyx Raw Finish',
		},
		likes: 318,
		comments: 45,
		mediaFilter: 'images',
	},
	{
		id: 'post-5',
		type: 'update',
		project: {
			id: 'proj-clockwork',
			slug: 'clockwork-archipelago',
			name: 'The Clockwork Archipelago',
			category: 'Writing · Worldbuilding',
			initial: 'C',
			accentClassName: 'text-accent-rose',
		},
		author: {
			id: 'author-naomi',
			displayName: 'Naomi Scott',
			handle: 'naomiscott_lit',
			avatarUrl: null,
		},
		postedAgo: '8h ago',
		body: 'Draft excerpt from Chapter 7 — the brass automaton finally speaks, but only in the language of tides. Working through whether the island itself is a character or merely a setting.',
		badge: 'Draft Excerpt',
		tags: ['CreativeWriting', 'Worldbuilding', 'Fantasy', 'WIP'],
		likes: 92,
		comments: 14,
		mediaFilter: 'code',
	},
];

export function listMockFeedPosts(): FeedPost[] {
	return MOCK_FEED_POSTS;
}

export function getMockFeedPostById(postId: string): FeedPost | undefined {
	return MOCK_FEED_POSTS.find((post) => post.id === postId);
}
