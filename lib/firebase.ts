import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'REMOVED',
  authDomain: 'padelcana-2635f.firebaseapp.com',
  projectId: 'padelcana-2635f',
  storageBucket: 'padelcana-2635f.firebasestorage.app',
  messagingSenderId: '30514981866',
  appId: '1:30514981866:web:9cd35f4fcc1d8387ea2093',
  measurementId: 'G-VSYZE4R68F',
};

// Prevent re-initializing on hot reload
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);