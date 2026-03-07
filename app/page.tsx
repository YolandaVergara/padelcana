'use client';

import { useState } from 'react';
import PachangaView from '@/components/PachangaView';
import NewPachangaModal from '@/components/NewPachangaModal';
import { usePachangas } from '@/hooks/usePachangas';

export default function Home() {
  return <AppContent />;
}

function AppContent() {
  const { activePachanga, upsert, upserting } = usePachangas();
  const [showModal, setShowModal] = useState(false);

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

        {/* Empty state */}
        {!activePachanga && (
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

      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-40">
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

      {showModal && (
        <NewPachangaModal
          onClose={() => setShowModal(false)}
          onUpsert={upsert}
          upserting={upserting}
          activePachanga={activePachanga}
        />
      )}
    </main>
  );
}
