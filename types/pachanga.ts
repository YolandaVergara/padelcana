import type { Timestamp } from 'firebase/firestore';

/** Shape stored in each match inside Firestore */
export interface FirestoreMatch {
  court: number;
  team1: string[];
  team2: string[];
}

/** Full Firestore document for a pachanga */
export interface PachangaDoc {
  date: Timestamp;
  createdBy: string;       // uid
  createdByName: string;   // displayName
  createdAt: Timestamp;
  players: string[];
  matches: FirestoreMatch[];
  waiting: string[];
}

/** PachangaDoc enriched with its Firestore document id */
export interface Pachanga extends PachangaDoc {
  id: string;
}

/** Input data required to create a new pachanga */
export interface CreatePachangaInput {
  date: Date;
  players: string[];
}
