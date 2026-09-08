import { useEffect, useRef, useState, type MouseEvent } from 'react';
import type { FeedMedia, FeedPost } from '@/domain/feed-types';
import { cn } from '@/lib/cn';
import { IconDownload, IconPlay } from '@/components/feed/icons';

type PostMediaProps = {
	post: FeedPost;
	variant?: 'feed' | 'detail';
};

type LightboxMedia = Extract<FeedMedia, { kind: 'image' | 'video' }>;

function MediaLightbox({ media, onClose }: { media: LightboxMedia; onClose: () => void }) {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') onClose();
		}
		document.addEventListener('keydown', handleKeyDown);
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = '';
		};
	}, [onClose]);

	function enterFullscreen() {
		void videoRef.current?.requestFullscreen?.();
	}

	return (
		<div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Full-screen media" onClick={onClose}>
			<button type="button" className="absolute inset-0 cursor-default" aria-label="Close full-screen media" onClick={onClose} />
			<div className="relative z-10 flex max-h-full max-w-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
				{media.kind === 'video' ? (
					<div className="relative max-h-[90vh] max-w-[95vw]">
						<video ref={videoRef} src={media.imageUrl} aria-label={media.alt} className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain" controls autoPlay playsInline />
						<button type="button" className="absolute right-3 top-3 rounded-lg border border-white/20 bg-black/70 px-3 py-1.5 text-caption text-white hover:bg-black/90" onClick={enterFullscreen}>Full screen</button>
					</div>
				) : (
					<img src={media.imageUrl} alt={media.alt} className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain" />
				)}
				<button type="button" className="absolute -right-2 -top-12 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-xl text-white hover:bg-black/90 sm:-right-12 sm:top-0" aria-label="Close full-screen media" onClick={onClose}>×</button>
			</div>
		</div>
	);
}

