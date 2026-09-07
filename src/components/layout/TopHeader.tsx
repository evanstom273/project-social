import { NavLink } from 'react-router-dom';

import { DESKTOP_TOP_NAV_ITEMS, ROUTES } from '@/config/constants';
import { Logo } from '@/components/ui/Logo';
import { Avatar } from '@/components/ui/Avatar';
import { MOCK_CURRENT_USER } from '@/data/feed-mock';
import { cn } from '@/lib/cn';
import { IconBell, IconSearch } from '@/components/feed/icons';

function topNavClassName({ isActive }: { isActive: boolean }) {
	return cn(
		'text-label-md transition-colors',
		isActive ? 'text-primary' : 'text-text-muted hover:text-text-primary',
	);
}

export function TopHeader() {
	return (
		<header className="sticky top-0 z-40 hidden border-b border-border-subtle bg-surface/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.5)] lg:block">
			<div className="mx-auto flex h-16 max-w-[var(--spacing-content-max)] items-center justify-between px-[var(--spacing-gutter-desktop)]">
				<Logo />

				<nav
					className="hidden items-center gap-8 xl:flex"
					aria-label="Primary navigation"
				>
					{DESKTOP_TOP_NAV_ITEMS.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							end={item.end}
							className={topNavClassName}
						>
							{item.label}
						</NavLink>
					))}
				</nav>

				<div className="flex items-center gap-4">
					<label className="relative hidden items-center sm:flex">
						<span className="sr-only">Search</span>
						<IconSearch className="absolute left-3 size-[18px] text-text-faint" />
						<input
							type="search"
							placeholder="Search craft, projects, tags..."
							className="h-9 w-64 rounded-xl border border-border-subtle bg-surface-subtle pl-9 pr-4 text-body-sm text-text-primary transition-colors placeholder:text-text-faint hover:border-border-default focus:border-primary focus:outline-none"
						/>
					</label>
					<button
						type="button"
						className="flex size-9 items-center justify-center rounded-xl border border-border-subtle bg-surface-raised text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
						aria-label="Notifications"
					>
						<IconBell />
					</button>
					<NavLink to={ROUTES.profile} aria-label="Profile">
						<Avatar
							alt={MOCK_CURRENT_USER.displayName}
							src={MOCK_CURRENT_USER.avatarUrl}
							fallback={MOCK_CURRENT_USER.displayName.charAt(0)}
							size="sm"
						/>
					</NavLink>
				</div>
			</div>
		</header>
	);
}
