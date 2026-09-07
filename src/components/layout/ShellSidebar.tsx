import { ShellNavItems, ShellUserCard } from '@/components/layout/ShellNavItems';

export function ShellSidebar() {
	return (
		<aside
			className="hidden h-full min-h-0 flex-col overflow-hidden border-r border-border-subtle bg-surface shadow-[1px_0_12px_rgba(0,0,0,0.35)] lg:flex"
			aria-label="Sidebar navigation"
		>
			<div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain p-6 pb-4">
				<ShellNavItems />
			</div>
			<div className="shrink-0 border-t border-border-subtle p-4">
				<ShellUserCard />
			</div>
		</aside>
	);
}
