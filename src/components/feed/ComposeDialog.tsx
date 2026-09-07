import { useEffect } from 'react';

import { MOCK_CURRENT_USER } from '@/data/feed-mock';
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
			className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6"
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
					'relative flex max-h-[min(100dvh,48rem)] w-full flex-col overflow-hidden border-border-subtle bg-surface shadow-2xl',
					'rounded-t-2xl border-t md:max-w-2xl md:rounded-2xl md:border',
				)}
			>
				<header className="flex shrink-0 items-center justify-between gap-3 border-b border-border-subtle px-4 py-3 md:px-5">
					<h2 id="compose-dialog-title" className="text-headline-sm font-bold text-text-primary">
						New Post
					</h2>
					<button
						type="button"
						className="flex size-9 items-center justify-center rounded-xl border border-border-subtle bg-surface-raised text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
						aria-label="Close composer"
						onClick={onClose}
					>
						<IconClose className="size-[18px]" />
					</button>
				</header>
				<div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain p-4 md:p-5">
					<FeedComposer
						currentUser={MOCK_CURRENT_USER}
						onPublish={onClose}
					/>
				</div>
			</div>
		</div>
	);
}
