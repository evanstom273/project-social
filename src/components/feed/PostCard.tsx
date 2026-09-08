import { Link, useLocation } from 'react-router-dom';

import type { FeedPost } from '@/domain/feed-types';
import { ROUTES } from '@/config/constants';
import { PostActions } from '@/components/feed/PostActions';
import { PostMedia } from '@/components/feed/PostMedia';
import { PostTypeBadge } from '@/components/feed/PostTypeBadge';
import { ProjectAvatar } from '@/components/ui/ProjectAvatar';
import { saveCurrentFeedScrollPosition } from '@/lib/feed-scroll';
import { feedLocationSearch, type FeedSearchState } from '@/features/home/feed-search-params';

type PostCardProps = {
	post: FeedPost;
	feedState?: FeedSearchState;
};

export function PostCard({ post, feedState }: PostCardProps) {
	const location = useLocation();
	const returnTo =
		feedState !== undefined
			? `${ROUTES.home}${feedLocationSearch(feedState)}`
			: `${location.pathname}${location.search}`;

	return (
		<article className="glass-card glass-card-hover max-w-full overflow-hidden rounded-xl border p-0">
			<Link
				to={ROUTES.post(post.id)}
				state={{ from: returnTo }}
				className="block p-4"
				onClick={saveCurrentFeedScrollPosition}
			>
				<div className="mb-3 flex items-start justify-between gap-3">
					<div className="flex min-w-0 items-start gap-3">
						{post.project ? <Link to={ROUTES.project(post.project.id)} onClick={(event) => event.stopPropagation()}><ProjectAvatar initial={post.project.initial} avatarUrl={post.project.avatarUrl} accentClassName={post.project.accentClassName} /></Link> : <ProjectAvatar initial={post.author.displayName.charAt(0)} />}
						<div className="min-w-0">
							{post.project ? <Link to={ROUTES.project(post.project.id)} onClick={(event) => event.stopPropagation()} className="block truncate text-base font-semibold text-text-primary transition-colors hover:text-primary">{post.project.name}</Link> : <p className="truncate text-base font-semibold text-text-primary">{post.author.displayName}</p>}
							<div className="mt-1 flex flex-wrap items-center gap-2">
								<PostTypeBadge post={post} compact />
								<span className="text-caption text-text-faint">{post.postedAgo}</span>
							</div>
						</div>
					</div>
				</div>

				{post.title ? (
					<h3 className="mb-1 line-clamp-2 text-base font-semibold text-text-primary">
						{post.title}
					</h3>
				) : null}
				<p className="mb-4 line-clamp-3 text-body-md leading-relaxed text-text-secondary">
					{post.body}
				</p>

				<div className="mb-1">
					<PostMedia post={post} variant="feed" />
				</div>
			</Link>

			<div className="px-4 pb-4">
				<PostActions post={post} compact />
			</div>
		</article>
	);
}
