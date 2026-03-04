import type { Match } from '@/types';

interface Props {
  match: Match;
}

function PairDisplay({
  player1,
  player2,
  side,
}: {
  player1: string;
  player2: string;
  side: 'left' | 'right';
}) {
  const align = side === 'left' ? 'text-left' : 'text-right items-end';
  return (
    <div className={`flex flex-col gap-1.5 ${side === 'right' ? 'items-end' : ''}`}>
      <span className="font-bold text-gray-800 text-sm leading-tight">{player1}</span>
      <span className="font-bold text-gray-800 text-sm leading-tight">{player2}</span>
    </div>
  );
}

export default function MatchCard({ match }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-[1.01]">
      {/* Court header */}
      <div className="bg-court px-5 py-3 flex items-center justify-between">
        <span className="text-beer font-black text-base tracking-wide uppercase">
          Pista {match.court}
        </span>
        <span className="text-white/40 text-xs font-semibold tracking-widest uppercase">
          Pachanga
        </span>
      </div>

      {/* Match layout */}
      <div className="px-5 py-5 grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
        <PairDisplay
          player1={match.pair1.player1}
          player2={match.pair1.player2}
          side="left"
        />
        <div className="flex flex-col items-center gap-0.5">
          <span className="bg-court text-beer font-black text-xs px-3 py-1 rounded-full">
            VS
          </span>
        </div>
        <PairDisplay
          player1={match.pair2.player1}
          player2={match.pair2.player2}
          side="right"
        />
      </div>
    </div>
  );
}