export function PostMedia({ post, variant = 'feed' }: PostMediaProps) {
	const [isOpen, setIsOpen] = useState(false);

	if (!post.media) {
		return null;
	}

	const isFeed = variant === 'feed';
	const openMedia = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		setIsOpen(true);
	};
	const closeMedia = () => setIsOpen(false);

	if (post.media.kind === 'video') {
		return (
			<>
			<div
				className={cn(
					'group relative w-full overflow-hidden rounded-xl border border-border-subtle/80 bg-surface-subtle/60',
					isFeed ? 'aspect-[16/10]' : 'aspect-video',
				)}
				onClick={openMedia}
				onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); setIsOpen(true); } }}
				role="button"
				tabIndex={0}
				aria-label={`Play ${post.media.alt}`}
			>
				<video
					src={post.media.imageUrl}
					aria-label={post.media.alt}
					muted
					playsInline
					preload="metadata"
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/10" />
				<div className="absolute right-3 top-3 flex items-center gap-1 rounded-md border border-border-subtle/80 bg-background/75 px-2 py-0.5 text-caption font-medium text-text-primary backdrop-blur-md">
					<span className="text-primary">♪</span>
					{post.media.duration}
				</div>
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="flex size-12 items-center justify-center rounded-full border border-border-subtle/80 bg-background/80 p-3 text-primary shadow-xl backdrop-blur-md transition-all duration-200 group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary">
						<IconPlay className="ml-0.5 size-6" />
					</div>
				</div>
				{!isFeed ? (
					<div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-[11px] text-text-muted">
						{post.media.overlayLeft ? (
							<span className="rounded bg-surface-overlay/85 px-2 py-0.5 font-mono text-text-primary">
								{post.media.overlayLeft}
							</span>
						) : null}
						{post.media.overlayRight ? (
							<span className="text-text-secondary">{post.media.overlayRight}</span>
						) : null}
					</div>
				) : null}
			</div>
			{isOpen ? <MediaLightbox media={post.media} onClose={closeMedia} /> : null}
			</>
		);
	}

	if (post.media.kind === 'image') {
		return (
			<>
			<div
				className={cn(
					'group relative w-full overflow-hidden rounded-xl border border-border-subtle/80 bg-surface-subtle/60',
					isFeed ? 'aspect-[16/10]' : 'aspect-video',
				)}
				onClick={openMedia}
				onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); setIsOpen(true); } }}
				role="button"
				tabIndex={0}
				aria-label={`Open ${post.media.alt} full screen`}
			>
				<img
					src={post.media.imageUrl}
					alt={post.media.alt}
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
				/>
				{!isFeed && post.media.caption ? (
					<div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded border border-border-subtle bg-background/85 px-2.5 py-1 text-caption text-text-primary backdrop-blur-sm">
						<span className="text-primary">◉</span>
						{post.media.caption}
					</div>
				) : null}
			</div>
			{isOpen ? <MediaLightbox media={post.media} onClose={closeMedia} /> : null}
			</>
		);
	}

	if (post.media.kind === 'diagram') {
		if (isFeed) {
			return (
				<div className="rounded-xl border border-border-subtle/80 bg-surface-subtle/60 p-3">
					<div className="flex items-center gap-2 font-mono text-caption text-text-secondary">
						<span className="size-2 rounded-full bg-secondary" />
						<span className="truncate">{post.media.title}</span>
					</div>
					<div className="mt-2 h-12 rounded-lg border border-dashed border-border-default bg-surface-subtle/80" />
				</div>
			);
		}

		return (
			<div className="rounded-xl border border-border-subtle/80 bg-surface-subtle/60 p-3">
				<div className="mb-2 flex items-center justify-between border-b border-border-subtle pb-2 font-mono text-caption text-text-faint">
					<span className="flex items-center gap-1.5">
						<span className="size-2 rounded-full bg-secondary" />
						{post.media.title}
					</span>
					<span>{post.media.subtitle}</span>
				</div>
				<div className="relative flex h-16 w-full flex-col justify-around rounded bg-surface-subtle px-2 py-1 font-mono text-[11px]">
					<div className="flex items-center gap-2">
						<span className="w-8 shrink-0 text-secondary">SCL</span>
						<div className="flex h-3 flex-1 items-center">
							<div className="h-0.5 w-full border-b border-t border-dashed border-secondary bg-secondary/70" />
						</div>
						<span className="text-[10px] text-text-faint">{post.media.sclLabel}</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="w-8 shrink-0 text-error">SDA</span>
						<div className="flex h-3 flex-1 items-center">
							<div className="h-0.5 w-2/3 bg-error" />
							<div className="h-2 w-1/3 border-b border-l border-error pl-1 text-[9px] text-error">
								HELD LOW BY SLAVE
							</div>
						</div>
						<span className="text-[10px] text-error">{post.media.sdaLabel}</span>
					</div>
				</div>
				<div className="mt-2 flex items-center justify-between text-[11px] text-text-muted">
					<span>{post.media.footerLeft}</span>
					<button
						type="button"
						className="flex items-center gap-0.5 text-secondary hover:underline"
					>
						{post.media.footerLink}
					</button>
				</div>
			</div>
		);
	}

	if (isFeed) {
		return (
			<div className="flex items-center gap-3 rounded-xl border border-border-subtle/80 bg-surface-subtle/60 p-3">
				<span className="text-xl text-primary">▣</span>
				<div className="min-w-0">
					<p className="truncate text-label-md font-medium text-text-primary">
						{post.media.fileName}
					</p>
					<p className="truncate text-caption text-text-muted">{post.media.fileMeta}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2.5 rounded-xl border border-border-subtle/80 bg-surface-subtle/60 p-3">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<div className="flex items-center gap-2">
					<span className="text-xl text-primary">▣</span>
					<div>
						<p className="text-label-md font-medium text-text-primary">
							{post.media.fileName}
						</p>
						<p className="text-caption text-text-muted">{post.media.fileMeta}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<button
						type="button"
						className="flex h-7 items-center gap-1 rounded-lg border border-border-subtle bg-surface-subtle px-3 text-caption text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
					>
						GitHub Repo
					</button>
					<button
						type="button"
						className="flex h-7 items-center gap-1 rounded-lg bg-primary px-3 text-caption font-bold text-on-primary transition-colors hover:bg-primary-hover"
					>
						<IconDownload className="size-3.5" />
						Get Script
					</button>
				</div>
			</div>
			<pre className="overflow-x-auto rounded border border-border-subtle bg-surface-subtle p-2.5 font-mono text-[12px] leading-relaxed text-text-secondary">
				{post.media.codeSnippet}
			</pre>
		</div>
	);
}
