'use client';

import { useState, useEffect } from 'react';
import type { CreatePachangaInput } from '@/types/pachanga';
import type { Pachanga } from '@/types/pachanga';
import DatePicker from '@/components/DatePicker';
import { parsePlayers } from '@/lib/parsePlayers';

interface Props {
  onClose: () => void;
  onUpsert: (input: CreatePachangaInput) => Promise<string | null>;
  upserting: boolean;
  /** Existing active (future) pachanga, if any — shown as a replace warning */
  activePachanga: Pachanga | null;
}

function formatShortDate(date: Date): string {
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function NewPachangaModal({ onClose, onUpsert, upserting, activePachanga }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    return d;
  });
  const [rawText, setRawText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [confirmReplace, setConfirmReplace] = useState(false);

  // Reset confirm state when date changes
  useEffect(() => { setConfirmReplace(false); }, [selectedDate]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Live preview of parsed names
  const parsedPlayers = parsePlayers(rawText);

  const handleSave = async () => {
    setError(null);

    // Require explicit confirmation when replacing an existing active pachanga
    if (activePachanga && !confirmReplace) {
      setConfirmReplace(true);
      return;
    }

    const result = await onUpsert({ date: selectedDate, players: parsedPlayers });
    if (result) {
      setError(result);
      setConfirmReplace(false);
    } else {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-[#0d3527] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <h2 className="text-beer font-black text-lg uppercase tracking-widest">
            Nueva Pachanga
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors text-xl leading-none" aria-label="Cerrar">
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div className="px-6 py-6 flex flex-col gap-5 overflow-y-auto">
          {/* Replace warning */}
          {activePachanga && (
            <div className={`rounded-xl px-4 py-3 text-sm font-medium border ${confirmReplace ? 'bg-amber-500/20 border-amber-400/40 text-amber-200' : 'bg-white/5 border-white/10 text-white/60'}`}>
              {confirmReplace ? (
                <>⚠️ <strong>¿Seguro?</strong> La pachanga del <strong>{formatShortDate(activePachanga.date.toDate())}</strong> será <strong>reemplazada</strong>. Pulsa «Guardar» para confirmar.</>
              ) : (
                <>📅 Ya hay una pachanga activa el <strong className="text-white/80">{formatShortDate(activePachanga.date.toDate())}</strong>. Al guardar la reemplazarás.</>
              )}
            </div>
          )}

          {/* Date */}
          <div className="flex flex-col gap-2">
            <label className="text-beer font-bold text-sm uppercase tracking-widest">Fecha</label>
            <DatePicker value={selectedDate} onChange={setSelectedDate} />
          </div>

          {/* WhatsApp raw paste */}
          <div className="flex flex-col gap-2">
            <label className="text-beer font-bold text-sm uppercase tracking-widest">
              Jugadores{' '}
              <span className="text-white/30 normal-case font-normal tracking-normal text-xs">
                — pega directamente desde WhatsApp
              </span>
            </label>
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder={'🎾 1. Carlos\n🎾 2. Laura\n- Miguel\n• Sofía\nAna'}
              rows={7}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-beer resize-none font-medium leading-6"
            />
            {/* Parsed preview */}
            {parsedPlayers.length > 0 && (
              <div className="bg-white/5 rounded-xl px-4 py-3 flex flex-col gap-1">
                <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-1">
                  {parsedPlayers.length} jugadores detectados
                </p>
                {parsedPlayers.map((p, i) => (
                  <span key={i} className="text-white/80 text-sm font-medium">
                    {i + 1}. {p}
                  </span>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400/30 text-red-200 rounded-xl px-4 py-3 text-sm font-medium">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3 shrink-0 border-t border-white/10 pt-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/15 text-white/50 font-bold py-3 hover:bg-white/5 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={upserting}
            className={`
              flex-1 rounded-xl font-black py-3 uppercase tracking-wide
              transition-all duration-200 hover:brightness-105 hover:scale-[1.02]
              active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
              ${confirmReplace ? 'bg-amber-400 text-gray-900' : 'bg-beer text-court'}
            `}
          >
            {upserting ? '⏳ Guardando…' : confirmReplace ? '⚠️ Sí, reemplazar' : '🎾 Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
}
