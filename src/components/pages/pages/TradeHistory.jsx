
import React from 'react';
import { STORAGE_KEYS } from '@/components/bots/bots/defaults';
import { exportCSV, exportJSON, getLS } from '@/components/bots/bots/storage';

export default function TradeHistory(){
  const [trades, setTrades] = React.useState([]);
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setTrades(getLS(STORAGE_KEYS.trades, []));
    }
  }, []);
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Closed Trades</h2>
        <div className="flex gap-2">
          <button className="px-2 py-1 rounded border" onClick={()=>exportCSV('trades.csv', trades)}>Export CSV</button>
          <button className="px-2 py-1 rounded border" onClick={()=>exportJSON('trades.json', trades)}>Export JSON</button>
        </div>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2">Symbol</th><th className="py-2">Side</th><th className="py-2">Entry</th><th className="py-2">Exit</th><th className="py-2">Qty</th><th className="py-2">PnL</th>
            </tr>
          </thead>
          <tbody>
            {trades.map(t => (
              <tr key={t.id} className="border-t border-gray-200 dark:border-gray-800">
                <td className="py-2 pr-4">{t.symbol}</td>
                <td className="py-2 pr-4">{t.side}</td>
                <td className="py-2 pr-4">${t.entry.toFixed(2)}</td>
                <td className="py-2 pr-4">${t.exit.toFixed(2)}</td>
                <td className="py-2 pr-4">{t.qty}</td>
                <td className={`py-2 pr-4 ${t.pnl>=0?'text-green-600':'text-red-500'}`}>${t.pnl.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
