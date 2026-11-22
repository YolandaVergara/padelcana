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
 * German and Yol get priority and play on the first and last courts, respectively.
 * The remaining places go to players in sign-up order before teams are shuffled.
 */
export function generatePachanga(players: Player[]): PachangaResult {
  const courts = Math.floor(players.length / 4);
  const activeCount = courts * 4;

  if (courts === 0) return { matches: [], waiting: [...players] };

  const names = players.map((player) => player.trim().toLowerCase());
  const germanIndex = names.findIndex((name) => name === 'german' || name.normalize('NFC') === 'germán');
  const yolIndex = names.indexOf('yol');
  const german = players[germanIndex];
  const yol = players[yolIndex];
  const remaining = players.filter((_, index) => index !== germanIndex && index !== yolIndex);
  const openPlaces = activeCount - Number(germanIndex >= 0) - Number(yolIndex >= 0);
  const waiting = remaining.slice(openPlaces);
  const activePlayers = shuffle(remaining.slice(0, openPlaces));

  if (germanIndex >= 0) activePlayers.unshift(german);
  if (yolIndex >= 0) {
    const lastCourtStart = activeCount - 4;
    // Pick a random spot on the last court so Yol can also partner with German.
    const firstAvailableSpot = courts === 1 && germanIndex >= 0 ? 1 : lastCourtStart;
    const spot = firstAvailableSpot + Math.floor(Math.random() * (activeCount - firstAvailableSpot));
    activePlayers.splice(spot, 0, yol);
  }

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
