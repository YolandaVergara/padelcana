import { shuffle } from './shuffle';
import type { Match, Pair, PachangaResult, Player } from '@/types';

/**
 * Validates players before generating the pachanga.
 * Returns an error string if invalid, or null if valid.
 */
export function validateInput(players: Player[]): string | null {
  if (players.length < 4) {
    return 'Se necesitan al menos 4 jugadores.';
  }
  return null;
}

/**
 * Generates a random pachanga.
 * Courts are calculated automatically: Math.floor(players.length / 4).
 * Leftover players (players.length % 4) go to the waiting list.
 */
export function generatePachanga(players: Player[]): PachangaResult {
  const shuffled = shuffle(players);
  const courts = Math.floor(shuffled.length / 4);

  const activePlayers = shuffled.slice(0, courts * 4);
  const waiting = shuffled.slice(courts * 4);

  // Build pairs (2 players each)
  const pairs: Pair[] = [];
  for (let i = 0; i < activePlayers.length; i += 2) {
    pairs.push({ player1: activePlayers[i], player2: activePlayers[i + 1] });
  }

  // Assign 2 pairs per court
  const matches: Match[] = [];
  for (let i = 0; i < courts; i++) {
    matches.push({
      court: i + 1,
      pair1: pairs[i * 2],
      pair2: pairs[i * 2 + 1],
    });
  }

  return { matches, waiting };
}
