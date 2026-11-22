'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { firebaseConfigured } from '@/lib/firebase';

export default function PachangaTitle() {
  const { user, loading, signInWithGoogle } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canSignIn = !user && !loading;

  async function handleSignIn() {
    if (!firebaseConfigured) {
      setError('El inicio de sesión está pendiente de configurar.');
      return;
    }

    setBusy(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch {
      setError('No se pudo iniciar sesión con Google. Vuelve a intentarlo.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1 className="text-beer font-black text-5xl sm:text-6xl tracking-tight drop-shadow-lg">
        {canSignIn ? (
          <button
            type="button"
            onClick={handleSignIn}
            disabled={busy}
            aria-busy={busy}
            aria-label="Acceso de administración con Google"
            className="inline-block rounded-lg align-baseline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-beer"
          >
            <span aria-hidden="true">🎾</span>
          </button>
        ) : (
          <span aria-hidden="true">🎾</span>
        )}{' '}
        Entre pistas y birras
      </h1>
      {canSignIn && error && <p role="alert" className="text-sm text-amber-200">{error}</p>}
    </>
  );
}
