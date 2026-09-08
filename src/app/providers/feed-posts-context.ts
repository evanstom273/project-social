import { createContext } from 'react';

import type { FeedPost } from '@/domain/feed-types';
import type { ComposePublishInput } from '@/domain/compose-publish';

export type FeedPostsContextValue = {
	posts: FeedPost[];
	isLoading: boolean;
	publishPost: (input: ComposePublishInput) => Promise<FeedPost>;
	updatePost: (postId: string, input: { title: string; body: string; tagsInput: string }) => Promise<FeedPost>;
	deletePost: (postId: string) => Promise<void>;
	getPostById: (postId: string) => FeedPost | undefined;
	refreshPosts: () => Promise<void>;
};

export const FeedPostsContext = createContext<FeedPostsContextValue | null>(null);
