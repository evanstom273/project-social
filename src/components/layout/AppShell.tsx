import { type ReactNode } from 'react';

import { DesktopNavRail } from '@/components/layout/DesktopNavRail';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { TopHeader } from '@/components/layout/TopHeader';
import { Container } from '@/components/ui/Container';

type AppShellProps = {
	children: ReactNode;
	rightRail?: ReactNode;
};

export function AppShell({ children, rightRail }: AppShellProps) {
	return (
		<div className="min-h-dvh bg-background">
			<TopHeader />

			<Container className="flex min-h-[calc(100dvh-4rem)] gap-0 lg:gap-6 xl:gap-8">
				<DesktopNavRail />

				<div className="flex min-w-0 flex-1 flex-col pb-24 lg:pb-8">
					<main className="gutter-x flex-1 py-4 lg:py-6">{children}</main>
				</div>

				{rightRail ? (
					<aside
						className="hidden w-80 shrink-0 border-l border-border-subtle py-6 pr-[var(--spacing-gutter-desktop)] xl:block"
						aria-label="Discovery"
					>
						{rightRail}
					</aside>
				) : null}
			</Container>

			<MobileBottomNav />
		</div>
	);
}
