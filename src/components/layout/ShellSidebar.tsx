import { ShellNavItems, ShellUserCard } from '@/components/layout/ShellNavItems';

export function ShellSidebar() {
	return (
		<aside
			className="hidden h-full w-64 shrink-0 flex-col justify-between overflow-y-auto border-r border-border-subtle bg-surface p-6 shadow-[1px_0_12px_rgba(0,0,0,0.35)] md:flex"
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
