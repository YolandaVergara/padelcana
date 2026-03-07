'use client';

import { useState } from 'react';
import PachangaView from '@/components/PachangaView';
import NewPachangaModal from '@/components/NewPachangaModal';
import HistoricoModal from '@/components/HistoricoModal';
import { usePachangas } from '@/hooks/usePachangas';
import type { AuthUser } from '@/types/auth';

/** Usuarios desactivados temporalmente — usuario fijo anónimo */
const ANONYMOUS_USER: AuthUser = {
  uid: 'anonymous',
  displayName: 'Entre pistas y birras',
  email: null,
  photoURL: null,
};

export default function Home() {
  return <AppContent />;
}

function AppContent() {
  const { activePachanga, historico, loading, error, upsert, upserting } = usePachangas(ANONYMOUS_USER);
  const [showModal, setShowModal] = useState(false);
  const [showHistorico, setShowHistorico] = useState(false);

  return (
    <main className="min-h-screen bg-court px-4 py-8 sm:px-8 sm:py-12 pb-32">
      <div className="mx-auto max-w-xl">
        {/* Header */}
        <header className="text-center mb-8 flex flex-col items-center gap-3">
          <h1 className="text-beer font-black text-5xl sm:text-6xl tracking-tight drop-shadow-lg">
            🎾 Entre pistas y birras
          </h1>
          <p className="text-white/50 text-xs font-semibold tracking-widest uppercase">
            Generador de pachangas
          </p>
        </header>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-400/30 text-red-200 rounded-2xl px-5 py-4 text-sm font-medium text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Loading spinner — only while waiting and there is existing data */}
        {loading && activePachanga && (
          <div className="flex justify-center py-4">
            <span className="text-beer text-xl animate-pulse">⏳</span>
          </div>
        )}

        {/* Empty state */}
        {!activePachanga && !error && (
          <div className="text-center py-16 flex flex-col items-center gap-4">
            <span className="text-6xl">🏔️</span>
            <p className="text-white/50 font-semibold">Aún no hay ninguna pachanga.</p>
            <p className="text-white/30 text-sm">
              Pulsa el botón <span className="text-beer font-black">+</span> para crear la primera.
            </p>
          </div>
        )}

        {/* Active pachanga */}
        {activePachanga && <PachangaView pachanga={activePachanga} />}
      </div>

      {/* ── FAB row ──────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Histórico button */}
        {historico.length > 0 && (
          <button
            onClick={() => setShowHistorico(true)}
            className="
              flex items-center gap-2
              bg-white/10 hover:bg-white/20 border border-white/15
              text-white/70 hover:text-white
              text-xs font-bold uppercase tracking-widest
              px-4 py-2 rounded-full shadow-lg
              transition-all duration-200
            "
          >
            📚 Histórico ({historico.length})
          </button>
        )}

        {/* Nueva Pachanga FAB */}
        <button
          onClick={() => setShowModal(true)}
          aria-label="Nueva Pachanga"
          className="
            bg-beer text-court w-16 h-16 rounded-full
            font-black text-3xl shadow-2xl
            flex items-center justify-center
            transition-all duration-200 hover:scale-110 active:scale-95
          "
        >
          +
        </button>
      </div>

      {/* Modals */}
      {showModal && (
        <NewPachangaModal
          onClose={() => setShowModal(false)}
          onUpsert={upsert}
          upserting={upserting}
          activePachanga={activePachanga}
        />
      )}

      {showHistorico && (
        <HistoricoModal
          historico={historico}
          onClose={() => setShowHistorico(false)}
        />
      )}
    </main>
  );
}
