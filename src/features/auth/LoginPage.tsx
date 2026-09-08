import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/auth-context';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/config/constants';

export function LoginPage() {
  const { signIn } = useAuth(); const navigate = useNavigate();
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) { event.preventDefault(); setError(''); setBusy(true); try { await signIn(email, password); navigate(ROUTES.home); } catch (err) { setError(err instanceof Error ? err.message : 'Could not sign in.'); } finally { setBusy(false); } }
  return <div className="mx-auto max-w-md py-8"><div className="glass-card rounded-2xl border p-6"><h1 className="text-headline-md font-bold">Welcome back</h1><p className="mt-2 text-body-md text-text-muted">Sign in to continue sharing what you are making.</p><form className="mt-6 space-y-4" onSubmit={(event) => void submit(event)}><label className="block"><span className="mb-1 block text-label-md">Email</span><input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-11 w-full rounded-xl border border-border-subtle bg-surface px-3" /></label><label className="block"><span className="mb-1 block text-label-md">Password</span><input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-11 w-full rounded-xl border border-border-subtle bg-surface px-3" /></label>{error ? <p className="text-body-sm text-error">{error}</p> : null}<Button type="submit" disabled={busy} className="w-full">{busy ? 'Signing in…' : 'Sign in'}</Button></form><p className="mt-6 text-center text-body-sm text-text-muted">New here? <Link className="text-primary hover:underline" to={ROUTES.signup}>Create an account</Link></p></div></div>;
}
