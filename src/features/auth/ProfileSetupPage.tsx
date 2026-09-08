import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/auth-context';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/config/constants';

export function ProfileSetupPage() {
  const { user, profile, isLoading, saveProfile } = useAuth(); const navigate = useNavigate();
  const [handle, setHandle] = useState(profile?.handle ?? ''); const [displayName, setDisplayName] = useState(profile?.displayName ?? ''); const [bio, setBio] = useState(profile?.bio ?? ''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  if (isLoading) return <p className="py-12 text-center text-text-muted">Loading account…</p>; if (!user) return <Navigate to={ROUTES.login} replace />;
  async function submit(event: FormEvent) { event.preventDefault(); setError(''); setBusy(true); try { await saveProfile({ handle, displayName, bio }); navigate(ROUTES.home, { replace: true }); } catch (err) { setError(err instanceof Error ? err.message : 'Could not save your profile.'); } finally { setBusy(false); } }
  return <div className="mx-auto max-w-md py-8"><div className="glass-card rounded-2xl border p-6"><h1 className="text-headline-md font-bold">Finish your profile</h1><p className="mt-2 text-body-md text-text-muted">Choose the public identity shown on your projects and posts.</p><form className="mt-6 space-y-4" onSubmit={(event) => void submit(event)}><label className="block"><span className="mb-1 block text-label-md">Display name</span><input required maxLength={80} value={displayName} onChange={(event) => setDisplayName(event.target.value)} className="h-11 w-full rounded-xl border border-border-subtle bg-surface px-3" /></label><label className="block"><span className="mb-1 block text-label-md">Handle</span><input required maxLength={30} value={handle} onChange={(event) => setHandle(event.target.value)} className="h-11 w-full rounded-xl border border-border-subtle bg-surface px-3" /></label><label className="block"><span className="mb-1 block text-label-md">Short bio <span className="text-caption text-text-faint">optional</span></span><textarea maxLength={280} rows={3} value={bio} onChange={(event) => setBio(event.target.value)} className="w-full rounded-xl border border-border-subtle bg-surface px-3 py-2" /></label>{error ? <p className="text-body-sm text-error">{error}</p> : null}<Button type="submit" disabled={busy} className="w-full">{busy ? 'Saving…' : 'Save profile'}</Button></form></div></div>;
}
