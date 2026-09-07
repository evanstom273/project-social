import type { MediaFilter, PostType } from '@/domain/feed-types';
import type { FeedFilterMode, FeedSortMode } from '@/domain/types';

export type FeedSearchState = {
	filterMode: FeedFilterMode;
	sortMode: FeedSortMode;
	searchQuery: string;
	mediaFilter: MediaFilter;
	postTypeFilter: PostType | 'all';
	craftTag: string | null;
};

const DEFAULT_STATE: FeedSearchState = {
	filterMode: 'everything',
	sortMode: 'newest',
	searchQuery: '',
	mediaFilter: 'all',
	postTypeFilter: 'all',
	craftTag: null,
};

const MEDIA_FILTERS = new Set<MediaFilter>(['all', 'images', 'video', 'code']);
const POST_TYPES = new Set<PostType | 'all'>(['all', 'update', 'question', 'resource', 'milestone']);
const FILTER_MODES = new Set<FeedFilterMode>(['everything', 'following']);
const SORT_MODES = new Set<FeedSortMode>([
	'newest',
	'most-discussed',
	'top-today',
	'top-week',
]);

function readEnumValue<T extends string>(
	params: URLSearchParams,
	key: string,
	allowed: Set<T>,
	fallback: T,
): T {
	const value = params.get(key);
	return value && allowed.has(value as T) ? (value as T) : fallback;
}

export function parseFeedSearchParams(params: URLSearchParams): FeedSearchState {
	const craftTag = params.get('craft');

	return {
		filterMode: readEnumValue(params, 'view', FILTER_MODES, DEFAULT_STATE.filterMode),
		sortMode: readEnumValue(params, 'sort', SORT_MODES, DEFAULT_STATE.sortMode),
		searchQuery: params.get('q') ?? DEFAULT_STATE.searchQuery,
		mediaFilter: readEnumValue(params, 'media', MEDIA_FILTERS, DEFAULT_STATE.mediaFilter),
		postTypeFilter: readEnumValue(params, 'type', POST_TYPES, DEFAULT_STATE.postTypeFilter),
		craftTag: craftTag && craftTag.length > 0 ? craftTag : null,
	};
}

export function buildFeedSearchParams(state: FeedSearchState): URLSearchParams {
	const params = new URLSearchParams();

	if (state.filterMode !== DEFAULT_STATE.filterMode) {
		params.set('view', state.filterMode);
	}
	if (state.sortMode !== DEFAULT_STATE.sortMode) {
		params.set('sort', state.sortMode);
	}
	if (state.searchQuery.trim()) {
		params.set('q', state.searchQuery.trim());
	}
	if (state.mediaFilter !== DEFAULT_STATE.mediaFilter) {
		params.set('media', state.mediaFilter);
	}
	if (state.postTypeFilter !== DEFAULT_STATE.postTypeFilter) {
		params.set('type', state.postTypeFilter);
	}
	if (state.craftTag) {
		params.set('craft', state.craftTag);
	}

	return params;
}

export function feedLocationSearch(state: FeedSearchState): string {
	const params = buildFeedSearchParams(state);
	const serialized = params.toString();
	return serialized ? `?${serialized}` : '';
}
