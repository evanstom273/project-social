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
		<div className="grid h-svh grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-background text-text-primary">
			<ShellHeader onMenuOpen={() => setMobileNavOpen(true)} />
			<ShellMobileDrawer
				open={mobileNavOpen}
				onClose={() => setMobileNavOpen(false)}
			/>

			<div className="grid min-h-0 grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)] xl:grid-cols-[16rem_minmax(0,1fr)_20rem]">
				<ShellSidebar />

				<main className="min-w-0 overflow-x-hidden overflow-y-auto overscroll-y-contain">
					<div className="mx-auto w-full max-w-[var(--spacing-feed-max)] px-[var(--spacing-gutter-mobile)] py-6 md:px-[var(--spacing-gutter-tablet)] lg:px-[var(--spacing-gutter-desktop)] lg:py-8">
						{children}
					</div>
				</main>

				{rightRail ? <ShellDiscoveryRail>{rightRail}</ShellDiscoveryRail> : null}
			</div>
		</div>
	);
}
