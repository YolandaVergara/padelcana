'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { firebaseConfigured } from '@/lib/firebase';

export default function LoginScreen() {
  const { signInWithGoogle } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  async function handleSignIn() {
    setBusy(true);
    setError(false);
    try {
      await signInWithGoogle();
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <details className="max-w-full text-sm">
      <summary className="cursor-pointer text-white/75 hover:text-white focus-visible:outline-2 focus-visible:outline-beer">
        Administración
      </summary>
      <div className="mt-3 flex flex-col items-start gap-2">
        <button
          type="button"
          onClick={handleSignIn}
          disabled={busy || !firebaseConfigured}
          className="
            flex items-center gap-2
            bg-white text-gray-800 font-semibold
            px-3 py-2 rounded-xl
            transition-all duration-200
            hover:bg-white/90
            focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-beer
            disabled:opacity-60
          "
        >
          <GoogleIcon />
          {busy ? 'Conectando con Google…' : 'Entrar con Google'}
        </button>

        {!firebaseConfigured && <p role="alert" className="text-amber-200 text-sm">El inicio de sesión está pendiente de configurar.</p>}
        {error && <p role="alert" className="text-amber-200 text-sm">No se pudo iniciar sesión con Google. Vuelve a intentarlo.</p>}
      </div>
    </details>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}
