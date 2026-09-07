import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { FeedPost } from '@/domain/feed-types';
import { ROUTES } from '@/config/constants';
import { Avatar } from '@/components/ui/Avatar';
import { ProjectAvatar } from '@/components/ui/ProjectAvatar';
import { cn } from '@/lib/cn';
import {
	IconBookmark,
	IconComment,
	IconDownload,
	IconFlag,
	IconHeart,
	IconHelp,
	IconPlay,
	IconShare,
} from '@/components/feed/icons';

type PostCardProps = {
	post: FeedPost;
};

function FollowProjectButton() {
	const [following, setFollowing] = useState(false);

	return (
		<button
			type="button"
			className={cn(
				'flex h-7 shrink-0 items-center rounded-full border px-2.5 text-caption font-medium transition-colors',
				following
					? 'border-primary/40 bg-primary-muted text-primary'
					: 'border-border-default text-text-secondary hover:border-primary hover:text-primary',
			)}
			aria-pressed={following}
			onClick={() => setFollowing((value) => !value)}
		>
			{following ? 'Following' : '+ Follow'}
		</button>
	);
}

function PostTypeBadge({ post }: { post: FeedPost }) {
	if (post.type === 'milestone') {
		return (
			<div className="flex items-center gap-1 rounded-md border border-accent-warm/40 bg-accent-warm/10 px-2.5 py-0.5 text-caption font-semibold text-accent-warm">
				<IconFlag className="size-3.5" />
				<span>{post.badge}</span>
			</div>
		);
	}

	if (post.type === 'question') {
		return (
			<div className="flex items-center gap-1 rounded-md border border-secondary/40 bg-secondary-muted px-2.5 py-0.5 text-caption font-semibold text-secondary">
				<IconHelp className="size-3.5" />
				<span>{post.badge}</span>
			</div>
		);
	}

	if (post.type === 'resource') {
		return (
			<div className="flex items-center gap-1 rounded-md border border-primary/40 bg-primary-muted px-2.5 py-0.5 text-caption font-semibold text-primary">
				<IconDownload className="size-3.5" />
				<span>{post.badge}</span>
			</div>
		);
	}

	return (
		<div className="rounded-md border border-border-subtle bg-surface-subtle px-2.5 py-0.5 text-caption font-medium text-text-secondary">
			{post.badge}
		</div>
	);
}

