import type { DraftPost } from '@/domain/types';
import {
  deleteDraft as deleteLocalDraft,
  getDraft as getLocalDraft,
  listDrafts as listLocalDrafts,
  saveDraft as saveLocalDraft,
} from '@/integrations/local/draft-store';

export async function saveDraft(draft: DraftPost): Promise<void> {
  await saveLocalDraft(draft);
}

export async function getDraft(id: string): Promise<DraftPost | undefined> {
  return getLocalDraft(id);
}

export async function listDrafts(): Promise<DraftPost[]> {
  return listLocalDrafts();
}

export async function deleteDraft(id: string): Promise<void> {
  await deleteLocalDraft(id);
}
