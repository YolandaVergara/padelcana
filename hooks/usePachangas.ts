'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  subscribeToPachangas,
  upsertActivePachanga,
} from '@/lib/pachangas.service';
import { validateInput } from '@/lib/generateMatches';
import type { Pachanga, CreatePachangaInput } from '@/types/pachanga';
import type { AuthUser } from '@/types/auth';

interface UsePachangasReturn {
  /** All pachangas ordered by date ascending */
  pachangas: Pachanga[];
  /** The single upcoming pachanga (date >= today) */
  activePachanga: Pachanga | null;
  /** Past pachangas sorted newest-first */
  historico: Pachanga[];
  loading: boolean;
  error: string | null;
  /**
   * Creates or replaces the active pachanga.
   * If a future pachanga already exists, it is deleted before creating the new one.
   * Returns null on success, or an error string on failure.
   */
  upsert: (input: CreatePachangaInput) => Promise<string | null>;
  upserting: boolean;
}

export function usePachangas(user: AuthUser): UsePachangasReturn {
  const [pachangas, setPachangas] = useState<Pachanga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upserting, setUpserting] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToPachangas(
      (data) => {
        setPachangas(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, []);

  // Compute derived state from the full list
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const activePachanga: Pachanga | null =
    pachangas.find((p) => p.date.toDate() >= today) ?? null;

  const historico: Pachanga[] = pachangas
    .filter((p) => p.date.toDate() < today)
    .slice()
    .reverse(); // newest first

  const upsert = useCallback(
    async (input: CreatePachangaInput): Promise<string | null> => {
      const validationError = validateInput(input.players);
      if (validationError) return validationError;

      setUpserting(true);
      try {
        // Pass the existing active pachanga ID so the service can delete it
        const existingId = activePachanga?.id ?? null;
        await upsertActivePachanga(input, user, existingId);
        return null;
      } catch (err) {
        return err instanceof Error ? err.message : 'Error al guardar.';
      } finally {
        setUpserting(false);
      }
    },
    [user, activePachanga],
  );

  return { pachangas, activePachanga, historico, loading, error, upsert, upserting };
}
