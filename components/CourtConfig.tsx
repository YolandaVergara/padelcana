'use client';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function CourtConfig({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-beer font-bold text-sm uppercase tracking-widest">
        Número de pistas
      </label>
      <input
        type="number"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Math.max(1, parseInt(e.target.value) || 1))}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-beer text-xl font-bold"
      />
    </div>
  );
}
