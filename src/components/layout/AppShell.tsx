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
		<div className="min-h-dvh bg-background text-text-primary">
			<ShellHeader onMenuOpen={() => setMobileNavOpen(true)} />
			<ShellMobileDrawer
				open={mobileNavOpen}
				onClose={() => setMobileNavOpen(false)}
			/>
			<ShellSidebar />
			{rightRail ? <ShellDiscoveryRail>{rightRail}</ShellDiscoveryRail> : null}

			<div className="md:pl-64 xl:pr-80">
				<main className="min-h-dvh pt-16">{children}</main>
			</div>
		</div>
	);
}
