import { useMemo, useState } from 'react';

import type { MediaFilter, PostType } from '@/domain/feed-types';
import type { FeedFilterMode, FeedSortMode } from '@/domain/types';
import { listMockFeedPosts } from '@/data/feed-mock';
import { FeedHeader } from '@/components/feed/FeedHeader';
import { FeedToolbar } from '@/components/feed/FeedToolbar';
import { PostCard } from '@/components/feed/PostCard';
import { IconHoneycomb } from '@/components/feed/icons';

function matchesSearchQuery(post: ReturnType<typeof listMockFeedPosts>[number], query: string) {
	const normalizedQuery = query.trim().toLowerCase();
	if (!normalizedQuery) {
		return true;
	}

	const haystack = [
		post.body,
		post.title,
		post.project.name,
		post.project.category,
		post.author.displayName,
		post.author.handle,
		post.badge,
		...post.tags,
	]
		.filter(Boolean)
		.join(' ')
		.toLowerCase();

	return haystack.includes(normalizedQuery);
}

function filterPosts({
	filterMode,
	searchQuery,
	mediaFilter,
	postTypeFilter,
	craftTag,
}: {
	filterMode: FeedFilterMode;
	searchQuery: string;
	mediaFilter: MediaFilter;
	postTypeFilter: PostType | 'all';
	craftTag: string | null;
}) {
	return listMockFeedPosts().filter((post) => {
		if (filterMode === 'following' && post.id !== 'post-1' && post.id !== 'post-4') {
			return false;
		}

		if (!matchesSearchQuery(post, searchQuery)) {
			return false;
		}

		if (mediaFilter !== 'all' && post.mediaFilter !== mediaFilter) {
			return false;
		}

		if (postTypeFilter !== 'all' && post.type !== postTypeFilter) {
			return false;
		}

		if (craftTag && !post.tags.some((tag) => tag.toLowerCase() === craftTag.toLowerCase())) {
			return false;
		}

		return true;
	});
}

export function HomePage() {
	const [filterMode, setFilterMode] = useState<FeedFilterMode>('everything');
	const [sortMode, setSortMode] = useState<FeedSortMode>('newest');
	const [searchQuery, setSearchQuery] = useState('');
	const [mediaFilter, setMediaFilter] = useState<MediaFilter>('all');
	const [postTypeFilter, setPostTypeFilter] = useState<PostType | 'all'>('all');
	const [craftTag, setCraftTag] = useState<string | null>(null);

	const posts = useMemo(
		() =>
			filterPosts({
				filterMode,
				searchQuery,
				mediaFilter,
				postTypeFilter,
				craftTag,
			}),
		[filterMode, searchQuery, mediaFilter, postTypeFilter, craftTag],
	);

	return (
		<>
			<FeedHeader
				filterMode={filterMode}
				sortMode={sortMode}
				onFilterModeChange={setFilterMode}
			/>

			<FeedToolbar
				searchQuery={searchQuery}
				mediaFilter={mediaFilter}
				postTypeFilter={postTypeFilter}
				sortMode={sortMode}
				craftTag={craftTag}
				onSearchQueryChange={setSearchQuery}
				onMediaFilterChange={setMediaFilter}
				onPostTypeFilterChange={setPostTypeFilter}
				onSortModeChange={setSortMode}
				onCraftTagChange={setCraftTag}
			/>

			<div className="mt-6 flex flex-col gap-6">
				{posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</div>

			{posts.length === 0 ? (
				<p className="py-12 text-center text-body-md text-text-muted">
					No posts match the current filters.
				</p>
			) : (
				<div className="flex flex-col items-center gap-2 py-10 text-text-muted">
					<IconHoneycomb className="size-5 text-primary" />
					<p className="text-body-sm">You are all caught up!</p>
				</div>
			)}
		</>
	);
}
