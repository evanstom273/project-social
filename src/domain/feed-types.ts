import type { FeedFilterMode, FeedSortMode } from '@/domain/types';

export type PostType = 'update' | 'question' | 'resource' | 'milestone';

export type MediaFilter =
	| 'all'
	| 'images'
	| 'video'
	| 'code';

export type FeedAuthor = {
	id: string;
	displayName: string;
	handle: string;
	avatarUrl: string | null;
};

export type FeedProject = {
	id: string;
	slug: string;
	name: string;
	category: string;
	initial: string;
	accentClassName?: string;
	avatarUrl?: string | null;
};

export type FeedMedia =
	| {
			kind: 'video';
			imageUrl: string;
			alt: string;
			duration: string;
			overlayLeft?: string;
			overlayRight?: string;
	  }
	| {
			kind: 'image';
			imageUrl: string;
			alt: string;
			caption?: string;
	  }
	| {
			kind: 'diagram';
			title: string;
			subtitle: string;
			sclLabel: string;
			sdaLabel: string;
			footerLeft: string;
			footerLink: string;
	  }
	| {
			kind: 'resource';
			fileName: string;
			fileMeta: string;
			codeSnippet: string;
	  };

export type FeedPost = {
	id: string;
	type: PostType;
	project: FeedProject | null;
	author: FeedAuthor;
	postedAgo: string;
	body: string;
	title?: string;
	badge: string;
	tags: string[];
	media?: FeedMedia;
	likes: number;
	comments: number;
	commentLabel?: string;
	mediaFilter: MediaFilter;
};

export type SidebarProject = {
	id: string;
	name: string;
	category: string;
	followers: string;
	initial: string;
	accentClassName?: string;
};

export type SidebarCommunity = {
	id: string;
	name: string;
};

export type FeedViewState = {
	filterMode: FeedFilterMode;
	sortMode: FeedSortMode;
	mediaFilter: MediaFilter;
	postTypeFilter: PostType | 'all';
	craftTag: string | null;
};
