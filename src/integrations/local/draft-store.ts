import type { DraftPost } from '@/domain/types';

import { localDb } from './db';

export async function saveDraft(draft: DraftPost): Promise<void> {
  await localDb.drafts.put(draft);
}

export async function getDraft(id: string): Promise<DraftPost | undefined> {
  return localDb.drafts.get(id);
}

export async function listDrafts(): Promise<DraftPost[]> {
  return localDb.drafts.orderBy('updatedAt').reverse().toArray();
}

export async function deleteDraft(id: string): Promise<void> {
  await localDb.drafts.delete(id);
}

export async function touchCacheMeta(key: string, version = 1): Promise<void> {
  await localDb.cacheMeta.put({
    key,
    version,
    updatedAt: new Date().toISOString(),
  });
}

export async function getCacheMeta(key: string): Promise<{ updatedAt: string; version: number } | undefined> {
  const record = await localDb.cacheMeta.get(key);
  if (!record) {
    return undefined;
  }

  return { updatedAt: record.updatedAt, version: record.version };
}
