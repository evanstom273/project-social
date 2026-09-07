import { useEffect, useRef, useState } from 'react';

import type { MediaFilter, PostType } from '@/domain/feed-types';
import type { FeedSortMode } from '@/domain/types';
import { FeedFiltersPanel } from '@/components/feed/FeedFiltersPanel';
import { countActiveFilters } from '@/components/feed/feed-filter-utils';
import { IconClose, IconSearch } from '@/components/feed/icons';
import { cn } from '@/lib/cn';

type FeedToolbarProps = {
	searchQuery: string;
	mediaFilter: MediaFilter;
	postTypeFilter: PostType | 'all';
	sortMode: FeedSortMode;
	craftTag: string | null;
	onSearchQueryChange: (query: string) => void;
	onMediaFilterChange: (filter: MediaFilter) => void;
	onPostTypeFilterChange: (filter: PostType | 'all') => void;
	onSortModeChange: (mode: FeedSortMode) => void;
	onCraftTagChange: (tag: string | null) => void;
};

export function FeedToolbar({
	searchQuery,
	mediaFilter,
	postTypeFilter,
	sortMode,
	craftTag,
	onSearchQueryChange,
	onMediaFilterChange,
	onPostTypeFilterChange,
	onSortModeChange,
	onCraftTagChange,
}: FeedToolbarProps) {
	const [filtersOpen, setFiltersOpen] = useState(false);
	const filtersRef = useRef<HTMLDivElement>(null);

	const activeFilterCount = countActiveFilters({
		mediaFilter,
		postTypeFilter,
		craftTag,
		sortMode,
	});

	useEffect(() => {
		if (!filtersOpen) {
			return;
		}

		function handleClick(event: MouseEvent) {
			if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
				setFiltersOpen(false);
			}
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setFiltersOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClick);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClick);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [filtersOpen]);

	useEffect(() => {
		if (!filtersOpen) {
			return;
		}

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [filtersOpen]);

	const filterPanelProps = {
		mediaFilter,
		postTypeFilter,
		sortMode,
		craftTag,
		onMediaFilterChange,
		onPostTypeFilterChange,
		onSortModeChange,
		onCraftTagChange,
	};

	return (
		<div className="border-t border-border-subtle/60 pt-4">
			<div className="flex items-center gap-2">
				<label className="relative min-w-0 flex-1">
					<span className="sr-only">Search feed</span>
					<IconSearch className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-text-faint" />
					<input
						type="search"
						value={searchQuery}
						onChange={(event) => onSearchQueryChange(event.target.value)}
						placeholder="Search posts, projects, communities..."
						className="h-10 w-full rounded-xl border border-border-subtle bg-surface-subtle pl-9 pr-4 text-body-sm text-text-primary transition-colors placeholder:text-text-faint hover:border-border-default focus:border-primary focus:outline-none"
					/>
				</label>

				<div className="relative shrink-0" ref={filtersRef}>
					<button
						type="button"
						className={cn(
							'flex h-10 items-center gap-2 rounded-xl border px-3 text-label-md transition-colors',
							activeFilterCount > 0
								? 'border-primary/40 bg-primary-muted text-primary'
								: 'border-border-subtle bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary',
						)}
						aria-expanded={filtersOpen}
						aria-haspopup="dialog"
						onClick={() => setFiltersOpen((open) => !open)}
					>
						Filters
						{activeFilterCount > 0 ? (
							<span className="rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-semibold text-on-primary">
								{activeFilterCount}
							</span>
						) : null}
					</button>

					{filtersOpen ? (
						<>
							<div
								className="fixed inset-0 z-40 bg-scrim md:hidden"
								aria-hidden="true"
								onClick={() => setFiltersOpen(false)}
							/>
							<div
								className={cn(
									'z-50 border border-border-strong bg-surface-overlay shadow-2xl',
									'fixed inset-x-0 bottom-0 max-h-[min(85dvh,32rem)] overflow-y-auto rounded-t-2xl p-4 md:absolute md:inset-auto md:bottom-auto md:right-0 md:mt-2 md:max-h-[min(70dvh,28rem)] md:w-[min(22rem,calc(100vw-2rem))] md:rounded-xl md:p-4',
								)}
								role="dialog"
								aria-label="Feed filters"
							>
								<div className="mb-3 flex items-center justify-between gap-2 md:hidden">
									<p className="text-label-md font-semibold text-text-primary">Filters</p>
									<button
										type="button"
										className="flex size-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary"
										aria-label="Close filters"
										onClick={() => setFiltersOpen(false)}
									>
										<IconClose className="size-4" />
									</button>
								</div>
								<FeedFiltersPanel {...filterPanelProps} />
							</div>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
}
