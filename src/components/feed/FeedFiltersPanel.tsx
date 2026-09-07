import type { MediaFilter, PostType } from '@/domain/feed-types';
import type { FeedSortMode } from '@/domain/types';
import { CRAFT_TAGS } from '@/data/feed-mock';
import { Chip } from '@/components/ui/Chip';
import { cn } from '@/lib/cn';
import {
	MEDIA_FILTERS,
	POST_TYPE_FILTERS,
	SORT_OPTIONS,
} from '@/components/feed/feed-filter-utils';
import { IconCheck, IconSort } from '@/components/feed/icons';

type FeedFiltersPanelProps = {
	mediaFilter: MediaFilter;
	postTypeFilter: PostType | 'all';
	sortMode: FeedSortMode;
	craftTag: string | null;
	onMediaFilterChange: (filter: MediaFilter) => void;
	onPostTypeFilterChange: (filter: PostType | 'all') => void;
	onSortModeChange: (mode: FeedSortMode) => void;
	onCraftTagChange: (tag: string | null) => void;
};

export function FeedFiltersPanel({
	mediaFilter,
	postTypeFilter,
	sortMode,
	craftTag,
	onMediaFilterChange,
	onPostTypeFilterChange,
	onSortModeChange,
	onCraftTagChange,
}: FeedFiltersPanelProps) {
	return (
		<div className="flex flex-col gap-4">
			<div>
				<p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-faint">
					Media type
				</p>
				<div className="flex flex-wrap gap-1.5">
					{MEDIA_FILTERS.map((filter) => (
						<Chip
							key={filter.id}
							size="md"
							active={mediaFilter === filter.id}
							onClick={() => onMediaFilterChange(filter.id)}
						>
							{filter.label}
						</Chip>
					))}
				</div>
			</div>

			<div>
				<p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-faint">
					Post type
				</p>
				<div className="flex flex-wrap gap-1.5">
					{POST_TYPE_FILTERS.map((filter) => (
						<button
							key={filter.id}
							type="button"
							className={cn(
								'inline-flex h-7 items-center gap-1 whitespace-nowrap rounded-md border px-2.5 text-[12px] transition-colors',
								postTypeFilter === filter.id
									? 'border-border-strong bg-surface-raised text-text-primary'
									: 'border-border-subtle bg-surface text-text-secondary hover:bg-surface-hover',
							)}
							aria-pressed={postTypeFilter === filter.id}
							onClick={() => onPostTypeFilterChange(filter.id)}
						>
							{filter.dotClass ? (
								<span className={cn('size-1.5 rounded-full', filter.dotClass)} />
							) : null}
							{filter.label}
						</button>
					))}
				</div>
			</div>

			<div>
				<p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-faint">
					Craft / community
				</p>
				<div className="flex flex-wrap gap-1.5">
					{CRAFT_TAGS.map((tag) => (
						<button
							key={tag}
							type="button"
							className={cn(
								'rounded-md border px-2 py-0.5 text-[11px] transition-colors',
								craftTag === tag
									? 'border-primary/40 bg-primary-muted text-primary'
									: 'border-border-subtle bg-surface text-text-secondary hover:border-border-default hover:text-text-primary',
							)}
							onClick={() => onCraftTagChange(craftTag === tag ? null : tag)}
						>
							#{tag}
						</button>
					))}
				</div>
			</div>

			<div>
				<p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-faint">
					<IconSort className="size-3.5 text-primary" />
					Sort order
				</p>
				<div className="flex flex-col gap-1">
					{SORT_OPTIONS.map((option) => (
						<button
							key={option.id}
							type="button"
							className={cn(
								'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[12px] transition-colors',
								sortMode === option.id
									? 'bg-primary-muted text-primary'
									: 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
							)}
							onClick={() => onSortModeChange(option.id)}
						>
							<span>{option.label}</span>
							{sortMode === option.id ? <IconCheck className="size-3.5" /> : null}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
