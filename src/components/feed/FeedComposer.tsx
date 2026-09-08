import { useEffect, useState } from 'react';

import type { PostType } from '@/domain/feed-types';
import { MAX_VIDEO_DURATION_SECONDS } from '@/config/constants';
import { useFeedPosts } from '@/app/providers/use-feed-posts';
import { useProjects } from '@/app/providers/use-projects';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { IconClose, IconPlay, IconSend } from '@/components/feed/icons';

type FeedComposerProps = {
	onPublish?: () => void;
};

type AttachedMedia = {
	file: File;
	previewUrl: string;
	kind: 'image' | 'video';
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

async function readVideoDurationSeconds(file: File): Promise<number> {
	return new Promise((resolve, reject) => {
		const video = document.createElement('video');
		const url = URL.createObjectURL(file);

		video.preload = 'metadata';
		video.onloadedmetadata = () => {
			URL.revokeObjectURL(url);
			resolve(Number.isFinite(video.duration) ? video.duration : 0);
		};
		video.onerror = () => {
			URL.revokeObjectURL(url);
			reject(new Error('Could not read video metadata'));
		};
		video.src = url;
	});
}

export function FeedComposer({ onPublish }: FeedComposerProps) {
	const { publishPost } = useFeedPosts();
	const { projects } = useProjects();
	const [postType, setPostType] = useState<PostType>('update');
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [tagsInput, setTagsInput] = useState('');
	const [projectName, setProjectName] = useState('');
	const [projectId, setProjectId] = useState<string | null>(null);
	const [communityName, setCommunityName] = useState('');
	const [attachedMedia, setAttachedMedia] = useState<AttachedMedia | null>(null);
	const [mediaError, setMediaError] = useState<string | null>(null);
	const [publishError, setPublishError] = useState<string | null>(null);
	const [aiAssisted, setAiAssisted] = useState(false);
	const [isPublishing, setIsPublishing] = useState(false);

	useEffect(() => {
		return () => {
			if (attachedMedia) {
				URL.revokeObjectURL(attachedMedia.previewUrl);
			}
		};
	}, [attachedMedia]);

	function clearAttachedMedia() {
		setAttachedMedia((current) => {
			if (current) {
				URL.revokeObjectURL(current.previewUrl);
			}
			return null;
		});
		setMediaError(null);
	}

	async function handleMediaSelection(fileList: FileList | null) {
		const file = fileList?.[0];
		if (!file) {
			return;
		}

		setMediaError(null);

		if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
			setMediaError('Choose an image or video file.');
			return;
		}

		if (file.type.startsWith('video/')) {
			try {
				const durationSeconds = await readVideoDurationSeconds(file);
				if (durationSeconds > MAX_VIDEO_DURATION_SECONDS) {
					setMediaError(`Video must be ${MAX_VIDEO_DURATION_SECONDS} seconds or shorter.`);
					return;
				}
			} catch {
				setMediaError('Could not read that video file.');
				return;
			}
		}

		clearAttachedMedia();
		setAttachedMedia({
			file,
			previewUrl: URL.createObjectURL(file),
			kind: file.type.startsWith('video/') ? 'video' : 'image',
		});
	}

	function resetForm() {
		setTitle('');
		setBody('');
		setTagsInput('');
		setProjectName('');
		setProjectId(null);
		clearAttachedMedia();
		setAiAssisted(false);
		setPublishError(null);
	}

	async function handlePublish() {
		if (!body.trim() && !title.trim()) {
			setPublishError('Add a title or description before publishing.');
			return;
		}

		setPublishError(null);
		setIsPublishing(true);

		try {
			await publishPost({
				postType,
				title,
				body,
				tagsInput,
				projectName,
				projectId,
				communityName: '',
				aiAssisted,
				mediaFile: attachedMedia?.file,
			});

			resetForm();
			onPublish?.();
		} catch {
			setPublishError('Could not publish this post locally. Try again.');
		} finally {
			setIsPublishing(false);
		}
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

					{attachedMedia ? (
						<div className="relative overflow-hidden rounded-xl border border-border-subtle bg-surface">
							{attachedMedia.kind === 'image' ? (
								<img
									src={attachedMedia.previewUrl}
									alt={attachedMedia.file.name}
									className="max-h-72 w-full object-cover"
								/>
							) : (
								<div className="relative">
									<video
										src={attachedMedia.previewUrl}
										className="max-h-72 w-full bg-black object-contain"
										controls
										playsInline
									/>
									<div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1 rounded-md border border-border-subtle/80 bg-background/80 px-2 py-0.5 text-caption text-text-primary backdrop-blur-sm">
										<IconPlay className="size-3.5 text-primary" />
										Video
									</div>
								</div>
							)}
							<div className="flex items-center justify-between gap-3 border-t border-border-subtle px-3 py-2">
								<p className="truncate text-body-sm text-text-secondary">
									{attachedMedia.file.name}
								</p>
								<button
									type="button"
									className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border-subtle text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary"
									aria-label="Remove attachment"
									onClick={clearAttachedMedia}
								>
									<IconClose className="size-4" />
								</button>
							</div>
						</div>
					) : (
						<label className="flex min-h-[8rem] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface px-4 py-6 text-center transition-colors hover:border-primary/40 hover:bg-surface-hover/40">
							<span className="text-2xl text-primary">+</span>
							<span className="text-body-sm font-medium text-text-secondary">
								Choose images or video
							</span>
							<span className="text-caption text-text-faint">
								Drag and drop or tap to browse
							</span>
							<input
								type="file"
								accept="image/*,video/*"
								className="sr-only"
								onChange={(event) => {
									void handleMediaSelection(event.target.files);
									event.target.value = '';
								}}
							/>
						</label>
					)}

					{mediaError ? (
						<p className="mt-3 text-body-sm text-error">{mediaError}</p>
					) : null}
				</section>

				<div className="grid gap-3 sm:grid-cols-2">
					<label className="block">
						<span className="mb-1.5 block text-label-md font-medium text-text-primary">
							Link project
						</span>
						<select
							value={projectId ?? ''}
							onChange={(event) => { const id = event.target.value || null; setProjectId(id); setProjectName(projects.find((project) => project.id === id)?.name ?? ''); }}
							className="h-11 w-full rounded-xl border border-border-subtle bg-surface-subtle px-3 text-body-md text-text-primary placeholder:text-text-faint focus:border-primary focus:outline-none"
						>
							<option value="">No project (standalone post)</option>
							{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
						</select>
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

				{publishError ? <p className="text-body-sm text-error">{publishError}</p> : null}
			</div>

			<div className="shrink-0 border-t border-border-subtle bg-surface-overlay/80 pt-4 backdrop-blur-sm">
				<Button
					type="button"
					disabled={isPublishing}
					className="h-11 w-full gap-2 px-4 text-label-md font-bold shadow-sm active:scale-[0.99] sm:w-auto"
					onClick={() => void handlePublish()}
				>
					{isPublishing ? 'Publishing…' : PUBLISH_LABELS[postType]}
					<IconSend className="size-4" />
				</Button>
			</div>
		</div>
	);
}
