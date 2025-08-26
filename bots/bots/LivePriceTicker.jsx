
import React from 'react';
import { makeTicker } from './feed';

export default function LivePriceTicker({ symbol, onTick }){
  const tickerRef = React.useRef(null);
  const [price, setPrice] = React.useState(0);

  React.useEffect(()=>{
    tickerRef.current = makeTicker(symbol, 100);
    setPrice(tickerRef.current.current());
  },[symbol]);

  React.useEffect(()=>{
    const id = setInterval(()=>{
      const p = tickerRef.current?.next() ?? 0;
      setPrice(p);
      onTick?.(p);
    }, 1000);
    return () => clearInterval(id);
  },[onTick]);

  return (
    <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
      <div className="text-sm">Live {symbol}/USD</div>
      <div className="text-xl font-semibold tabular-nums">${price.toFixed(2)}</div>
    </div>
  );
}
