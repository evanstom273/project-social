import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSupabaseClient } from '@/integrations/supabase/client';
import { ROUTES } from '@/config/constants';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function finish() {
      const client = getSupabaseClient();
      const code = new URLSearchParams(window.location.search).get('code');
      if (code) {
        const { error: exchangeError } = await client.auth.exchangeCodeForSession(code);
        if (exchangeError) throw exchangeError;
      }

      const { data, error: sessionError } = await client.auth.getSession();
      if (sessionError) throw sessionError;
      if (!active) return;
      navigate(data.session ? ROUTES.profileSetup : ROUTES.login, { replace: true });
    }

    void finish().catch((reason: unknown) => {
      if (active) setError(reason instanceof Error ? reason.message : 'Could not complete authentication.');
    });

    return () => {
      active = false;
    };
  }, [navigate]);

  return <div className="mx-auto max-w-md py-12 text-center">{error ? <p className="text-body-sm text-error">{error}</p> : <p className="text-body-md text-text-muted">Finishing sign in…</p>}</div>;
}
