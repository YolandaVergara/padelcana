'use client';

import { useState } from 'react';
import { validateInput, generatePachanga } from '@/lib/generateMatches';
import { recordGeneration } from '@/lib/matchStats';
import type { Pachanga, CreatePachangaInput } from '@/types/pachanga';

export function usePachangas() {
  const [activePachanga, setActivePachanga] = useState<Pachanga | null>(null);

  function upsert(input: CreatePachangaInput): string | null {
    const validationError = validateInput(input.players);
    if (validationError) return validationError;

    const result = generatePachanga(input.players);
    setActivePachanga({
      date: input.date,
      players: input.players,
      matches: result.matches.map((m) => ({
        court: m.court,
        team1: [m.pair1.player1, m.pair1.player2],
        team2: [m.pair2.player1, m.pair2.player2],
      })),
      waiting: result.waiting,
    });
    void recordGeneration(result.matches.length).catch((error) => {
      console.warn('No se pudo registrar el uso del generador.', error);
    });
    return null;
  }

  return { activePachanga, upsert };
}
