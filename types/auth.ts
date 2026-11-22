import type { User } from 'firebase/auth';

export interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isAdmin: boolean;
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
    isAdmin: firebaseUser.emailVerified && firebaseUser.email === 'yv.avila@gmail.com',
  };
}
