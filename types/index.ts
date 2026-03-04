export type Player = string;

export interface Pair {
  player1: Player;
  player2: Player;
}

export interface Match {
  court: number;
  pair1: Pair;
  pair2: Pair;
}

export interface PachangaResult {
  matches: Match[];
  waiting: Player[];
}
