import { ShellNavItems, ShellUserCard } from '@/components/layout/ShellNavItems';

export function ShellSidebar() {
	return (
		<aside
			className="fixed bottom-0 left-0 top-16 z-30 hidden w-64 flex-col overflow-hidden border-r border-border-subtle bg-surface shadow-[1px_0_12px_rgba(0,0,0,0.35)] md:landscape:flex lg:flex"
			aria-label="Sidebar navigation"
		>
			<div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain p-6 pb-4">
				<ShellNavItems />
			</div>
			<div className="shrink-0 border-t border-border-subtle bg-surface p-4">
				<ShellUserCard />
			</div>
		</aside>
	);
}
