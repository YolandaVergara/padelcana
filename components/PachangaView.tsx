'use client';

import { useState } from 'react';
import type { Pachanga } from '@/types/pachanga';
import type { Match } from '@/types';
import MatchCard from '@/components/MatchCard';
import WaitingList from '@/components/WaitingList';
import { formatPachangaMessage } from '@/lib/formatPachangaMessage';

interface Props {
  pachanga: Pachanga;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Converts a Firestore FirestoreMatch to the local Match type expected by MatchCard */
function toMatch(fm: Pachanga['matches'][number]): Match {
  return {
    court: fm.court,
    pair1: { player1: fm.team1[0], player2: fm.team1[1] },
    pair2: { player1: fm.team2[0], player2: fm.team2[1] },
  };
}

export default function PachangaView({ pachanga }: Props) {
  const pachangaDate = pachanga.date;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const message = formatPachangaMessage(pachanga);
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="flex flex-col gap-4">
      {/* Date banner */}
      <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center">
        <p className="text-beer font-black text-xl capitalize">
          📅 {formatDate(pachangaDate)}
        </p>
        <p className="text-white/35 text-xs mt-1 font-medium">
          {pachanga.players.length} jugadores
        </p>
      </div>

      {/* Match cards */}
      <h2 className="text-white font-black text-sm uppercase tracking-widest px-1">
        🏆 Partidos — {pachanga.matches.length} pista{pachanga.matches.length !== 1 ? 's' : ''}
      </h2>

      {pachanga.matches.map((fm) => (
        <MatchCard key={fm.court} match={toMatch(fm)} />
      ))}

      <WaitingList players={pachanga.waiting} />

      {/* Copy for WhatsApp */}
      <button
        onClick={handleCopy}
        className={`
          w-full mt-2 rounded-2xl px-5 py-3 font-bold text-sm
          flex items-center justify-center gap-2
          border transition-all duration-200
          ${copied
            ? 'bg-green-500/20 border-green-400/30 text-green-300'
            : 'bg-beer/10 border-beer/30 text-beer hover:bg-beer/20 hover:border-beer/50'
          }
        `}
      >
        {copied ? '✅ Copiado' : '📋 Copiar para WhatsApp'}
      </button>
    </section>
  );
}
