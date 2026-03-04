import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Skip initialization during SSR prerendering when env vars are not available
const canInitialize = typeof window !== 'undefined' || !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const app = canInitialize
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : undefined;

export const auth = app ? getAuth(app) : ({} as ReturnType<typeof getAuth>);
export const googleProvider = new GoogleAuthProvider();
export const db = app ? getFirestore(app) : ({} as ReturnType<typeof getFirestore>);