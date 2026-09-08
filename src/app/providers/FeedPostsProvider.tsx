import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import type { FeedPost } from '@/domain/feed-types';
import type { ComposePublishInput } from '@/domain/compose-publish';
import { FeedPostsContext } from '@/app/providers/feed-posts-context';
import {
	listPublishedPosts,
	savePublishedPost,
} from '@/integrations/local/published-post-store';

type FeedPostsProviderProps = {
	children: ReactNode;
};

export function FeedPostsProvider({ children }: FeedPostsProviderProps) {
	const [posts, setPosts] = useState<FeedPost[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const refreshPosts = useCallback(async () => {
		const nextPosts = await listPublishedPosts();
		setPosts(nextPosts);
	}, []);

	useEffect(() => {
		let cancelled = false;

		void listPublishedPosts()
			.then((loadedPosts) => {
				if (!cancelled) {
					setPosts(loadedPosts);
				}
			})
			.finally(() => {
				if (!cancelled) {
					setIsLoading(false);
				}
			});

		return () => {
			cancelled = true;
		};
	}, []);

	const publishPost = useCallback(async (input: ComposePublishInput) => {
		const post = await savePublishedPost(input);
		setPosts((current) => [post, ...current]);
		return post;
	}, []);

	const getPostById = useCallback(
		(postId: string) => posts.find((post) => post.id === postId),
		[posts],
	);

	const value = useMemo(
		() => ({
			posts,
			isLoading,
			publishPost,
			getPostById,
			refreshPosts,
		}),
		[posts, isLoading, publishPost, getPostById, refreshPosts],
	);

	return <FeedPostsContext.Provider value={value}>{children}</FeedPostsContext.Provider>;
}
