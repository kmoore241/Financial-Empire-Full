
import React from 'react';
import { genOHLC } from './feed';

function sma(arr, len, idx){
  const s = Math.max(0, idx-len+1);
  const win = arr.slice(s, idx+1).map(x=>x.c);
  if(win.length < len) return null;
  return +(win.reduce((a,b)=>a+b,0)/len).toFixed(2);
}

export default function BacktestPanel({ symbol='SOL', onResult }){
  const [res, setRes] = React.useState(null);

  const run = () => {
    const candles = genOHLC(symbol, 300, 100);
    const fast = 10, slow = 30;
    let side = null, entry=0, pnl=0, trades=0;
    candles.forEach((k,i)=>{
      const f = sma(candles, fast, i);
      const s = sma(candles, slow, i);
      if(!f || !s) return;
      if(f > s && side !== 'long'){ side='long'; entry=k.c; trades++; }
      if(f < s && side === 'long'){ pnl += k.c - entry; side=null; }
    });
    const result = { symbol, trades, pnl:+pnl.toFixed(2) };
    setRes(result);
    onResult?.(result);
  };

  return (
    <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Backtest (demo)</h3>
        <button onClick={run} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Run</button>
      </div>
      {res && (
        <div className="mt-3 text-sm">
          Trades: <b>{res.trades}</b> • PnL: <b className={res.pnl>=0?'text-green-600':'text-red-500'}>${res.pnl.toFixed(2)}</b>
        </div>
      )}
    </div>
  );
}
