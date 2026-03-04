'use client';

import { useState } from 'react';

interface Props {
  value: Date;
  onChange: (date: Date) => void;
}

const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

/** Returns the days to display in a Mon-first 6-week grid (includes padding nulls) */
function buildGrid(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun … 6=Sat
  // Convert to Mon-first offset (Mon=0 … Sun=6)
  const offset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(offset).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function DatePicker({ value, onChange }: Props) {
  const [cursor, setCursor] = useState<{ year: number; month: number }>({
    year: value.getFullYear(),
    month: value.getMonth(),
  });

  const today = new Date();
  const grid = buildGrid(cursor.year, cursor.month);

  const prevMonth = () => {
    setCursor((c) =>
      c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 },
    );
  };

  const nextMonth = () => {
    setCursor((c) =>
      c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 },
    );
  };

  const selectDay = (day: number) => {
    onChange(new Date(cursor.year, cursor.month, day, 12, 0, 0));
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 select-none">
      {/* Month/year navigator */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Mes anterior"
        >
          ‹
        </button>

        <span className="text-white font-bold text-sm capitalize tracking-wide">
          {MONTHS[cursor.month]} {cursor.year}
        </span>

        <button
          onClick={nextMonth}
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Mes siguiente"
        >
          ›
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-white/30 text-xs font-semibold py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {grid.map((day, idx) => {
          if (!day) {
            return <div key={idx} />;
          }

          const cellDate = new Date(cursor.year, cursor.month, day);
          const isSelected = isSameDay(cellDate, value);
          const isToday = isSameDay(cellDate, today);

          return (
            <button
              key={idx}
              type="button"
              onClick={() => selectDay(day)}
              className={`
                mx-auto w-8 h-8 rounded-full text-sm font-semibold
                flex items-center justify-center
                transition-all duration-150
                ${isSelected
                  ? 'bg-beer text-court font-black scale-110 shadow-lg'
                  : isToday
                    ? 'border border-beer/50 text-beer'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected date display */}
      <div className="mt-3 pt-3 border-t border-white/10 text-center">
        <span className="text-beer text-xs font-bold capitalize">
          {value.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      </div>
    </div>
  );
}
