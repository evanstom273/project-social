import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import type { FeedPost } from '@/domain/feed-types';
import type { ComposePublishInput } from '@/domain/compose-publish';
import { FeedPostsContext } from '@/app/providers/feed-posts-context';
import { createRemotePost, listRemotePosts } from '@/data/remote-posts';
import { useAuth } from './auth-context';

type FeedPostsProviderProps = {
	children: ReactNode;
};

export function FeedPostsProvider({ children }: FeedPostsProviderProps) {
	const [posts, setPosts] = useState<FeedPost[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useAuth();

	const refreshPosts = useCallback(async () => {
		const nextPosts = await listRemotePosts();
		setPosts(nextPosts);
	}, []);

	useEffect(() => {
		let cancelled = false;

		void listRemotePosts()
			.then((loadedPosts) => {
				if (!cancelled) {
					setPosts(loadedPosts);
				}
			})
			.catch(() => {
				if (!cancelled) setPosts([]);
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
		if (!user) throw new Error('Sign in to publish a post.');
		const post = await createRemotePost(user.id, input);
		setPosts((current) => [post, ...current]);
		return post;
	}, [user]);

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
