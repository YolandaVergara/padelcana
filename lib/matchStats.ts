import { addDoc, collection, getFirestore, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import { getFirebaseApp } from './firebase';

const madridDate = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Madrid',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function matchStatsDay(date = new Date()) {
  return madridDate.format(date);
}

function generations() {
  return collection(getFirestore(getFirebaseApp()), 'pachangaGenerations');
}

export async function recordGeneration(matchCount: number) {
  await addDoc(generations(), { matchCount, generatedAt: serverTimestamp() });
}

export function subscribeToMatchCount(day: string, onCount: (count: number) => void, onError: () => void) {
  const midnightUtc = new Date(`${day}T00:00:00Z`);
  // Include the preceding UTC evening, then bucket by Madrid time across DST changes.
  const start = new Date(midnightUtc.getTime() - 3 * 60 * 60 * 1000);
  const end = new Date(midnightUtc.getTime() + 24 * 60 * 60 * 1000);
  const dailyGenerations = query(generations(), where('generatedAt', '>=', start), where('generatedAt', '<', end));

  return onSnapshot(dailyGenerations, { includeMetadataChanges: true }, (snapshot) => {
    if (snapshot.metadata.fromCache) return;

    let count = 0;
    for (const document of snapshot.docs) {
      const { generatedAt, matchCount } = document.data();
      if (generatedAt && matchStatsDay(generatedAt.toDate()) === day) count += matchCount;
    }
    onCount(count);
  }, onError);
}
