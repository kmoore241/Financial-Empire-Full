
import React from 'react';
export default function ScoreBadge({ score=0 }){
  const color = score>=80? 'bg-green-500' : score>=50? 'bg-yellow-500' : 'bg-gray-400';
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <div className="tabular-nums">{Math.round(score)}%</div>
    </div>
  );
}
