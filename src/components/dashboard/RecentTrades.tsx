import * as React from 'react';
import useSWR from 'swr';
import { jsonFetcher } from '@/lib/fetcher';
import { Card } from '@/components/ui';
type Trade = { id: string; time: string; symbol: string; side: 'BUY'|'SELL'; qty: number; price: number; pnl?: number; };
export default function RecentTrades() {
  const { data, error, isLoading } = useSWR<Trade[]>('/api/trades', jsonFetcher);
  return (
    <Card>
      <div className="mb-2 text-sm text-gray-500">Recent Trades</div>
      {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
      {error && <div className="text-sm text-red-600">Failed to load trades.</div>}
      {!!data?.length && (
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="py-1 text-left">Time</th>
              <th className="py-1 text-left">Symbol</th>
              <th className="py-1 text-left">Side</th>
              <th className="py-1 text-right">Qty</th>
              <th className="py-1 text-right">Price</th>
              <th className="py-1 text-right">PnL</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 6).map(t => (
              <tr key={t.id} className="border-t border-gray-100 dark:border-gray-800">
                <td className="py-1 pr-2">{new Date(t.time).toLocaleTimeString()}</td>
                <td className="py-1 pr-2">{t.symbol}</td>
                <td className="py-1 pr-2">{t.side}</td>
                <td className="py-1 pr-2 text-right tabular-nums">{t.qty}</td>
                <td className="py-1 pr-2 text-right tabular-nums">${t.price.toFixed(2)}</td>
                <td className={`py-1 text-right tabular-nums ${ (t.pnl ?? 0) >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {(t.pnl ?? 0) >= 0 ? '+' : ''}{(t.pnl ?? 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}
