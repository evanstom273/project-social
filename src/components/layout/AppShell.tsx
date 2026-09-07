import { type ReactNode, useState } from 'react';

import { ShellDiscoveryRail } from '@/components/layout/ShellDiscoveryRail';
import { ShellHeader } from '@/components/layout/ShellHeader';
import { ShellMobileDrawer } from '@/components/layout/ShellMobileDrawer';
import { ShellSidebar } from '@/components/layout/ShellSidebar';
import { cn } from '@/lib/cn';

type AppShellProps = {
	children: ReactNode;
	rightRail?: ReactNode;
};

export function AppShell({ children, rightRail }: AppShellProps) {
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	return (
		<div className="app-atmosphere relative h-svh w-full overflow-hidden text-text-primary">
			<ShellHeader onMenuOpen={() => setMobileNavOpen(true)} />
			<ShellMobileDrawer
				open={mobileNavOpen}
				onClose={() => setMobileNavOpen(false)}
			/>
			<ShellSidebar />
			{rightRail ? <ShellDiscoveryRail>{rightRail}</ShellDiscoveryRail> : null}

			<main
				id="app-main-scroll"
				className={cn(
					'fixed top-16 bottom-0 z-10 overflow-x-hidden overflow-y-auto overscroll-y-contain',
					'inset-x-0 md:landscape:left-64 lg:left-64',
					rightRail ? 'xl:right-80' : 'xl:right-0',
				)}
			>
				<div className="mx-auto box-border w-full max-w-[var(--spacing-feed-max)] px-[var(--spacing-gutter-mobile)] py-6 md:px-[var(--spacing-gutter-tablet)] lg:px-[var(--spacing-gutter-desktop)] lg:py-8">
					{children}
				</div>
			</main>
		</div>
	);
}
