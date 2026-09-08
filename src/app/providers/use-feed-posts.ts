import { useContext } from 'react';

import { FeedPostsContext } from '@/app/providers/feed-posts-context';

export function useFeedPosts() {
	const context = useContext(FeedPostsContext);
	if (!context) {
		throw new Error('useFeedPosts must be used within FeedPostsProvider');
	}
	return context;
}
