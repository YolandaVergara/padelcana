/**
 * parsePlayers
 *
 * Extracts player names from a WhatsApp message.
 * Only lines that contain the 🎾 emoji are considered players.
 * The order is preserved (first to sign up = first in list).
 */
export function parsePlayers(raw: string): string[] {
  return raw
    .split('\n')
    .filter((line) => line.includes('\u{1F3BE}')) // only 🎾 lines
    .map((line) => {
      // Remove the 🎾 emoji and any other emoji
      let cleaned = line.replace(
        /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}]/gu,
        '',
      );
      // Strip parenthetical / bracketed annotations: (texto) [texto]
      cleaned = cleaned.replace(/[([{][^\])}]*[\])}]/g, '');
      // Remove trailing punctuation
      cleaned = cleaned.replace(/[.,;:!?]+$/, '');
      return cleaned.trim();
    })
    .filter(Boolean); // discard empty 🎾 lines (e.g. "🎾" with no name)
}

/**
 * Converts a clean player array back to newline-separated text
 * (useful for displaying the preview inside a textarea).
 */
export function playersToText(players: string[]): string {
  return players.join('\n');
}
