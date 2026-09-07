import { NavLink } from 'react-router-dom';

import { DESKTOP_NAV_ITEMS, ROUTES } from '@/config/constants';
import { MOCK_CURRENT_USER } from '@/data/feed-mock';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/cn';
import {
	IconAdd,
	IconCommunities,
	IconExplore,
	IconHome,
	IconMore,
	IconProjects,
	IconSaved,
} from '@/components/feed/icons';

const NAV_ICONS = {
	home: IconHome,
	explore: IconExplore,
	communities: IconCommunities,
	projects: IconProjects,
	saved: IconSaved,
} as const;

function navLinkClassName({ isActive }: { isActive: boolean }) {
	return cn(
		'flex min-h-11 items-center gap-3 rounded-xl px-4 py-2.5 text-label-md transition-all duration-fast',
		isActive
			? 'bg-primary-muted text-primary'
			: 'text-text-muted hover:bg-surface-hover hover:text-text-primary',
	);
}

export function DesktopNavRail() {
	return (
		<aside
			className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col lg:justify-between lg:border-r lg:border-border-subtle lg:py-6 lg:pl-[var(--spacing-gutter-desktop)] lg:pr-4"
			aria-label="Desktop navigation"
		>
			<div className="flex flex-col gap-6">
				<nav className="flex flex-col gap-1">
					{DESKTOP_NAV_ITEMS.map((item) => {
						const Icon = NAV_ICONS[item.icon];
						return (
							<NavLink
								key={item.to}
								to={item.to}
								end={item.end}
								className={navLinkClassName}
							>
								<Icon className="size-5 shrink-0" />
								{item.label}
							</NavLink>
						);
					})}
				</nav>

				<NavLink
					to={ROUTES.create}
					className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-label-md font-bold text-on-primary shadow-[0_4px_16px_rgb(94_224_181_/_0.22)] transition-colors duration-fast hover:bg-primary-hover"
				>
					<IconAdd className="size-5" />
					New Update
				</NavLink>
			</div>

			<div className="mt-6 flex items-center justify-between rounded-xl border border-border-subtle bg-surface-raised p-3">
				<div className="flex min-w-0 items-center gap-3">
					<Avatar
						alt={MOCK_CURRENT_USER.displayName}
						src={MOCK_CURRENT_USER.avatarUrl}
						fallback={MOCK_CURRENT_USER.displayName.charAt(0)}
					/>
					<div className="min-w-0">
						<p className="truncate text-label-md font-medium text-text-primary">
							{MOCK_CURRENT_USER.displayName}
						</p>
						<p className="truncate text-caption text-text-muted">
							@{MOCK_CURRENT_USER.handle}
						</p>
					</div>
				</div>
				<button
					type="button"
					className="p-1 text-text-faint transition-colors hover:text-text-primary"
					aria-label="Account menu"
				>
					<IconMore className="size-[18px]" />
				</button>
			</div>
		</aside>
	);
}
