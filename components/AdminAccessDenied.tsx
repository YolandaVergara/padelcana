'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminAccessDenied() {
  const { signOut } = useAuth();
  const heading = useRef<HTMLHeadingElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    heading.current?.focus();
  }, []);

  async function returnToGenerator() {
    setBusy(true);
    setError(false);
    try {
      await signOut();
    } catch {
      setError(true);
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-court px-6 py-12">
      <section aria-labelledby="admin-access-title" className="w-full max-w-sm border-t border-white/20 pt-6">
        <h1 id="admin-access-title" tabIndex={-1} ref={heading} className="text-balance text-4xl font-black tracking-tight text-beer focus:outline-none sm:text-5xl">
          ¿Qué quieres mirar?
        </h1>
        <p className="mt-3 max-w-xs text-pretty text-base leading-relaxed text-white/80">
          El contador es solo para administración. Puedes seguir organizando pachangas.
        </p>
        <button
          type="button"
          onClick={returnToGenerator}
          disabled={busy}
          className="mt-6 min-h-11 rounded-xl bg-beer px-4 py-2 font-bold text-court transition-colors hover:bg-beer/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-beer disabled:opacity-65"
        >
          {busy ? 'Volviendo…' : 'Volver al generador'}
        </button>
        {error && <p role="alert" className="mt-3 text-sm text-amber-200">No se pudo cerrar la sesión. Vuelve a intentarlo.</p>}
      </section>
    </main>
  );
}
