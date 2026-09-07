import { ShellNavItems, ShellUserCard } from '@/components/layout/ShellNavItems';

export function ShellSidebar() {
	return (
		<aside
			className="fixed bottom-0 left-0 top-16 z-30 hidden w-64 flex-col justify-between border-r border-border-subtle bg-surface p-6 shadow-[1px_0_12px_rgba(0,0,0,0.35)] md:flex"
			aria-label="Sidebar navigation"
		>
			<div className="flex flex-col gap-6">
				<ShellNavItems />
			</div>
			<div className="mt-6">
				<ShellUserCard />
			</div>
		</aside>
	);
}
