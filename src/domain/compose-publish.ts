import type { PostType } from '@/domain/feed-types';

export type ComposePublishInput = {
	postType: PostType;
	username: string;
	title: string;
	body: string;
	tagsInput: string;
	projectName: string;
	projectId: string | null;
	communityName: string;
	aiAssisted: boolean;
	mediaFile?: File;
};
