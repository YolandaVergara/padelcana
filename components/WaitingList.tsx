import type { Player } from '@/types';

interface Props {
  players: Player[];
}

export default function WaitingList({ players }: Props) {
  if (players.length === 0) return null;

  return (
    <div className="bg-white/8 border border-white/15 rounded-2xl px-5 py-4">
      <h3 className="text-beer font-black text-sm uppercase tracking-widest mb-3">
        ⏳ En espera ({players.length})
      </h3>
      <div className="flex flex-wrap gap-2">
        {players.map((player, i) => (
          <span
            key={i}
            className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm font-medium border border-white/15"
          >
            {player}
          </span>
        ))}
      </div>
    </div>
  );
}
