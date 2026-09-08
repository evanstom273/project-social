import { useEffect } from 'react';

import { FeedComposer } from '@/components/feed/FeedComposer';
import { IconClose } from '@/components/feed/icons';
import { cn } from '@/lib/cn';

type ComposeDialogProps = {
	open: boolean;
	onClose: () => void;
};

export function ComposeDialog({ open, onClose }: ComposeDialogProps) {
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
		<div
			className="fixed inset-0 z-50 flex flex-col md:items-center md:justify-center md:p-6 lg:p-8"
			role="dialog"
			aria-modal="true"
			aria-labelledby="compose-dialog-title"
		>
			<button
				type="button"
				className="absolute inset-0 bg-scrim"
				aria-label="Close composer"
				onClick={onClose}
			/>
			<div
				className={cn(
					'panel-solid relative flex h-[100dvh] w-full flex-col overflow-hidden border shadow-2xl',
					'md:h-auto md:max-h-[min(94dvh,56rem)] md:min-h-[min(78dvh,44rem)]',
					'md:max-w-3xl md:rounded-2xl lg:max-w-4xl',
				)}
			>
				<header className="flex shrink-0 items-center justify-between gap-3 border-b border-border-subtle px-4 py-3.5 md:px-6">
					<h2 id="compose-dialog-title" className="text-headline-sm font-bold text-text-primary">
						New Post
					</h2>
					<button
						type="button"
						className="flex size-10 items-center justify-center rounded-xl border border-border-subtle bg-surface-raised text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
						aria-label="Close composer"
						onClick={onClose}
					>
						<IconClose className="size-[18px]" />
					</button>
				</header>
				<div className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 md:px-6 md:pb-6 md:pt-5">
					<FeedComposer onPublish={onClose} />
				</div>
			</div>
		</div>
	);
}
