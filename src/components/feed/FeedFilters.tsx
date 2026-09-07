import { useEffect, useRef, useState } from 'react';

import type { MediaFilter, PostType } from '@/domain/feed-types';
import type { FeedSortMode } from '@/domain/types';
import { CRAFT_TAGS } from '@/data/feed-mock';
import { Chip } from '@/components/ui/Chip';
import { cn } from '@/lib/cn';
import {
	IconChevronDown,
	IconCheck,
	IconCode,
	IconImage,
	IconSort,
	IconVideo,
} from '@/components/feed/icons';

type FeedFiltersProps = {
	mediaFilter: MediaFilter;
	postTypeFilter: PostType | 'all';
	sortMode: FeedSortMode;
	craftTag: string | null;
	onMediaFilterChange: (filter: MediaFilter) => void;
	onPostTypeFilterChange: (filter: PostType | 'all') => void;
	onSortModeChange: (mode: FeedSortMode) => void;
	onCraftTagChange: (tag: string | null) => void;
};

const MEDIA_FILTERS: Array<{ id: MediaFilter; label: string; icon?: typeof IconImage }> = [
	{ id: 'all', label: 'All Media' },
	{ id: 'images', label: 'Images & Galleries', icon: IconImage },
	{ id: 'video', label: 'Video & Clips (≤60s)', icon: IconVideo },
	{ id: 'code', label: 'Code & Text', icon: IconCode },
];

const POST_TYPE_FILTERS: Array<{ id: PostType | 'all'; label: string; dotClass?: string }> = [
	{ id: 'all', label: 'All Posts' },
	{ id: 'update', label: 'Updates' },
	{ id: 'question', label: 'Questions', dotClass: 'bg-secondary' },
	{ id: 'resource', label: 'Resources', dotClass: 'bg-primary' },
	{ id: 'milestone', label: 'Milestones', dotClass: 'bg-accent-warm' },
];

const SORT_OPTIONS: Array<{ id: FeedSortMode; label: string }> = [
	{ id: 'newest', label: 'Newest First' },
	{ id: 'most-discussed', label: 'Most Discussed' },
	{ id: 'top-today', label: 'Top Today' },
	{ id: 'top-week', label: 'Top This Week' },
];

export function FeedFilters({
	mediaFilter,
	postTypeFilter,
	sortMode,
	craftTag,
	onMediaFilterChange,
	onPostTypeFilterChange,
	onSortModeChange,
	onCraftTagChange,
}: FeedFiltersProps) {
	const [sortOpen, setSortOpen] = useState(false);
	const sortRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
				setSortOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, []);

	const currentSortLabel =
		SORT_OPTIONS.find((option) => option.id === sortMode)?.label ?? 'Newest First';

	return (
		<div className="flex flex-col gap-2.5 border-t border-border-subtle/60 pt-1">
			<div className="flex items-center justify-between gap-2 overflow-x-auto pb-0.5">
				<div className="flex items-center gap-1.5">
					<span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-text-faint">
						Media:
					</span>
					{MEDIA_FILTERS.map((filter) => {
						const Icon = filter.icon;
						return (
							<Chip
								key={filter.id}
								size="md"
								active={mediaFilter === filter.id}
								onClick={() => onMediaFilterChange(filter.id)}
								className="gap-1"
							>
								{Icon ? <Icon className="size-3.5 text-text-faint" /> : null}
								{filter.label}
							</Chip>
						);
					})}
				</div>

				<div className="relative shrink-0" ref={sortRef}>
					<button
						type="button"
						className="flex h-7 items-center gap-1.5 rounded-full border border-border-subtle bg-surface px-3 text-[12px] text-text-primary transition-colors hover:bg-surface-hover"
						aria-expanded={sortOpen}
						aria-haspopup="listbox"
						onClick={() => setSortOpen((open) => !open)}
					>
						<IconSort className="size-4 text-primary" />
						<span>{currentSortLabel}</span>
						<IconChevronDown className="size-3.5 text-text-faint" />
					</button>
					{sortOpen ? (
						<div
							className="absolute right-0 z-30 mt-1.5 flex w-44 flex-col gap-0.5 rounded-xl border border-border-strong bg-surface-overlay p-1 shadow-xl"
							role="listbox"
						>
							{SORT_OPTIONS.map((option) => (
								<button
									key={option.id}
									type="button"
									role="option"
									aria-selected={sortMode === option.id}
									className={cn(
										'flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-[12px] transition-colors',
										sortMode === option.id
											? 'bg-primary-muted text-primary'
											: 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
									)}
									onClick={() => {
										onSortModeChange(option.id);
										setSortOpen(false);
									}}
								>
									<span>{option.label}</span>
									{sortMode === option.id ? (
										<IconCheck className="size-3.5" />
									) : null}
								</button>
							))}
						</div>
					) : null}
				</div>
			</div>

			<div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
				<span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-text-faint">
					Post Type:
				</span>
				{POST_TYPE_FILTERS.map((filter) => (
					<button
						key={filter.id}
						type="button"
						className={cn(
							'inline-flex h-6 items-center gap-1 whitespace-nowrap rounded-md border px-2.5 text-[12px] transition-colors',
							postTypeFilter === filter.id
								? 'border-border-strong bg-surface-raised text-text-primary'
								: 'border-border-subtle bg-surface text-text-secondary hover:bg-surface-hover',
							filter.id === 'question' && postTypeFilter !== filter.id && 'text-secondary',
							filter.id === 'resource' && postTypeFilter !== filter.id && 'text-primary',
							filter.id === 'milestone' && postTypeFilter !== filter.id && 'text-accent-warm',
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

			<div className="flex items-center gap-1.5 overflow-x-auto pt-1 text-caption text-text-faint">
				<span className="text-[11px]">Browse craft:</span>
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
	);
}
