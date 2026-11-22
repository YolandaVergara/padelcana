'use client';

import { useState, useCallback, useRef } from 'react';
import { validateInput, generatePachanga } from '@/lib/generateMatches';
import { recordGeneration } from '@/lib/matchStats';
import type { Pachanga, CreatePachangaInput } from '@/types/pachanga';

interface UsePachangasReturn {
  /** The currently generated pachanga (null until one is created) */
  activePachanga: Pachanga | null;
  /** Generates a new pachanga and replaces the current one in memory */
  upsert: (input: CreatePachangaInput) => Promise<string | null>;
  upserting: boolean;
}

export function usePachangas(): UsePachangasReturn {
  const [activePachanga, setActivePachanga] = useState<Pachanga | null>(null);
  const [upserting, setUpserting] = useState(false);
  const saving = useRef(false);

  const upsert = useCallback(async (input: CreatePachangaInput): Promise<string | null> => {
    const validationError = validateInput(input.players);
    if (validationError) return validationError;
    if (saving.current) return 'Ya se está guardando la pachanga.';

    saving.current = true;
    setUpserting(true);
    try {
      const result = generatePachanga(input.players);
      await recordGeneration(result.matches.length);
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
      return null;
    } catch {
      return 'No se pudo guardar la pachanga. Vuelve a intentarlo.';
    } finally {
      saving.current = false;
      setUpserting(false);
    }
  }, []);

  return { activePachanga, upsert, upserting };
}
