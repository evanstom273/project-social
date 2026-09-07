import type { FeedFilterMode, FeedSortMode } from '@/domain/types';
import { cn } from '@/lib/cn';
import { Text } from '@/components/ui/Text';
import { IconInfo } from '@/components/feed/icons';

type FeedHeaderProps = {
	filterMode: FeedFilterMode;
	sortMode: FeedSortMode;
	onFilterModeChange: (mode: FeedFilterMode) => void;
};

const SORT_LABELS: Record<FeedSortMode, string> = {
	newest: 'Chronological · Newest First',
	'top-today': 'Top Today',
	'top-week': 'Top This Week',
	'top-month': 'Top This Month',
	'most-discussed': 'Most Discussed',
};

export function FeedHeader({
	filterMode,
	sortMode,
	onFilterModeChange,
}: FeedHeaderProps) {
	return (
		<div className="mb-6 flex flex-col gap-4">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex flex-wrap items-center gap-3">
					<Text as="h1" variant="headline-lg">
						Feed
					</Text>
					<div className="group relative hidden cursor-help items-center gap-1.5 rounded-full border border-border-subtle bg-surface px-3 py-1 sm:flex">
						<span
							className="size-2 animate-pulse rounded-full bg-primary"
							aria-hidden="true"
						/>
						<span className="text-caption font-medium text-text-secondary">
							{SORT_LABELS[sortMode]}
						</span>
						<IconInfo className="size-3.5 text-text-faint" />
						<div className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 hidden w-64 rounded-lg border border-border-strong bg-surface-overlay p-2.5 text-caption text-text-secondary shadow-2xl group-hover:block">
							Strict time-ordered stream. Likes and engagement never promote,
							demote, or re-order posts in your feed.
						</div>
					</div>
				</div>

				<div
					className="flex items-center rounded-xl border border-border-subtle bg-surface p-1 shadow-sm"
					role="tablist"
					aria-label="Feed perspective"
				>
					<button
						type="button"
						role="tab"
						aria-selected={filterMode === 'everything'}
						className={cn(
							'rounded-lg px-4 py-1.5 text-label-md transition-all',
							filterMode === 'everything'
								? 'bg-surface-raised font-semibold text-primary'
								: 'text-text-muted hover:text-text-primary',
						)}
						onClick={() => onFilterModeChange('everything')}
					>
						Everything
					</button>
					<button
						type="button"
						role="tab"
						aria-selected={filterMode === 'following'}
						className={cn(
							'rounded-lg px-4 py-1.5 text-label-md transition-all',
							filterMode === 'following'
								? 'bg-surface-raised font-semibold text-primary'
								: 'text-text-muted hover:text-text-primary',
						)}
						onClick={() => onFilterModeChange('following')}
					>
						Following
					</button>
				</div>
			</div>
		</div>
	);
}
