import { createContext } from 'react';

import type { FeedPost } from '@/domain/feed-types';
import type { ComposePublishInput } from '@/domain/compose-publish';

export type FeedPostsContextValue = {
	posts: FeedPost[];
	isLoading: boolean;
	publishPost: (input: ComposePublishInput) => Promise<FeedPost>;
	getPostById: (postId: string) => FeedPost | undefined;
	refreshPosts: () => Promise<void>;
};

export const FeedPostsContext = createContext<FeedPostsContextValue | null>(null);
