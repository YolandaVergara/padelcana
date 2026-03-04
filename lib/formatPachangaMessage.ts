import type { Pachanga } from '@/types/pachanga';

/**
 * Formats a Pachanga into a clean WhatsApp-ready string.
 *
 * Example output:
 *   🎾 Pachanga - domingo 23 de junio
 *
 *   🏟️ Pista 1
 *   Carlos y Laura
 *   Miguel y Sofía
 *
 *   🏟️ Pista 2
 *   Ana y Pedro
 *   Luis y María
 */
export function formatPachangaMessage(pachanga: Pachanga): string {
  const date = pachanga.date.toDate();

  const formattedDate = date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const header = `🎾 Pachanga - ${formattedDate}`;

  const courts = pachanga.matches
    .map((m) => {
      const line1 = `${m.team1[0]} y ${m.team1[1]}`;
      const line2 = `${m.team2[0]} y ${m.team2[1]}`;
      return `🏟️ Pista ${m.court}\n${line1}\n${line2}`;
    })
    .join('\n\n');

  const parts = [header, courts];

  if (pachanga.waiting.length > 0) {
    parts.push(`⏳ En espera: ${pachanga.waiting.join(', ')}`);
  }

  return parts.join('\n\n');
}
