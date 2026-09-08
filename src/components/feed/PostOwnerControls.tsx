import { useState } from 'react';

import type { FeedPost } from '@/domain/feed-types';
import { useAuth } from '@/app/providers/auth-context';
import { useFeedPosts } from '@/app/providers/use-feed-posts';
import { Button } from '@/components/ui/Button';

export function PostOwnerControls({ post, onDeleted }: { post: FeedPost; onDeleted?: () => void }) {
 const { user } = useAuth();
 const { updatePost, deletePost } = useFeedPosts();
 const [editing, setEditing] = useState(false);
 const [title, setTitle] = useState(post.title ?? '');
 const [body, setBody] = useState(post.body);
 const [tagsInput, setTagsInput] = useState(post.tags.join(', '));
 const [error, setError] = useState('');
 const [busy, setBusy] = useState(false);
 if (!user || user.id !== post.author.id) return null;
 async function save() { if (!body.trim() && !title.trim()) { setError('Add a title or description before saving.'); return; } setError(''); setBusy(true); try { await updatePost(post.id, { title, body, tagsInput }); setEditing(false); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not update this post.'); } finally { setBusy(false); } }
 async function remove() { if (!window.confirm('Delete this post? This cannot be undone.')) return; setBusy(true); try { await deletePost(post.id); onDeleted?.(); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not delete this post.'); setBusy(false); } }
 return <><div className="flex items-center gap-2" onClick={(event) => { event.preventDefault(); event.stopPropagation(); }}><button type="button" className="rounded-lg border border-border-subtle px-2.5 py-1 text-caption text-text-secondary transition-colors hover:border-primary/50 hover:text-primary" onClick={() => setEditing(true)}>Edit</button><button type="button" disabled={busy} className="rounded-lg border border-border-subtle px-2.5 py-1 text-caption text-text-secondary transition-colors hover:border-error/50 hover:text-error" onClick={() => void remove()}>Delete</button></div>{editing ? <div className="fixed inset-0 z-[60] flex items-center justify-center bg-scrim p-4" role="dialog" aria-modal="true" aria-label="Edit post" onClick={() => setEditing(false)}><div className="panel-solid relative z-10 w-full max-w-xl rounded-2xl border p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between gap-3"><h2 className="text-headline-sm font-bold">Edit post</h2><button type="button" className="text-text-muted hover:text-text-primary" aria-label="Close edit post" onClick={() => setEditing(false)}>×</button></div><div className="mt-5 space-y-4"><label className="block"><span className="mb-1.5 block text-label-md">Title</span><input value={title} onChange={(event) => setTitle(event.target.value)} className="h-11 w-full rounded-xl border border-border-subtle bg-surface px-3" /></label><label className="block"><span className="mb-1.5 block text-label-md">Description</span><textarea value={body} onChange={(event) => setBody(event.target.value)} rows={7} className="w-full resize-y rounded-xl border border-border-subtle bg-surface px-3 py-3" /></label><label className="block"><span className="mb-1.5 block text-label-md">Tags</span><input value={tagsInput} onChange={(event) => setTagsInput(event.target.value)} placeholder="Comma separated" className="h-11 w-full rounded-xl border border-border-subtle bg-surface px-3" /></label>{error ? <p className="text-body-sm text-error">{error}</p> : null}<div className="flex justify-end gap-2"><Button type="button" variant="secondary" onClick={() => setEditing(false)}>Cancel</Button><Button type="button" disabled={busy} onClick={() => void save()}>{busy ? 'Saving…' : 'Save changes'}</Button></div></div></div></div> : null}</>;
}
