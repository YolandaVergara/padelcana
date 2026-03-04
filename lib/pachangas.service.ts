import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { generatePachanga } from '@/lib/generateMatches';
import type { Pachanga, PachangaDoc, CreatePachangaInput } from '@/types/pachanga';
import type { AuthUser } from '@/types/auth';

const COLLECTION = 'pachangas';

/**
 * Maps a Firestore raw data object + id to a typed Pachanga.
 */
function toPachanga(id: string, data: PachangaDoc): Pachanga {
  return { id, ...data };
}

/**
 * Subscribes to the pachangas collection ordered by date ascending.
 * Calls onData whenever the snapshot changes.
 * Returns the unsubscribe function.
 */
export function subscribeToPachangas(
  onData: (pachangas: Pachanga[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  const q = query(collection(db, COLLECTION), orderBy('date', 'asc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const pachangas = snapshot.docs.map((doc) =>
        toPachanga(doc.id, doc.data() as PachangaDoc),
      );
      onData(pachangas);
    },
    (err) => onError(err),
  );
}

/**
 * Creates a new pachanga document in Firestore.
 * Generates the matches internally using the existing generatePachanga logic.
 */
export async function createPachanga(
  input: CreatePachangaInput,
  user: AuthUser,
): Promise<void> {
  const { date, players } = input;

  const result = generatePachanga(players);

  const data: PachangaDoc = {
    date: Timestamp.fromDate(date),
    createdBy: user.uid,
    createdByName: user.displayName ?? 'Anónimo',
    createdAt: Timestamp.now(),
    players,
    matches: result.matches.map((m) => ({
      court: m.court,
      team1: [m.pair1.player1, m.pair1.player2],
      team2: [m.pair2.player1, m.pair2.player2],
    })),
    waiting: result.waiting,
  };

  await addDoc(collection(db, COLLECTION), data);
}

/**
 * Upserts the active (future) pachanga.
 *
 * UX decision: if a future pachanga already exists, delete it first and
 * create the new one. This keeps the invariant of ONE active pachanga.
 * The hook surfaces a warning to the user before calling this.
 *
 * @param existingId - Firestore ID of the future pachanga to replace, if any.
 */
export async function upsertActivePachanga(
  input: CreatePachangaInput,
  user: AuthUser,
  existingId: string | null,
): Promise<void> {
  if (existingId) {
    await deleteDoc(doc(db, COLLECTION, existingId));
  }
  await createPachanga(input, user);
}
