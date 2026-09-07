import { useState } from 'react';

import type { PostType } from '@/domain/feed-types';
import type { FeedAuthor } from '@/domain/feed-types';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { IconSend } from '@/components/feed/icons';

type FeedComposerProps = {
	currentUser: FeedAuthor;
	onPublish?: () => void;
};

const POST_TYPES: Array<{ id: PostType; label: string; tabClass?: string }> = [
	{ id: 'update', label: 'Update' },
	{ id: 'question', label: 'Question', tabClass: 'hover:text-secondary' },
	{ id: 'resource', label: 'Resource', tabClass: 'hover:text-primary' },
	{ id: 'milestone', label: 'Milestone', tabClass: 'hover:text-accent-warm' },
];

const PLACEHOLDERS: Record<PostType, string> = {
	update:
		'What are you making or figuring out today? Share a devlog, ask a question, or post a resource...',
	question: 'What are you stuck on? Describe the problem and what you have tried so far...',
	resource: 'Describe the resource you are sharing — script, asset pack, template, or tool...',
	milestone: 'Share a milestone — alpha build, first prototype, release candidate, or launch...',
};

const PUBLISH_LABELS: Record<PostType, string> = {
	update: 'Publish Update',
	question: 'Ask Question',
	resource: 'Share Resource',
	milestone: 'Post Milestone',
};

export function FeedComposer({ currentUser, onPublish }: FeedComposerProps) {
	const [postType, setPostType] = useState<PostType>('update');
	const [body, setBody] = useState('');
	const [aiAssisted, setAiAssisted] = useState(false);

	function handlePublish() {
		setBody('');
		setAiAssisted(false);
		onPublish?.();
	}

	return (
		<div aria-label="Create post">
			<div className="mb-3 flex items-center justify-between gap-2 border-b border-border-subtle pb-2">
				<div
					className="flex items-center gap-1 rounded-lg border border-border-subtle bg-surface-subtle p-0.5"
					role="tablist"
					aria-label="Post type"
				>
					{POST_TYPES.map((type) => (
						<button
							key={type.id}
							type="button"
							role="tab"
							aria-selected={postType === type.id}
							className={cn(
								'rounded-md px-2.5 py-1 text-caption font-semibold transition-colors',
								postType === type.id
									? 'bg-surface-raised text-text-primary shadow-sm'
									: cn('text-text-muted', type.tabClass),
							)}
							onClick={() => setPostType(type.id)}
						>
							{type.label}
						</button>
					))}
				</div>
				<span className="text-[11px] text-text-faint">
					Logged as @{currentUser.handle}
				</span>
			</div>

			<div className="flex items-start gap-3">
				<Avatar
					src={currentUser.avatarUrl}
					alt={currentUser.displayName}
					fallback={currentUser.displayName.charAt(0)}
				/>
				<label className="min-w-0 flex-1">
					<span className="sr-only">Post content</span>
					<textarea
						value={body}
						onChange={(event) => setBody(event.target.value)}
						placeholder={PLACEHOLDERS[postType]}
						rows={2}
						className="w-full resize-none rounded-xl border border-border-subtle bg-surface-subtle p-3 text-body-md text-text-primary transition-all placeholder:text-text-faint focus:border-border-default focus:outline-none"
					/>
				</label>
			</div>

			<div className="mt-3 flex flex-col gap-4 border-t border-border-subtle/50 pt-2 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
				<div className="flex flex-wrap items-center gap-1.5">
					<button
						type="button"
						className="flex h-8 items-center gap-1.5 rounded-lg border border-border-subtle bg-surface-subtle px-2.5 text-[12px] text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
					>
						<span className="text-primary">+</span>
						Attach Media
						<span className="rounded bg-surface-raised px-1 py-0.5 text-[10px] text-text-faint">
							Max 60s video
						</span>
					</button>
					<button
						type="button"
						className="flex h-8 items-center gap-1 rounded-lg border border-border-subtle bg-surface-subtle px-2.5 text-[12px] text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
					>
						<span className="text-secondary">▣</span>
						Link Project...
					</button>
					<button
						type="button"
						className="flex h-8 items-center gap-1 rounded-lg border border-border-subtle bg-surface-subtle px-2.5 text-[12px] text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
					>
						<span className="text-accent-warm">◎</span>
						Share to community...
					</button>
				</div>

				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<label className="flex cursor-pointer select-none items-center gap-1.5 text-[12px] text-text-muted hover:text-text-secondary">
						<input
							type="checkbox"
							checked={aiAssisted}
							onChange={(event) => setAiAssisted(event.target.checked)}
							className="size-3.5 rounded border-border-strong bg-surface-subtle text-primary focus:ring-0 focus:ring-offset-0"
						/>
						Contains AI-assisted work
					</label>
					<Button
						type="button"
						className="h-9 gap-1.5 px-4 font-bold shadow-sm active:scale-95"
						onClick={handlePublish}
					>
						{PUBLISH_LABELS[postType]}
						<IconSend className="size-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
