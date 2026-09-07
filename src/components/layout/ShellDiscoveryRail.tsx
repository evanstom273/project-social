import { type ReactNode } from 'react';

type ShellDiscoveryRailProps = {
	children: ReactNode;
};

export function ShellDiscoveryRail({ children }: ShellDiscoveryRailProps) {
	return (
		<aside
			className="hidden h-full w-80 shrink-0 flex-col overflow-y-auto border-l border-border-subtle bg-surface p-6 shadow-[-1px_0_12px_rgba(0,0,0,0.35)] xl:flex"
			aria-label="Discovery"
		>
			{children}
		</aside>
	);
}
