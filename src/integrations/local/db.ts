import Dexie, { type EntityTable } from 'dexie';

import type { DraftPost } from '@/domain/types';

type DraftRecord = DraftPost;

type CacheMetaRecord = {
  key: string;
  updatedAt: string;
  version: number;
};

class ProjectSocialLocalDb extends Dexie {
  drafts!: EntityTable<DraftRecord, 'id'>;
  cacheMeta!: EntityTable<CacheMetaRecord, 'key'>;

  constructor() {
    super('project-social');

    this.version(1).stores({
      drafts: 'id, updatedAt, projectId',
      cacheMeta: 'key, updatedAt',
    });
  }
}

export const localDb = new ProjectSocialLocalDb();
