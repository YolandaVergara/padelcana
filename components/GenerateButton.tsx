'use client';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export default function GenerateButton({ onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        w-full rounded-xl bg-beer px-6 py-4
        text-court font-black text-lg uppercase tracking-wider
        shadow-lg transition-all duration-200
        hover:scale-[1.02] hover:shadow-2xl hover:brightness-105
        active:scale-[0.98]
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:brightness-100
      "
    >
      🎾 Generar Pachanga
    </button>
  );
}
