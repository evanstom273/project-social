export type UserId = string;
export type ProjectId = string;
export type CommunityId = string;
export type PostId = string;

export type User = {
  id: UserId;
  handle: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
};

export type Project = {
  id: ProjectId;
  slug: string;
  name: string;
  description: string | null;
  accentColor: string | null;
  avatarUrl: string | null;
  creatorId: UserId;
};

export type Community = {
  id: CommunityId;
  slug: string;
  name: string;
  description: string | null;
};

export type Post = {
  id: PostId;
  body: string | null;
  projectId: ProjectId | null;
  authorId: UserId;
  communityIds: CommunityId[];
  createdAt: string;
};

export type DraftPost = {
  id: string;
  body: string;
  projectId: ProjectId | null;
  communityIds: CommunityId[];
  updatedAt: string;
};

export type FeedSortMode =
  | 'newest'
  | 'top-today'
  | 'top-week'
  | 'top-month'
  | 'most-discussed';

export type FeedFilterMode = 'everything' | 'following';
