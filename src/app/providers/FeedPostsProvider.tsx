import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import type { FeedPost } from '@/domain/feed-types';
import type { ComposePublishInput } from '@/domain/compose-publish';
import { FeedPostsContext } from '@/app/providers/feed-posts-context';
import { createRemotePost, deleteRemotePost, listRemotePosts, updateRemotePost } from '@/data/remote-posts';
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

	const updatePost = useCallback(async (postId: string, input: { title: string; body: string; tagsInput: string }) => {
		if (!user) throw new Error('Sign in to edit a post.');
		const post = await updateRemotePost(postId, input);
		setPosts((current) => current.map((item) => item.id === postId ? post : item));
		return post;
	}, [user]);

	const deletePost = useCallback(async (postId: string) => {
		if (!user) throw new Error('Sign in to delete a post.');
		await deleteRemotePost(postId);
		setPosts((current) => current.filter((item) => item.id !== postId));
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
			updatePost,
			deletePost,
			getPostById,
			refreshPosts,
		}),
		[posts, isLoading, publishPost, updatePost, deletePost, getPostById, refreshPosts],
	);

	return <FeedPostsContext.Provider value={value}>{children}</FeedPostsContext.Provider>;
}
