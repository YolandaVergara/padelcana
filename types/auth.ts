import type { User } from 'firebase/auth';

/**
 * Extend this interface in future phases to add roles, subscription tier, etc.
 */
export interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  // role: 'admin' | 'player'  ← example for next phase
}

export interface AuthContextValue {
  user: AuthUser | null;
  /** true while Firebase resolves the initial session */
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

/** Maps a raw Firebase User to our typed AuthUser */
export function toAuthUser(firebaseUser: User): AuthUser {
  return {
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName,
    email: firebaseUser.email,
    photoURL: firebaseUser.photoURL,
  };
}
