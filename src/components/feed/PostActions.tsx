import { useState } from 'react';

import type { FeedPost } from '@/domain/feed-types';
import { cn } from '@/lib/cn';
import { IconBookmark, IconComment, IconHeart, IconShare } from '@/components/feed/icons';

type PostActionsProps = {
	post: FeedPost;
	compact?: boolean;
};

export function PostActions({ post, compact = false }: PostActionsProps) {
	const [liked, setLiked] = useState(false);
	const [saved, setSaved] = useState(false);

	return (
		<div
			className={cn(
				'flex items-center justify-between text-text-muted',
				compact ? 'pt-3' : 'border-t border-border-subtle/50 pt-3',
			)}
			onClick={(event) => event.stopPropagation()}
			onKeyDown={(event) => event.stopPropagation()}
		>
			<div className="flex items-center gap-4">
				<button
					type="button"
					className={cn(
						'group flex items-center gap-1.5 transition-colors',
						liked ? 'text-accent-rose' : 'hover:text-accent-rose',
					)}
					aria-pressed={liked}
					onClick={() => setLiked((value) => !value)}
				>
					<IconHeart className="size-[18px]" />
					<span
						className={cn(
							'text-[13px]',
							liked ? 'text-accent-rose' : 'text-text-secondary group-hover:text-accent-rose',
						)}
					>
						{post.likes + (liked ? 1 : 0)}
					</span>
				</button>
				<button
					type="button"
					className={cn(
						'group flex items-center gap-1.5 transition-colors',
						post.type === 'question'
							? 'text-secondary hover:text-text-primary'
							: 'hover:text-secondary',
					)}
				>
					<IconComment className="size-[18px]" />
					<span
						className={cn(
							'text-[13px]',
							post.type === 'question'
								? 'font-medium text-secondary'
								: 'text-text-secondary group-hover:text-secondary',
						)}
					>
						{post.commentLabel ?? post.comments}
					</span>
				</button>
				{compact ? null : (
					<button
						type="button"
						className="flex items-center gap-1.5 transition-colors hover:text-primary"
						aria-label="Share post"
					>
						<IconShare className="size-[18px]" />
					</button>
				)}
			</div>
			<button
				type="button"
				className={cn(
					'transition-colors',
					saved ? 'text-primary' : 'text-text-faint hover:text-primary',
				)}
				aria-pressed={saved}
				aria-label="Save post"
				onClick={() => setSaved((value) => !value)}
			>
				<IconBookmark className="size-[18px]" />
			</button>
		</div>
	);
}
