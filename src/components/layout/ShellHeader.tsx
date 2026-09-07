import { NavLink } from 'react-router-dom';

import { useCompose } from '@/app/providers/use-compose';
import { APP_NAME, ROUTES, SHELL_HEADER_NAV_ITEMS } from '@/config/constants';
import { MOCK_CURRENT_USER } from '@/data/feed-mock';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/cn';
import { IconAdd, IconBell, IconMenu, IconSearch } from '@/components/feed/icons';

function headerNavClassName({ isActive }: { isActive: boolean }) {
	return cn(
		'text-label-md transition-colors',
		isActive ? 'text-primary' : 'text-text-muted hover:text-text-primary',
	);
}

type ShellHeaderProps = {
	onMenuOpen: () => void;
};

export function ShellHeader({ onMenuOpen }: ShellHeaderProps) {
	const { openCompose } = useCompose();

	return (
		<header className="glass-surface fixed inset-x-0 top-0 z-40 border-b shadow-[0_1px_12px_rgba(0,0,0,0.5)]">
			<div className="flex h-16 items-center justify-between px-[var(--spacing-gutter-mobile)] md:px-[var(--spacing-gutter-tablet)] lg:px-[var(--spacing-gutter-desktop)]">
				<div className="flex min-w-0 items-center gap-3">
					<button
						type="button"
						className="flex size-10 items-center justify-center rounded-xl border border-border-subtle bg-surface-raised text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary md:landscape:hidden lg:hidden"
						aria-label="Open navigation menu"
						onClick={onMenuOpen}
					>
						<IconMenu />
					</button>

					<NavLink
						to={ROUTES.home}
						className="group flex min-w-0 items-center gap-2.5"
						aria-label={`${APP_NAME} home`}
					>
						<span
							className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary text-label-md"
							aria-hidden="true"
						>
							PS
						</span>
						<span className="truncate text-headline-sm font-bold tracking-tight text-text-primary transition-colors group-hover:text-primary">
							{APP_NAME}
						</span>
					</NavLink>
				</div>

				<nav
					className="hidden items-center gap-8 lg:flex"
					aria-label="Primary navigation"
				>
					{SHELL_HEADER_NAV_ITEMS.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							end={item.end}
							className={headerNavClassName}
						>
							{item.label}
						</NavLink>
					))}
				</nav>

				<div className="flex shrink-0 items-center gap-2 sm:gap-3">
					<button
						type="button"
						className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 text-label-md font-bold text-on-primary accent-glow-primary transition-colors hover:bg-primary-hover sm:px-4"
						aria-label="New Post"
						onClick={openCompose}
					>
						<IconAdd className="size-[18px] shrink-0" />
						<span className="hidden sm:inline">New Post</span>
					</button>
					<label className="relative hidden items-center sm:flex">
						<span className="sr-only">Search</span>
						<IconSearch className="absolute left-3 size-[18px] text-text-faint" />
						<input
							type="search"
							placeholder="Search craft, projects, tags..."
							className="h-9 w-40 rounded-xl border border-border-subtle bg-surface-subtle pl-9 pr-4 text-body-sm text-text-primary transition-colors placeholder:text-text-faint hover:border-border-default focus:border-primary focus:outline-none md:w-52 lg:w-64"
						/>
					</label>
					<button
						type="button"
						className="flex size-9 items-center justify-center rounded-xl border border-border-subtle bg-surface-raised text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary sm:hidden"
						aria-label="Search"
					>
						<IconSearch className="size-[18px]" />
					</button>
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
