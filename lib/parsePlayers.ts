/**
 * parsePlayers
 *
 * Cleans raw WhatsApp-pasted text into a tidy array of player names.
 *
 * Handles:
 *  - Emoji removal (🎾, 🏆, etc.)
 *  - Leading list markers: "1.", "1)", "-", "*", "•"
 *  - Inline noise: "(apuntado)", "[confirmado]", trailing punctuation
 *  - Extra whitespace and blank lines
 */
export function parsePlayers(raw: string): string[] {
  return raw
    .split('\n')
    .map((line) => {
      // 1. Remove all emoji (Unicode ranges)
      let cleaned = line.replace(
        /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}]/gu,
        '',
      );

      // 2. Strip leading list markers: "1.", "1)", "-", "*", "•"
      cleaned = cleaned.replace(/^\s*(\d+[.)]\s*|[-*•]\s*)/, '');

      // 3. Strip parenthetical / bracketed annotations: (texto) [texto]
      cleaned = cleaned.replace(/[([{][^\])}]*[\])}]/g, '');

      // 4. Remove trailing punctuation
      cleaned = cleaned.replace(/[.,;:!?]+$/, '');

      return cleaned.trim();
    })
    .filter(Boolean);
}

/**
 * Converts a clean player array back to newline-separated text
 * (useful for displaying the preview inside a textarea).
 */
export function playersToText(players: string[]): string {
  return players.join('\n');
}
