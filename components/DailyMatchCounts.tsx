'use client';

import { useEffect, useState } from 'react';
import { matchStatsDay, subscribeToMatchCount } from '@/lib/matchStats';

export default function DailyMatchCounts() {
  const [day, setDay] = useState(matchStatsDay);

  return (
    <section aria-labelledby="daily-matches" className="mb-6 rounded-2xl border border-white/15 px-4 py-4">
      <h2 id="daily-matches" className="font-bold text-beer">Partidos generados</h2>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <label className="flex flex-col gap-1 text-sm text-white/80">
          Día de generación
          <input
            type="date"
            value={day}
            onChange={(event) => setDay(event.target.value)}
            className="rounded-lg border border-white/25 bg-court px-3 py-2 text-white scheme-dark focus-visible:outline-2 focus-visible:outline-beer"
          />
        </label>
        {day && <DailyCount key={day} day={day} />}
      </div>
    </section>
  );
}

function DailyCount({ day }: { day: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => subscribeToMatchCount(day, setCount, () => setFailed(true)), [day]);

  return (
    <p role="status" className="text-sm font-semibold tabular-nums text-white/90">
      {failed && 'No se pudo cargar el contador.'}
      {!failed && count === null && 'Consultando…'}
      {!failed && count !== null && `${count} ${count === 1 ? 'partido' : 'partidos'}`}
    </p>
  );
}
