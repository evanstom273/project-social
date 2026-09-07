import { useEffect } from 'react';

import { ShellNavItems, ShellUserCard } from '@/components/layout/ShellNavItems';

type ShellMobileDrawerProps = {
	open: boolean;
	onClose: () => void;
};

export function ShellMobileDrawer({ open, onClose }: ShellMobileDrawerProps) {
	useEffect(() => {
		if (!open) {
			return;
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				onClose();
			}
		}

		document.body.style.overflow = 'hidden';
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.body.style.overflow = '';
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [open, onClose]);

	if (!open) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
			<button
				type="button"
				className="absolute inset-0 bg-scrim"
				aria-label="Close navigation menu"
				onClick={onClose}
			/>
			<div className="absolute inset-y-0 left-0 flex w-[min(20rem,88vw)] flex-col justify-between border-r border-border-subtle bg-surface p-6 shadow-[1px_0_12px_rgba(0,0,0,0.35)]">
				<div className="flex flex-col gap-6 overflow-y-auto">
					<ShellNavItems onNavigate={onClose} />
				</div>
				<div className="mt-6 space-y-4">
					<ShellUserCard />
				</div>
			</div>
		</div>
	);
}
