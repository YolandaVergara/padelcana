/** Shape of a single match */
export interface PachangaMatch {
  court: number;
  team1: [string, string];
  team2: [string, string];
}

/** In-memory representation of a generated pachanga */
export interface Pachanga {
  date: Date;
  players: string[];
  matches: PachangaMatch[];
  waiting: string[];
}

/** Input data required to create a new pachanga */
export interface CreatePachangaInput {
  date: Date;
  players: string[];
}
