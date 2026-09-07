import type { FeedPost } from '@/domain/feed-types';
import { cn } from '@/lib/cn';
import { IconDownload, IconFlag, IconHelp } from '@/components/feed/icons';

const TYPE_LABELS: Record<FeedPost['type'], string> = {
	update: 'Update',
	question: 'Question',
	resource: 'Resource',
	milestone: 'Milestone',
};

type PostTypeBadgeProps = {
	post: FeedPost;
	compact?: boolean;
};

export function PostTypeBadge({ post, compact = false }: PostTypeBadgeProps) {
	const label = compact ? TYPE_LABELS[post.type] : post.badge;

	if (post.type === 'milestone') {
		return (
			<div
				className={cn(
					'flex items-center gap-1 rounded-md border border-accent-warm/40 bg-accent-warm/10 px-2 py-0.5 text-caption font-semibold text-accent-warm',
					compact && 'px-1.5',
				)}
			>
				<IconFlag className="size-3.5 shrink-0" />
				<span>{label}</span>
			</div>
		);
	}

	if (post.type === 'question') {
		return (
			<div
				className={cn(
					'flex items-center gap-1 rounded-md border border-secondary/40 bg-secondary-muted px-2 py-0.5 text-caption font-semibold text-secondary',
					compact && 'px-1.5',
				)}
			>
				<IconHelp className="size-3.5 shrink-0" />
				<span>{label}</span>
			</div>
		);
	}

	if (post.type === 'resource') {
		return (
			<div
				className={cn(
					'flex items-center gap-1 rounded-md border border-primary/40 bg-primary-muted px-2 py-0.5 text-caption font-semibold text-primary',
					compact && 'px-1.5',
				)}
			>
				<IconDownload className="size-3.5 shrink-0" />
				<span>{label}</span>
			</div>
		);
	}

	return (
		<div
			className={cn(
				'rounded-md border border-border-subtle bg-surface-subtle/80 px-2 py-0.5 text-caption font-medium text-text-secondary',
				compact && 'px-1.5',
			)}
		>
			{label}
		</div>
	);
}
