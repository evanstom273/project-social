import type { FeedMedia, FeedPost, MediaFilter, PostType } from '@/domain/feed-types';
import type { ComposePublishInput } from '@/domain/compose-publish';
import { getProjectById, toFeedProject } from './project-store';

import { localDb, type PublishedPostRecord } from './db';

const TYPE_BADGES: Record<PostType, string> = {
	update: 'Update',
	question: 'Question',
	resource: 'Resource',
	milestone: 'Milestone',
};

function normalizeHandle(value: string) {
	const normalized = value.trim().replace(/^@/, '').replace(/\s+/g, '_').toLowerCase();
	return normalized || 'anonymous';
}

function parseTags(tagsInput: string) {
	return tagsInput
		.split(',')
		.map((tag) => tag.trim())
		.filter(Boolean);
}

function buildMediaFromBlob(
	blob: Blob,
	fileName: string,
	mimeType: string,
): { media: FeedMedia; mediaFilter: MediaFilter } {
	const imageUrl = URL.createObjectURL(blob);

	if (mimeType.startsWith('video/')) {
		return {
			media: {
				kind: 'video',
				imageUrl,
				alt: fileName,
				duration: '0:00',
			},
			mediaFilter: 'video',
		};
	}

	return {
		media: {
			kind: 'image',
			imageUrl,
			alt: fileName,
		},
		mediaFilter: 'images',
	};
}

function hydratePostMedia(record: PublishedPostRecord): FeedPost {
	if (!record.mediaBlob || !record.mediaMimeType || !record.mediaFileName) {
		return record.post;
	}

	const { media } = buildMediaFromBlob(
		record.mediaBlob,
		record.mediaFileName,
		record.mediaMimeType,
	);

	return {
		...record.post,
		media,
	};
}

async function buildFeedPost(input: ComposePublishInput, createdAt: string): Promise<PublishedPostRecord> {
	const handle = normalizeHandle(input.username);
	const displayName = input.username.trim() || handle;
	const project = input.projectId ? await getProjectById(input.projectId) : undefined;
	const tags = parseTags(input.tagsInput);
	const id = crypto.randomUUID();

	let media: FeedMedia | undefined;
	let mediaFilter: MediaFilter = 'code';

	if (input.mediaFile) {
		const built = buildMediaFromBlob(
			input.mediaFile,
			input.mediaFile.name,
			input.mediaFile.type,
		);
		media = built.media;
		mediaFilter = built.mediaFilter;
	}

	const post: FeedPost = {
		id,
		type: input.postType,
		project: project ? toFeedProject(project) : null,
		author: {
			id: `local-author-${handle}`,
			displayName,
			handle,
			avatarUrl: null,
		},
		postedAgo: 'just now',
		body: input.body.trim(),
		title: input.title.trim() || undefined,
		badge: TYPE_BADGES[input.postType],
		tags,
		media,
		likes: 0,
		comments: 0,
		mediaFilter,
	};

	return {
		id,
		createdAt,
		type: input.postType,
		post: {
			...post,
			media: undefined,
		},
		projectId: project?.id ?? null,
		mediaBlob: input.mediaFile,
		mediaMimeType: input.mediaFile?.type,
		mediaFileName: input.mediaFile?.name,
	};
}

export async function savePublishedPost(input: ComposePublishInput): Promise<FeedPost> {
	const createdAt = new Date().toISOString();
	const record = await buildFeedPost(input, createdAt);
	await localDb.publishedPosts.put(record);
	return hydratePostMedia(record);
}

export async function listPublishedPosts(): Promise<FeedPost[]> {
	const records = await localDb.publishedPosts.orderBy('createdAt').reverse().toArray();
	const projects = new Map((await localDb.projects.toArray()).map((project) => [project.id, toFeedProject(project)]));
	return records.map((record) => hydratePostMedia({ ...record, post: { ...record.post, project: record.projectId ? projects.get(record.projectId) ?? null : null } }));
}

export async function getPublishedPostById(postId: string): Promise<FeedPost | undefined> {
	const record = await localDb.publishedPosts.get(postId);
	if (!record) {
		return undefined;
	}

	const project = record.projectId ? await getProjectById(record.projectId) : undefined;
	return hydratePostMedia({ ...record, post: { ...record.post, project: project ? toFeedProject(project) : null } });
}

export async function listPublishedPostsForProject(projectId: string): Promise<FeedPost[]> {
	const records = (await localDb.publishedPosts.where('projectId').equals(projectId).toArray()).sort((left, right) => right.createdAt.localeCompare(left.createdAt));
	return records.map(hydratePostMedia);
}

export async function clearPublishedPosts(): Promise<void> {
	await localDb.publishedPosts.clear();
}