function PostMedia({ post }: { post: FeedPost }) {
	if (!post.media) {
		return null;
	}

	if (post.media.kind === 'video') {
		return (
			<div className="group relative mb-4 aspect-video w-full cursor-pointer overflow-hidden rounded-lg border border-border-subtle bg-surface-subtle">
				<img
					src={post.media.imageUrl}
					alt={post.media.alt}
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20" />
				<div className="absolute right-3 top-3 flex items-center gap-1 rounded-md border border-border-subtle bg-background/90 px-2 py-0.5 text-caption font-medium text-text-primary backdrop-blur-md">
					<span className="text-primary">♪</span>
					{post.media.duration}
				</div>
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="flex size-12 items-center justify-center rounded-full border border-border-subtle bg-background/85 p-3 text-primary shadow-xl backdrop-blur-md transition-all duration-200 group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary">
						<IconPlay className="ml-0.5 size-6" />
					</div>
				</div>
				<div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-[11px] text-text-muted">
					{post.media.overlayLeft ? (
						<span className="rounded bg-surface-overlay/85 px-2 py-0.5 font-mono text-text-primary">
							{post.media.overlayLeft}
						</span>
					) : null}
					{post.media.overlayRight ? (
						<span className="text-text-secondary">{post.media.overlayRight}</span>
					) : null}
				</div>
			</div>
		);
	}

	if (post.media.kind === 'image') {
		return (
			<div className="group relative mb-4 aspect-video w-full cursor-pointer overflow-hidden rounded-lg border border-border-subtle bg-surface-subtle">
				<img
					src={post.media.imageUrl}
					alt={post.media.alt}
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
				/>
				{post.media.caption ? (
					<div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded border border-border-subtle bg-background/85 px-2.5 py-1 text-caption text-text-primary backdrop-blur-sm">
						<span className="text-primary">◉</span>
						{post.media.caption}
					</div>
				) : null}
			</div>
		);
	}

	if (post.media.kind === 'diagram') {
		return (
			<div className="mb-4 rounded-lg border border-border-subtle bg-surface-subtle p-3">
				<div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-2 font-mono text-caption text-text-faint">
					<span className="flex items-center gap-1.5">
						<span className="size-2 rounded-full bg-secondary" />
						{post.media.title}
					</span>
					<span>{post.media.subtitle}</span>
				</div>
				<div className="relative flex h-16 w-full flex-col justify-around rounded bg-surface-subtle px-2 py-1 font-mono text-[11px]">
					<div className="flex items-center gap-2">
						<span className="w-8 shrink-0 text-secondary">SCL</span>
						<div className="flex h-3 flex-1 items-center">
							<div className="h-0.5 w-full border-b border-t border-dashed border-secondary bg-secondary/70" />
						</div>
						<span className="text-[10px] text-text-faint">{post.media.sclLabel}</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="w-8 shrink-0 text-error">SDA</span>
						<div className="flex h-3 flex-1 items-center">
							<div className="h-0.5 w-2/3 bg-error" />
							<div className="h-2 w-1/3 border-b border-l border-error pl-1 text-[9px] text-error">
								HELD LOW BY SLAVE
							</div>
						</div>
						<span className="text-[10px] text-error">{post.media.sdaLabel}</span>
					</div>
				</div>
				<div className="mt-2 flex items-center justify-between text-[11px] text-text-muted">
					<span>{post.media.footerLeft}</span>
					<button
						type="button"
						className="flex items-center gap-0.5 text-secondary hover:underline"
					>
						{post.media.footerLink}
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="mb-4 flex flex-col gap-2.5 rounded-lg border border-border-subtle bg-surface-subtle p-3">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<div className="flex items-center gap-2">
					<span className="text-xl text-primary">▣</span>
					<div>
						<p className="text-label-md font-medium text-text-primary">
							{post.media.fileName}
						</p>
						<p className="text-caption text-text-muted">{post.media.fileMeta}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<button
						type="button"
						className="flex h-7 items-center gap-1 rounded-lg border border-border-subtle bg-surface-subtle px-3 text-caption text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
					>
						GitHub Repo
					</button>
					<button
						type="button"
						className="flex h-7 items-center gap-1 rounded-lg bg-primary px-3 text-caption font-bold text-on-primary transition-colors hover:bg-primary-hover"
					>
						<IconDownload className="size-3.5" />
						Get Script
					</button>
				</div>
			</div>
			<pre className="overflow-x-auto rounded border border-border-subtle bg-surface-subtle p-2.5 font-mono text-[12px] leading-relaxed text-text-secondary">
				{post.media.codeSnippet}
			</pre>
		</div>
	);
}

function PostActions({ post }: { post: FeedPost }) {
	const [liked, setLiked] = useState(false);
	const [saved, setSaved] = useState(false);

	return (
		<div className="flex items-center justify-between border-t border-border-subtle/50 pt-2 text-text-muted">
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
				<button
					type="button"
					className="flex items-center gap-1.5 transition-colors hover:text-primary"
					aria-label="Share post"
				>
					<IconShare className="size-[18px]" />
				</button>
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

export function PostCard({ post }: PostCardProps) {
	return (
		<article className="rounded-xl border border-border-subtle bg-surface-raised p-4 shadow-md transition-all duration-150 hover:border-border-default md:p-4">
			<div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
				<div className="flex min-w-0 items-start gap-3">
					<ProjectAvatar
						initial={post.project.initial}
						accentClassName={post.project.accentClassName}
					/>
					<div className="min-w-0">
						<div className="flex flex-wrap items-center gap-2">
							<Link
								to={ROUTES.project(post.project.slug)}
								className="truncate text-base font-semibold text-text-primary transition-colors hover:text-primary"
							>
								{post.project.name}
							</Link>
							<span className="rounded border border-border-subtle/50 bg-surface-subtle px-2 py-0.5 text-caption text-text-secondary">
								{post.project.category}
							</span>
						</div>
						<div className="mt-0.5 flex items-center gap-1.5 text-caption text-text-muted">
							<Avatar
								size="xs"
								alt={post.author.displayName}
								src={post.author.avatarUrl}
								fallback={post.author.displayName.charAt(0)}
							/>
							<span className="font-medium text-text-secondary">
								{post.author.displayName}
							</span>
							<span className="text-text-faint">@{post.author.handle}</span>
							<span className="size-1 rounded-full bg-text-faint" aria-hidden="true" />
							<span className="text-text-faint">{post.postedAgo}</span>
						</div>
					</div>
				</div>
				<div className="flex flex-wrap items-center gap-2 sm:shrink-0">
					<PostTypeBadge post={post} />
					<FollowProjectButton />
				</div>
			</div>

			<div className="mb-4">
				{post.title ? (
					<h3 className="mb-1 text-base font-semibold text-text-primary">{post.title}</h3>
				) : null}
				<p className="text-body-md leading-relaxed text-text-primary">{post.body}</p>
			</div>

			<PostMedia post={post} />

			<div className="mb-3 flex flex-wrap items-center gap-2">
				{post.tags.map((tag, index) => (
					<button
						key={tag}
						type="button"
						className={cn(
							'text-[12px] hover:underline',
							index < 2 ? 'text-primary' : 'text-text-muted hover:text-text-primary',
							post.type === 'question' && index < 2 && 'text-secondary',
						)}
					>
						#{tag}
					</button>
				))}
			</div>

			<PostActions post={post} />
		</article>
	);
}
