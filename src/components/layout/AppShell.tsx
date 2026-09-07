import { type ReactNode, useState } from 'react';

import { ShellDiscoveryRail } from '@/components/layout/ShellDiscoveryRail';
import { ShellHeader } from '@/components/layout/ShellHeader';
import { ShellMobileDrawer } from '@/components/layout/ShellMobileDrawer';
import { ShellSidebar } from '@/components/layout/ShellSidebar';

type AppShellProps = {
	children: ReactNode;
	rightRail?: ReactNode;
};

export function AppShell({ children, rightRail }: AppShellProps) {
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	return (
		<div className="flex h-dvh flex-col overflow-hidden bg-background text-text-primary">
			<ShellHeader onMenuOpen={() => setMobileNavOpen(true)} />
			<ShellMobileDrawer
				open={mobileNavOpen}
				onClose={() => setMobileNavOpen(false)}
			/>

			<div className="flex min-h-0 flex-1">
				<ShellSidebar />

				<main className="min-w-0 flex-1 overflow-y-auto overscroll-y-contain">
					<div className="mx-auto w-full max-w-[var(--spacing-feed-max)] px-[var(--spacing-gutter-mobile)] py-6 md:px-[var(--spacing-gutter-tablet)] lg:px-[var(--spacing-gutter-desktop)] lg:py-8">
						{children}
					</div>
				</main>

				{rightRail ? <ShellDiscoveryRail>{rightRail}</ShellDiscoveryRail> : null}
			</div>
		</div>
	);
}
