import { useState } from 'react';

import type { PostType } from '@/domain/feed-types';
import { MAX_VIDEO_DURATION_SECONDS } from '@/config/constants';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { IconSend } from '@/components/feed/icons';

type FeedComposerProps = {
	onPublish?: () => void;
};

const POST_TYPES: Array<{ id: PostType; label: string; tabClass?: string }> = [
	{ id: 'update', label: 'Update' },
	{ id: 'question', label: 'Question', tabClass: 'hover:text-secondary' },
	{ id: 'resource', label: 'Resource', tabClass: 'hover:text-primary' },
	{ id: 'milestone', label: 'Milestone', tabClass: 'hover:text-accent-warm' },
];

const PLACEHOLDERS: Record<PostType, string> = {
	update: 'What are you making or figuring out today? Share progress, process, or context…',
	question: 'What are you stuck on? Describe the problem and what you have tried so far…',
	resource: 'Describe the resource you are sharing — script, asset pack, template, or tool…',
	milestone: 'Share a milestone — alpha build, first prototype, release candidate, or launch…',
};

const TITLE_PLACEHOLDERS: Record<PostType, string> = {
	update: 'Optional headline for this update',
	question: 'Question title',
	resource: 'Resource name',
	milestone: 'Milestone name',
};

const PUBLISH_LABELS: Record<PostType, string> = {
	update: 'Publish Update',
	question: 'Ask Question',
	resource: 'Share Resource',
	milestone: 'Post Milestone',
};

const USERNAME_STORAGE_KEY = 'project-social:compose-username';

function readStoredUsername() {
	return sessionStorage.getItem(USERNAME_STORAGE_KEY) ?? '';
}

function normalizeHandle(value: string) {
	return value.trim().replace(/^@/, '').replace(/\s+/g, '_').toLowerCase();
}

