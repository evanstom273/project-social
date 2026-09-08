import { NavLink } from 'react-router-dom';

import { SHELL_SIDEBAR_NAV_ITEMS } from '@/config/constants';
import { useAuth } from '@/app/providers/auth-context';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/cn';
import {
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

function sidebarLinkClassName({ isActive }: { isActive: boolean }) {
	return cn(
		'flex min-h-11 items-center gap-3 rounded-xl px-4 py-2.5 text-label-md transition-all duration-fast',
		isActive
			? 'bg-primary-muted text-primary'
			: 'text-text-muted hover:bg-surface-hover hover:text-text-primary',
	);
}

type ShellNavItemsProps = {
	onNavigate?: () => void;
};

export function ShellNavItems({ onNavigate }: ShellNavItemsProps) {
	return (
		<div className="flex flex-col gap-6">
			<nav className="flex flex-col gap-1" aria-label="Main navigation">
				{SHELL_SIDEBAR_NAV_ITEMS.map((item) => {
					const Icon = NAV_ICONS[item.icon];
					return (
						<NavLink
							key={item.to}
							to={item.to}
							end={item.end}
							className={sidebarLinkClassName}
							onClick={onNavigate}
						>
							<Icon className="size-5 shrink-0" />
							{item.label}
						</NavLink>
					);
				})}
			</nav>
		</div>
	);
}

export function ShellUserCard() {
	const { profile, signOut } = useAuth();
	const displayName = profile?.displayName ?? 'Guest';
	return (
		<div className="flex items-center justify-between rounded-xl border border-border-subtle bg-surface-raised p-3">
			<div className="flex min-w-0 items-center gap-3">
				<Avatar
					alt={displayName}
					src={profile?.avatarUrl}
					fallback={displayName.charAt(0)}
				/>
				<div className="min-w-0">
					<p className="truncate text-label-md font-medium text-text-primary">
						{displayName}
					</p>
					<p className="truncate text-caption text-text-muted">
						{profile ? `@${profile.handle}` : 'Not signed in'}
					</p>
				</div>
			</div>
			<button
				type="button"
				className="p-1 text-caption text-text-faint transition-colors hover:text-text-primary"
				aria-label="Sign out"
				onClick={() => void signOut()}
			>
				{profile ? 'Sign out' : <IconMore className="size-[18px]" />}
			</button>
		</div>
	);
}
