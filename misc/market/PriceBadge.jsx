
import React from 'react';
import MiniSparkline from '../charts/MiniSparkline';

export default function PriceBadge({ symbol='BTC', price=100, change=0.5, series=[] }){
  return (
    <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center gap-3">
      <div className="font-medium">{symbol}</div>
      <div className="tabular-nums">${price.toFixed?.(2) ?? price}</div>
      <div className={\`text-sm \${change>=0?'text-green-600':'text-red-500'}\`}>{change>=0?'+':''}{change}%</div>
      <MiniSparkline data={series} />
    </div>
  );
}
