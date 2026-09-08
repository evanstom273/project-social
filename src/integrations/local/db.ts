import Dexie, { type EntityTable } from 'dexie';

import type { FeedPost, PostType } from '@/domain/feed-types';
import type { DraftPost, Project } from '@/domain/types';

type DraftRecord = DraftPost;

type CacheMetaRecord = {
  key: string;
  updatedAt: string;
  version: number;
};

export type PublishedPostRecord = {
	id: string;
	createdAt: string;
	type: PostType;
	post: FeedPost;
	projectId?: string | null;
	mediaBlob?: Blob;
	mediaMimeType?: string;
	mediaFileName?: string;
};

export type LocalProjectRecord = Project & {
	avatarBlob?: Blob;
	avatarMimeType?: string;
	avatarFileName?: string;
	coverBlob?: Blob;
	coverMimeType?: string;
	coverFileName?: string;
};

class ProjectSocialLocalDb extends Dexie {
  drafts!: EntityTable<DraftRecord, 'id'>;
  cacheMeta!: EntityTable<CacheMetaRecord, 'key'>;
  publishedPosts!: EntityTable<PublishedPostRecord, 'id'>;
  projects!: EntityTable<LocalProjectRecord, 'id'>;

  constructor() {
    super('project-social');

    this.version(1).stores({
      drafts: 'id, updatedAt, projectId',
      cacheMeta: 'key, updatedAt',
    });

    this.version(2).stores({
      drafts: 'id, updatedAt, projectId',
      cacheMeta: 'key, updatedAt',
      publishedPosts: 'id, createdAt, type',
    });

	this.version(3).stores({
		drafts: 'id, updatedAt, projectId',
		cacheMeta: 'key, updatedAt',
		publishedPosts: 'id, createdAt, type, projectId',
		projects: 'id, updatedAt, creatorId, status',
	});
  }
}

export const localDb = new ProjectSocialLocalDb();
