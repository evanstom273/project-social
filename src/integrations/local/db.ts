import Dexie, { type EntityTable } from 'dexie';

import type { FeedPost, PostType } from '@/domain/feed-types';
import type { DraftPost } from '@/domain/types';

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
	mediaBlob?: Blob;
	mediaMimeType?: string;
	mediaFileName?: string;
};

class ProjectSocialLocalDb extends Dexie {
  drafts!: EntityTable<DraftRecord, 'id'>;
  cacheMeta!: EntityTable<CacheMetaRecord, 'key'>;
  publishedPosts!: EntityTable<PublishedPostRecord, 'id'>;

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
  }
}

export const localDb = new ProjectSocialLocalDb();
