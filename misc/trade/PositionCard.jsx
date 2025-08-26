
import React from 'react';

export default function PositionCard({ pos, onClose }){
  if(!pos) return null;
  const up = (pos.mark ?? pos.entry) >= pos.entry;
  return (
    <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <div className="font-medium">{pos.symbol} <span className="text-xs px-1 py-0.5 rounded border ml-1">{pos.side}</span></div>
        <div className={\`text-sm \${up?'text-green-600':'text-red-500'}\`}>{up?'+':''}{((pos.mark??pos.entry)-pos.entry).toFixed(2)}</div>
      </div>
      <div className="text-xs text-gray-500 mt-1">Entry ${pos.entry} • Stop ${pos.stop} • Qty {pos.qty}</div>
      <button onClick={()=>onClose?.(pos.id)} className="mt-2 px-2 py-1 rounded border text-sm">Close</button>
    </div>
  );
}
