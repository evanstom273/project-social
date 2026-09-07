import { type ReactNode } from 'react';

type ShellDiscoveryRailProps = {
	children: ReactNode;
};

export function ShellDiscoveryRail({ children }: ShellDiscoveryRailProps) {
	return (
		<aside
			className="glass-surface fixed bottom-0 right-0 top-16 z-30 hidden w-80 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain border-l p-6 shadow-[-1px_0_12px_rgba(0,0,0,0.35)] xl:flex"
			aria-label="Discovery"
		>
			{children}
		</aside>
	);
}
