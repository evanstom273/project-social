import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '@/app/providers/auth-context';
import { listPublicProjects } from '@/data/remote-projects';
import { listRemotePostsForAuthor } from '@/data/remote-posts';
import { getPublicProfileByHandle } from '@/integrations/supabase/profiles';
import type { AuthProfile } from '@/app/providers/auth-context';
import type { Project } from '@/domain/types';
import type { FeedPost } from '@/domain/feed-types';
import { Avatar } from '@/components/ui/Avatar';
import { ProjectAvatar } from '@/components/ui/ProjectAvatar';
import { PostCard } from '@/components/feed/PostCard';
import { ROUTES } from '@/config/constants';

export function ProfilePage() {
  const { handle } = useParams(); const { profile: ownProfile } = useAuth(); const [profile, setProfile] = useState<AuthProfile | null>(handle ? null : ownProfile); const [projects, setProjects] = useState<Project[]>([]); const [posts, setPosts] = useState<FeedPost[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { const target = handle ? undefined : ownProfile; if (!handle && !target) { setLoading(false); return; } let active = true; const run = async () => { try { const nextProfile = target ?? await getPublicProfileByHandle(handle!); if (!nextProfile) { if (active) setError('Profile not found.'); return; } const [nextProjects, nextPosts] = await Promise.all([listPublicProjects(nextProfile.id), listRemotePostsForAuthor(nextProfile.id)]); if (active) { setProfile(nextProfile); setProjects(nextProjects); setPosts(nextPosts.slice(0, 10)); } } catch { if (active) setError('Could not load this profile.'); } finally { if (active) setLoading(false); } }; void run(); return () => { active = false; }; }, [handle, ownProfile]);
  if (!handle && !ownProfile) return <Navigate to={ROUTES.login} replace />;
  if (loading) return <p className="py-12 text-center text-text-muted">Loading profile…</p>;
  if (error || !profile) return <p className="py-12 text-center text-error">{error || 'Profile not found.'}</p>;
  return <div className="space-y-8"><header className="glass-card rounded-2xl border p-6"><div className="flex flex-wrap items-start gap-4"><Avatar alt={profile.displayName} src={profile.avatarUrl} fallback={profile.displayName.charAt(0)} size="lg" /><div><h1 className="text-headline-md font-bold">{profile.displayName}</h1><p className="text-body-md text-text-muted">@{profile.handle}</p>{profile.bio ? <p className="mt-3 max-w-xl text-body-md text-text-secondary">{profile.bio}</p> : null}</div></div></header><section><div className="mb-4 flex items-center justify-between"><h2 className="text-headline-sm font-bold">Projects</h2>{profile.id === ownProfile?.id ? <Link className="text-label-md text-primary" to={ROUTES.projects}>Manage projects</Link> : null}</div>{projects.length ? <div className="grid gap-4 sm:grid-cols-2">{projects.map((project) => <Link key={project.id} to={ROUTES.project(project.id)} className="glass-card glass-card-hover rounded-xl border p-4"><div className="flex gap-3"><ProjectAvatar initial={project.name[0] ?? 'P'} avatarUrl={project.avatarUrl} /><div><h3 className="font-semibold">{project.name}</h3><p className="mt-1 text-body-sm text-text-muted">{project.description || 'No description yet.'}</p></div></div></Link>)}</div> : <p className="text-body-md text-text-muted">No public projects yet.</p>}</section><section><h2 className="mb-4 text-headline-sm font-bold">Recent posts</h2>{posts.length ? <div className="flex flex-col gap-5">{posts.map((post) => <PostCard key={post.id} post={post} />)}</div> : <p className="text-body-md text-text-muted">No public posts yet.</p>}</section></div>;
}
