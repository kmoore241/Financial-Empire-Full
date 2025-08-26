
import React from 'react';

export default function TradeHistoryTable({ rows=[] }){
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead><tr className="text-left text-gray-500">
          <th className="py-2">Symbol</th><th className="py-2">Side</th><th className="py-2">Entry</th><th className="py-2">Exit</th><th className="py-2">Qty</th><th className="py-2">PnL</th>
        </tr></thead>
        <tbody>
          {rows.map((t,i)=>(
            <tr key={i} className="border-t border-gray-200 dark:border-gray-800">
              <td className="py-2 pr-4">{t.symbol}</td>
              <td className="py-2 pr-4">{t.side}</td>
              <td className="py-2 pr-4">${(t.entry??0).toFixed?.(2) ?? t.entry}</td>
              <td className="py-2 pr-4">${(t.exit??0).toFixed?.(2) ?? t.exit}</td>
              <td className="py-2 pr-4">{t.qty}</td>
              <td className={\`py-2 pr-4 \${(t.pnl??0)>=0?'text-green-600':'text-red-500'}\`}>${(t.pnl??0).toFixed?.(2) ?? t.pnl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
