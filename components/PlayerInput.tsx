'use client';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function PlayerInput({ value, onChange }: Props) {
  const count = value.split('\n').filter((p) => p.trim()).length;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-beer font-bold text-sm uppercase tracking-widest">
        Jugadores{' '}
        {count > 0 && (
          <span className="text-white/50 normal-case tracking-normal font-normal">
            ({count})
          </span>
        )}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={'Carlos\nLaura\nMiguel\nSofía\n...'}
        rows={8}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-beer resize-none font-medium leading-6"
      />
    </div>
  );
}
