import type { FeedPost } from '@/domain/feed-types';
import { getPublishedPostById } from '@/integrations/local/published-post-store';

export async function loadFeedPostById(postId: string): Promise<FeedPost | undefined> {
	return getPublishedPostById(postId);
}
