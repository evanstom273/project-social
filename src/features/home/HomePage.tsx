import { useMemo, useState } from 'react';

import type { MediaFilter, PostType } from '@/domain/feed-types';
import type { FeedFilterMode, FeedSortMode } from '@/domain/types';
import { listMockFeedPosts, MOCK_CURRENT_USER } from '@/data/feed-mock';
import { FeedComposer } from '@/components/feed/FeedComposer';
import { FeedFilters } from '@/components/feed/FeedFilters';
import { FeedHeader } from '@/components/feed/FeedHeader';
import { PostCard } from '@/components/feed/PostCard';
import { IconHoneycomb } from '@/components/feed/icons';

function filterPosts({
	filterMode,
	mediaFilter,
	postTypeFilter,
	craftTag,
}: {
	filterMode: FeedFilterMode;
	mediaFilter: MediaFilter;
	postTypeFilter: PostType | 'all';
	craftTag: string | null;
}) {
	return listMockFeedPosts().filter((post) => {
		if (filterMode === 'following' && post.id !== 'post-1' && post.id !== 'post-4') {
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
	const [mediaFilter, setMediaFilter] = useState<MediaFilter>('all');
	const [postTypeFilter, setPostTypeFilter] = useState<PostType | 'all'>('all');
	const [craftTag, setCraftTag] = useState<string | null>(null);

	const posts = useMemo(
		() => filterPosts({ filterMode, mediaFilter, postTypeFilter, craftTag }),
		[filterMode, mediaFilter, postTypeFilter, craftTag],
	);

	return (
		<div className="mx-auto w-full max-w-[var(--spacing-feed-max)] px-[var(--spacing-gutter-mobile)] py-6 md:px-[var(--spacing-gutter-tablet)] lg:px-[var(--spacing-gutter-desktop)] lg:py-8">
			<FeedHeader
				filterMode={filterMode}
				sortMode={sortMode}
				onFilterModeChange={setFilterMode}
			/>

			<FeedFilters
				mediaFilter={mediaFilter}
				postTypeFilter={postTypeFilter}
				sortMode={sortMode}
				craftTag={craftTag}
				onMediaFilterChange={setMediaFilter}
				onPostTypeFilterChange={setPostTypeFilter}
				onSortModeChange={setSortMode}
				onCraftTagChange={setCraftTag}
			/>

			<div className="mt-6">
				<FeedComposer currentUser={MOCK_CURRENT_USER} />
			</div>

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
		</div>
	);
}
