import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
	MOCK_ACTIVE_COMMUNITIES,
	MOCK_ACTIVE_PROJECTS,
	MOCK_NEW_PROJECTS,
} from '@/data/feed-mock';
import { ROUTES } from '@/config/constants';
import { ProjectAvatar } from '@/components/ui/ProjectAvatar';
import { cn } from '@/lib/cn';

function SidebarFollowButton({ compact }: { compact?: boolean }) {
	const [following, setFollowing] = useState(false);

	return (
		<button
			type="button"
			className={cn(
				'rounded-full border font-caption transition-colors',
				compact ? 'h-6 px-2' : 'h-7 px-2.5',
				following
					? 'border-primary/40 bg-primary-muted text-primary'
					: 'border-border-default text-text-secondary hover:border-primary hover:text-primary',
			)}
			onClick={() => setFollowing((value) => !value)}
		>
			{following ? 'Following' : '+ Follow'}
		</button>
	);
}

function JoinCommunityButton() {
	const [joined, setJoined] = useState(false);

	return (
		<button
			type="button"
			className={cn(
				'h-6 rounded-full px-2.5 text-[11px] transition-colors',
				joined
					? 'bg-primary-muted text-primary'
					: 'bg-surface-subtle text-text-secondary hover:bg-primary hover:text-on-primary',
			)}
			onClick={() => setJoined((value) => !value)}
		>
			{joined ? 'Joined' : 'Join'}
		</button>
	);
}

export function FeedDiscoveryRail() {
	return (
		<div className="flex flex-col gap-8">
			<section aria-labelledby="active-projects-heading">
				<div className="mb-1 flex items-center justify-between">
					<h2
						id="active-projects-heading"
						className="text-label-md font-bold uppercase tracking-tight text-text-primary"
					>
						Active Projects
					</h2>
					<Link
						to={ROUTES.projects}
						className="text-caption text-text-faint transition-colors hover:text-text-primary"
					>
						View all
					</Link>
				</div>
				<p className="mb-3 text-caption text-text-faint">Based on recent updates</p>
				<ul className="flex flex-col gap-3">
					{MOCK_ACTIVE_PROJECTS.map((project) => (
						<li
							key={project.id}
							className="flex items-center justify-between rounded-xl border border-border-subtle bg-surface-raised p-3 transition-all hover:border-border-default"
						>
							<div className="flex min-w-0 items-center gap-3">
								<ProjectAvatar
									size="sm"
									initial={project.initial}
									accentClassName={project.accentClassName}
								/>
								<div className="min-w-0">
									<p className="truncate text-label-md font-medium leading-tight text-text-primary">
										{project.name}
									</p>
									<div className="mt-0.5 flex items-center gap-1.5">
										<span className="rounded bg-primary-muted px-1.5 py-0.5 text-[11px] text-primary">
											{project.category}
										</span>
										<span className="text-caption text-text-faint">
											{project.followers}
										</span>
									</div>
								</div>
							</div>
							<SidebarFollowButton />
						</li>
					))}
				</ul>
			</section>

			<section aria-labelledby="new-noticed-heading">
				<div className="mb-3 flex items-center justify-between">
					<h2
						id="new-noticed-heading"
						className="text-label-md font-bold uppercase tracking-tight text-text-primary"
					>
						New &amp; Noticed
					</h2>
					<span className="text-caption text-text-faint">Recent launches</span>
				</div>
				<ul className="flex flex-col gap-3">
					{MOCK_NEW_PROJECTS.map((project) => (
						<li
							key={project.id}
							className="flex items-center justify-between rounded-xl border border-border-subtle bg-surface-subtle p-3"
						>
							<div className="flex min-w-0 items-center gap-3">
								<ProjectAvatar
									size="sm"
									initial={project.initial}
									accentClassName={project.accentClassName}
								/>
								<div className="min-w-0">
									<p className="truncate text-label-md text-text-primary">{project.name}</p>
									<p className="truncate text-caption text-text-muted">{project.category}</p>
								</div>
							</div>
							<SidebarFollowButton compact />
						</li>
					))}
				</ul>
			</section>

			<section aria-labelledby="active-communities-heading">
				<div className="mb-3 flex items-center justify-between">
					<h2
						id="active-communities-heading"
						className="text-label-md font-bold uppercase tracking-tight text-text-primary"
					>
						Active Communities
					</h2>
					<Link
						to={ROUTES.communities}
						className="text-caption text-text-faint transition-colors hover:text-text-primary"
					>
						Explore
					</Link>
				</div>
				<ul className="flex flex-col gap-1">
					{MOCK_ACTIVE_COMMUNITIES.map((community) => (
						<li
							key={community.id}
							className="flex items-center justify-between py-1.5"
						>
							<div className="flex items-center gap-1.5">
								<span className="font-mono text-label-md text-text-faint">#</span>
								<span className="text-label-md text-text-secondary">{community.name}</span>
							</div>
							<JoinCommunityButton />
						</li>
					))}
				</ul>
			</section>

			<footer className="mt-2 flex flex-col gap-1 border-t border-border-subtle pt-6 text-caption text-text-faint">
				<div className="flex flex-wrap gap-x-3 gap-y-1">
					<span>About</span>
					<span>Guidelines</span>
					<span>Privacy</span>
					<span>API</span>
					<span>Manifesto</span>
				</div>
				<p className="mt-1 text-[11px] leading-relaxed">
					Project Social is chronological by default. Feeds are never algorithmically
					re-ordered.
				</p>
				<p className="text-[11px]">© 2024 Project Social Studio</p>
			</footer>
		</div>
	);
}
