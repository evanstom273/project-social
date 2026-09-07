import type { MediaFilter, PostType } from '@/domain/feed-types';
import type { FeedSortMode } from '@/domain/types';

export const MEDIA_FILTERS: Array<{
	id: MediaFilter;
	label: string;
	shortLabel: string;
}> = [
	{ id: 'all', label: 'All Media', shortLabel: 'All' },
	{ id: 'images', label: 'Images & Galleries', shortLabel: 'Images' },
	{ id: 'video', label: 'Video & Clips (≤60s)', shortLabel: 'Video' },
	{ id: 'code', label: 'Code & Text', shortLabel: 'Code' },
];

export const POST_TYPE_FILTERS: Array<{
	id: PostType | 'all';
	label: string;
	dotClass?: string;
}> = [
	{ id: 'all', label: 'All Posts' },
	{ id: 'update', label: 'Updates' },
	{ id: 'question', label: 'Questions', dotClass: 'bg-secondary' },
	{ id: 'resource', label: 'Resources', dotClass: 'bg-primary' },
	{ id: 'milestone', label: 'Milestones', dotClass: 'bg-accent-warm' },
];

export const SORT_OPTIONS: Array<{ id: FeedSortMode; label: string }> = [
	{ id: 'newest', label: 'Newest First' },
	{ id: 'most-discussed', label: 'Most Discussed' },
	{ id: 'top-today', label: 'Top Today' },
	{ id: 'top-week', label: 'Top This Week' },
];

export function countActiveFilters({
	mediaFilter,
	postTypeFilter,
	craftTag,
	sortMode,
}: {
	mediaFilter: MediaFilter;
	postTypeFilter: PostType | 'all';
	craftTag: string | null;
	sortMode: FeedSortMode;
}) {
	let count = 0;
	if (mediaFilter !== 'all') count += 1;
	if (postTypeFilter !== 'all') count += 1;
	if (craftTag) count += 1;
	if (sortMode !== 'newest') count += 1;
	return count;
}
