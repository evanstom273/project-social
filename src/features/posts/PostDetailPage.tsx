import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/config/constants';
import { getMockFeedPostById } from '@/data/feed-mock';
import { PostActions } from '@/components/feed/PostActions';
import { PostMedia } from '@/components/feed/PostMedia';
import { PostTypeBadge } from '@/components/feed/PostTypeBadge';
import { Avatar } from '@/components/ui/Avatar';
import { ProjectAvatar } from '@/components/ui/ProjectAvatar';
import { IconChevronLeft } from '@/components/feed/icons';
import { cn } from '@/lib/cn';

type PostDetailLocationState = {
	from?: string;
};

function FollowProjectButton() {
	const [following, setFollowing] = useState(false);

	return (
		<button
			type="button"
			className={cn(
				'flex h-8 shrink-0 items-center rounded-full border px-3 text-caption font-medium transition-colors',
				following
					? 'border-primary/40 bg-primary-muted text-primary'
					: 'border-border-default text-text-secondary hover:border-primary hover:text-primary',
			)}
			aria-pressed={following}
			onClick={() => setFollowing((value) => !value)}
		>
			{following ? 'Following' : '+ Follow project'}
		</button>
	);
}

export function PostDetailPage() {
	const { postId } = useParams<{ postId: string }>();
	const navigate = useNavigate();
	const location = useLocation();
	const locationState = location.state as PostDetailLocationState | null;
	const returnTo = locationState?.from ?? ROUTES.home;

	const post = postId ? getMockFeedPostById(postId) : undefined;

	if (!post) {
		return <Navigate to={ROUTES.home} replace />;
	}

	return (
		<div className="pb-8">
			<button
				type="button"
				className="mb-5 inline-flex items-center gap-1.5 rounded-xl border border-border-subtle/80 bg-surface-subtle/70 px-3 py-2 text-label-md text-text-secondary backdrop-blur-sm transition-colors hover:border-primary/30 hover:text-text-primary"
				onClick={() => navigate(returnTo)}
			>
				<IconChevronLeft className="size-4" />
				Back to feed
			</button>

			<article className="glass-panel overflow-hidden rounded-2xl border">
				<header className="border-b border-border-subtle/60 p-5">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
						<div className="flex min-w-0 items-start gap-3">
							<ProjectAvatar
								initial={post.project.initial}
								accentClassName={post.project.accentClassName}
								size="md"
							/>
							<div className="min-w-0">
								<div className="flex flex-wrap items-center gap-2">
									<Link
										to={ROUTES.project(post.project.slug)}
										className="truncate text-headline-sm font-bold text-text-primary transition-colors hover:text-primary"
									>
										{post.project.name}
									</Link>
									<span className="rounded border border-border-subtle/60 bg-surface-subtle/80 px-2 py-0.5 text-caption text-text-secondary">
										{post.project.category}
									</span>
								</div>
								<div className="mt-2 flex flex-wrap items-center gap-2 text-caption text-text-muted">
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
						<div className="flex flex-wrap items-center gap-2">
							<PostTypeBadge post={post} />
							<FollowProjectButton />
						</div>
					</div>
				</header>

				<div className="p-5">
					{post.title ? (
						<h1 className="mb-3 text-headline-md font-bold text-text-primary">{post.title}</h1>
					) : null}
					<p className="whitespace-pre-wrap text-body-lg leading-relaxed text-text-primary">
						{post.body}
					</p>
				</div>

				{post.media ? (
					<div className="px-5 pb-5">
						<PostMedia post={post} variant="detail" />
					</div>
				) : null}

				<div className="flex flex-wrap gap-2 border-t border-border-subtle/60 px-5 py-4">
					{post.tags.map((tag) => (
						<span
							key={tag}
							className="rounded-md border border-border-subtle/70 bg-surface-subtle/70 px-2.5 py-1 text-[12px] text-text-secondary"
						>
							#{tag}
						</span>
					))}
				</div>

				<div className="border-t border-border-subtle/60 px-5 py-4">
					<PostActions post={post} />
				</div>

				<section
					className="border-t border-border-subtle/60 px-5 py-5"
					aria-label="Discussion"
				>
					<h2 className="mb-3 text-label-md font-semibold text-text-primary">
						Discussion
					</h2>
					<p className="rounded-xl border border-dashed border-border-subtle bg-surface-subtle/50 px-4 py-6 text-center text-body-sm text-text-muted">
						Comments and replies will appear here. Threaded discussion is not wired to
						backend data yet.
					</p>
				</section>
			</article>
		</div>
	);
}
