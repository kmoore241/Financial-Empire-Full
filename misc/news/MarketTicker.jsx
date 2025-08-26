
import React from 'react';

export default function MarketTicker({ symbols=[] }){
  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-gray-200 dark:border-gray-800 py-2 text-sm">
      <div className="animate-marquee inline-block">
        {symbols.map((s, i)=>(
          <span key={i} className="mx-4">{s.symbol}: <span className={s.change>=0?'text-green-600':'text-red-500'}>{s.price} ({s.change>=0?'+':''}{s.change}%)</span></span>
        ))}
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; will-change: transform; }
      `}</style>
    </div>
  );
}
