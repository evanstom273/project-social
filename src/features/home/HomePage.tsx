import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { MediaFilter, PostType } from '@/domain/feed-types';
import type { FeedFilterMode, FeedSortMode } from '@/domain/types';
import { listMockFeedPosts } from '@/data/feed-mock';
import { FeedHeader } from '@/components/feed/FeedHeader';
import { FeedToolbar } from '@/components/feed/FeedToolbar';
import { PostCard } from '@/components/feed/PostCard';
import { IconHoneycomb } from '@/components/feed/icons';
import {
	buildFeedSearchParams,
	parseFeedSearchParams,
	type FeedSearchState,
} from '@/features/home/feed-search-params';
import { countActiveFilters } from '@/components/feed/feed-filter-utils';
import {
	clearFeedScrollPosition,
	getAppMainScrollElement,
	readFeedScrollPosition,
} from '@/lib/feed-scroll';

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

function sortPosts(posts: ReturnType<typeof listMockFeedPosts>, sortMode: FeedSortMode) {
	if (sortMode === 'newest') {
		return posts;
	}

	const sorted = [...posts];

	if (sortMode === 'most-discussed') {
		return sorted.sort((left, right) => right.comments - left.comments);
	}

	return sorted.sort((left, right) => right.likes - left.likes);
}

function filterPosts(state: FeedSearchState) {
	const filtered = listMockFeedPosts().filter((post) => {
		if (state.filterMode === 'following') {
			return false;
		}

		if (!matchesSearchQuery(post, state.searchQuery)) {
			return false;
		}

		if (state.mediaFilter !== 'all' && post.mediaFilter !== state.mediaFilter) {
			return false;
		}

		if (state.postTypeFilter !== 'all' && post.type !== state.postTypeFilter) {
			return false;
		}

		if (
			state.craftTag &&
			!post.tags.some((tag) => tag.toLowerCase() === state.craftTag?.toLowerCase())
		) {
			return false;
		}

		return true;
	});

	return sortPosts(filtered, state.sortMode);
}

function updateFeedSearchParam(
	currentParams: URLSearchParams,
	patch: Partial<FeedSearchState>,
) {
	const nextState: FeedSearchState = {
		...parseFeedSearchParams(currentParams),
		...patch,
	};
	return buildFeedSearchParams(nextState);
}

function hasActiveFilters(state: FeedSearchState) {
	return (
		state.filterMode !== 'everything' ||
		state.searchQuery.trim().length > 0 ||
		countActiveFilters({
			mediaFilter: state.mediaFilter,
			postTypeFilter: state.postTypeFilter,
			craftTag: state.craftTag,
			sortMode: state.sortMode,
		}) > 0
	);
}

export function HomePage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const feedState = useMemo(() => parseFeedSearchParams(searchParams), [searchParams]);
	const allPosts = listMockFeedPosts();

	const posts = useMemo(() => filterPosts(feedState), [feedState]);
	const feedIsEmpty = allPosts.length === 0;
	const filtersActive = hasActiveFilters(feedState);

	useEffect(() => {
		const savedScroll = readFeedScrollPosition();
		if (savedScroll === null) {
			return;
		}

		const main = getAppMainScrollElement();
		if (!main) {
			return;
		}

		requestAnimationFrame(() => {
			main.scrollTop = savedScroll;
			clearFeedScrollPosition();
		});
	}, [searchParams]);

	function setFeedState(patch: Partial<FeedSearchState>) {
		setSearchParams(updateFeedSearchParam(searchParams, patch), { replace: true });
	}

	return (
		<>
			<FeedHeader
				filterMode={feedState.filterMode}
				sortMode={feedState.sortMode}
				onFilterModeChange={(filterMode: FeedFilterMode) => setFeedState({ filterMode })}
			/>

			<FeedToolbar
				searchQuery={feedState.searchQuery}
				mediaFilter={feedState.mediaFilter}
				postTypeFilter={feedState.postTypeFilter}
				sortMode={feedState.sortMode}
				craftTag={feedState.craftTag}
				onSearchQueryChange={(searchQuery) => setFeedState({ searchQuery })}
				onMediaFilterChange={(mediaFilter: MediaFilter) => setFeedState({ mediaFilter })}
				onPostTypeFilterChange={(postTypeFilter: PostType | 'all') =>
					setFeedState({ postTypeFilter })
				}
				onSortModeChange={(sortMode: FeedSortMode) => setFeedState({ sortMode })}
				onCraftTagChange={(craftTag) => setFeedState({ craftTag })}
			/>

			{posts.length > 0 ? (
				<div className="mt-6 flex flex-col gap-6">
					{posts.map((post) => (
						<PostCard key={post.id} post={post} feedState={feedState} />
					))}
				</div>
			) : null}

			{posts.length === 0 && feedIsEmpty && !filtersActive ? (
				<div className="flex flex-col items-center gap-3 py-16 text-center">
					<IconHoneycomb className="size-6 text-primary" />
					<p className="text-body-md text-text-secondary">Nothing in the feed yet.</p>
					<p className="max-w-sm text-body-sm text-text-muted">
						Use New Post to share what you are making. Posts will appear here once
						publishing is connected.
					</p>
				</div>
			) : null}

			{posts.length === 0 && (filtersActive || !feedIsEmpty) ? (
				<p className="py-12 text-center text-body-md text-text-muted">
					No posts match the current filters.
				</p>
			) : null}

			{posts.length > 0 ? (
				<div className="flex flex-col items-center gap-2 py-10 text-text-muted">
					<IconHoneycomb className="size-5 text-primary" />
					<p className="text-body-sm">You are all caught up!</p>
				</div>
			) : null}
		</>
	);
}
