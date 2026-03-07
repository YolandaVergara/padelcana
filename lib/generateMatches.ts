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
 * The LAST (players.length % 4) players sit out — they signed up last.
 * Only the players who fit in courts are shuffled for random team assignment.
 */
export function generatePachanga(players: Player[]): PachangaResult {
  const courts = Math.floor(players.length / 4);
  const activeCount = courts * 4;

  // Last n%4 players sit out (preserve sign-up order, they arrived last)
  const waiting = players.slice(activeCount);
  // Shuffle only the players who will play, for random court assignment
  const activePlayers = shuffle(players.slice(0, activeCount));

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
