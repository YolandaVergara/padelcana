'use client';

import { useState, useEffect } from 'react';
import type { Pachanga } from '@/types/pachanga';
import PachangaView from '@/components/PachangaView';

interface Props {
  historico: Pachanga[];
  onClose: () => void;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function HistoricoModal({ historico, onClose }: Props) {
  const [selected, setSelected] = useState<Pachanga | null>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selected) setSelected(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, selected]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-[#0d3527] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            {selected && (
              <button
                onClick={() => setSelected(null)}
                className="text-white/40 hover:text-white transition-colors text-sm font-bold"
                aria-label="Volver al listado"
              >
                ← Volver
              </button>
            )}
            <h2 className="text-beer font-black text-lg uppercase tracking-widest">
              {selected ? '📅 Detalle' : '📚 Histórico'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors text-xl leading-none"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {/* No history */}
          {historico.length === 0 && !selected && (
            <div className="text-center py-12 flex flex-col items-center gap-3">
              <span className="text-5xl">🏜️</span>
              <p className="text-white/40 font-semibold">Sin pachangas pasadas todavía.</p>
            </div>
          )}

          {/* List of past pachangas */}
          {!selected && historico.length > 0 && (
            <ul className="flex flex-col gap-2">
              {historico.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => setSelected(p)}
                    className="
                      w-full text-left px-4 py-4 rounded-2xl
                      bg-white/5 border border-white/10
                      hover:bg-white/10 hover:border-beer/40
                      transition-all duration-150
                      flex items-center justify-between
                    "
                  >
                    <div>
                      <p className="text-white font-bold capitalize text-sm">
                        {formatDate(p.date.toDate())}
                      </p>
                      <p className="text-white/35 text-xs mt-0.5">
                        {p.players.length} jugadores · {p.matches.length} pistas
                      </p>
                    </div>
                    <span className="text-beer text-lg">›</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Pachanga detail */}
          {selected && <PachangaView pachanga={selected} />}
        </div>
      </div>
    </div>
  );
}