export function FeedComposer({ onPublish }: FeedComposerProps) {
	const [postType, setPostType] = useState<PostType>('update');
	const [username, setUsername] = useState(readStoredUsername);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [tagsInput, setTagsInput] = useState('');
	const [projectName, setProjectName] = useState('');
	const [communityName, setCommunityName] = useState('');
	const [attachedMediaLabel, setAttachedMediaLabel] = useState<string | null>(null);
	const [aiAssisted, setAiAssisted] = useState(false);

	const handle = normalizeHandle(username);
	const displayHandle = handle ? `@${handle}` : '@your_handle';

	function handlePublish() {
		if (username.trim()) {
			sessionStorage.setItem(USERNAME_STORAGE_KEY, username.trim());
		}

		setTitle('');
		setBody('');
		setTagsInput('');
		setProjectName('');
		setCommunityName('');
		setAttachedMediaLabel(null);
		setAiAssisted(false);
		onPublish?.();
	}

	return (
		<div className="flex min-h-0 flex-1 flex-col" aria-label="Create post">
			<div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-y-contain pb-4">
				<div
					className="flex gap-1 overflow-x-auto rounded-xl border border-border-subtle bg-surface-subtle p-1"
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
								'min-h-10 shrink-0 rounded-lg px-3 py-2 text-label-md font-semibold transition-colors',
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

				<section className="rounded-xl border border-border-subtle bg-surface-subtle/70 p-4">
					<p className="mb-3 text-label-sm text-text-faint">Posting identity</p>
					<p className="mb-3 text-body-sm text-text-muted">
						No accounts yet — set a temporary name for this post. It is not saved to a profile.
					</p>
					<div className="grid gap-3 sm:grid-cols-2">
						<label className="block">
							<span className="mb-1.5 block text-caption font-medium text-text-secondary">
								Username
							</span>
							<input
								type="text"
								value={username}
								onChange={(event) => setUsername(event.target.value)}
								placeholder="e.g. maker_alex"
								autoComplete="off"
								className="h-11 w-full rounded-xl border border-border-subtle bg-surface px-3 text-body-md text-text-primary placeholder:text-text-faint focus:border-primary focus:outline-none"
							/>
						</label>
						<div className="flex flex-col justify-end">
							<p className="mb-1.5 text-caption font-medium text-text-secondary">Preview</p>
							<p className="rounded-xl border border-border-subtle/70 bg-surface px-3 py-2.5 text-body-md text-text-primary">
								{displayHandle}
							</p>
						</div>
					</div>
				</section>

				<label className="block">
					<span className="mb-1.5 block text-label-md font-medium text-text-primary">
						Title
						<span className="ml-1 text-caption font-normal text-text-faint">
							{postType === 'question' ? 'recommended' : 'optional'}
						</span>
					</span>
					<input
						type="text"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						placeholder={TITLE_PLACEHOLDERS[postType]}
						className="h-11 w-full rounded-xl border border-border-subtle bg-surface-subtle px-3 text-body-md text-text-primary placeholder:text-text-faint focus:border-primary focus:outline-none"
					/>
				</label>

				<label className="block">
					<span className="mb-1.5 block text-label-md font-medium text-text-primary">
						Description
					</span>
					<textarea
						value={body}
						onChange={(event) => setBody(event.target.value)}
						placeholder={PLACEHOLDERS[postType]}
						rows={8}
						className="min-h-[12rem] w-full resize-y rounded-xl border border-border-subtle bg-surface-subtle px-3 py-3 text-body-md leading-relaxed text-text-primary placeholder:text-text-faint focus:border-primary focus:outline-none sm:min-h-[14rem]"
					/>
				</label>

				<label className="block">
					<span className="mb-1.5 block text-label-md font-medium text-text-primary">
						Tags
					</span>
					<input
						type="text"
						value={tagsInput}
						onChange={(event) => setTagsInput(event.target.value)}
						placeholder="GameDev, Blender3D, Hardware — comma separated"
						className="h-11 w-full rounded-xl border border-border-subtle bg-surface-subtle px-3 text-body-md text-text-primary placeholder:text-text-faint focus:border-primary focus:outline-none"
					/>
				</label>

				<section className="rounded-xl border border-dashed border-border-default bg-surface-subtle/50 p-4">
					<div className="mb-3 flex flex-wrap items-center justify-between gap-2">
						<div>
							<p className="text-label-md font-medium text-text-primary">Attach media</p>
							<p className="text-caption text-text-muted">
								Images, galleries, or video up to {MAX_VIDEO_DURATION_SECONDS} seconds.
							</p>
						</div>
						<span className="rounded-full bg-surface-raised px-2 py-0.5 text-[11px] text-text-faint">
							Max {MAX_VIDEO_DURATION_SECONDS}s video
						</span>
					</div>
					<label className="flex min-h-[8rem] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface px-4 py-6 text-center transition-colors hover:border-primary/40 hover:bg-surface-hover/40">
						<span className="text-2xl text-primary">+</span>
						<span className="text-body-sm font-medium text-text-secondary">
							Choose images or video
						</span>
						<span className="text-caption text-text-faint">
							Drag and drop or tap to browse (mock — not uploaded yet)
						</span>
						<input
							type="file"
							accept="image/*,video/*"
							className="sr-only"
							onChange={(event) => {
								const file = event.target.files?.[0];
								setAttachedMediaLabel(file ? file.name : null);
							}}
						/>
					</label>
					{attachedMediaLabel ? (
						<p className="mt-3 text-body-sm text-primary">
							Selected: {attachedMediaLabel}
						</p>
					) : null}
				</section>

				<div className="grid gap-3 sm:grid-cols-2">
					<label className="block">
						<span className="mb-1.5 block text-label-md font-medium text-text-primary">
							Link project
						</span>
						<input
							type="text"
							value={projectName}
							onChange={(event) => setProjectName(event.target.value)}
							placeholder="Project name or slug"
							className="h-11 w-full rounded-xl border border-border-subtle bg-surface-subtle px-3 text-body-md text-text-primary placeholder:text-text-faint focus:border-primary focus:outline-none"
						/>
					</label>
					<label className="block">
						<span className="mb-1.5 block text-label-md font-medium text-text-primary">
							Share to community
						</span>
						<input
							type="text"
							value={communityName}
							onChange={(event) => setCommunityName(event.target.value)}
							placeholder="Community name"
							className="h-11 w-full rounded-xl border border-border-subtle bg-surface-subtle px-3 text-body-md text-text-primary placeholder:text-text-faint focus:border-primary focus:outline-none"
						/>
					</label>
				</div>

				<label className="flex cursor-pointer select-none items-center gap-2 rounded-xl border border-border-subtle/70 bg-surface-subtle/50 px-3 py-3 text-body-sm text-text-muted">
					<input
						type="checkbox"
						checked={aiAssisted}
						onChange={(event) => setAiAssisted(event.target.checked)}
						className="size-4 rounded border-border-strong bg-surface-subtle text-primary focus:ring-0 focus:ring-offset-0"
					/>
					Contains AI-assisted work
				</label>
			</div>

			<div className="shrink-0 border-t border-border-subtle bg-surface-overlay/80 pt-4 backdrop-blur-sm">
				<Button
					type="button"
					className="h-11 w-full gap-2 px-4 text-label-md font-bold shadow-sm active:scale-[0.99] sm:w-auto"
					onClick={handlePublish}
				>
					{PUBLISH_LABELS[postType]}
					<IconSend className="size-4" />
				</Button>
			</div>
		</div>
	);
}
