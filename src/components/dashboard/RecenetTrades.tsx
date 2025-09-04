import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import type { TradeRow } from '@/pages/api/trades';
import { Card, CardTitle } from '@/components/ui';

export default function RecentTrades() {
  const { data, isLoading, error } = useSWR<TradeRow[]>('/api/trades', fetcher);

  return (
    <Card>
      <CardTitle>Recent Trades</CardTitle>
      <div className="mt-3">
        {isLoading && <div className="h-20 animate-pulse rounded-lg bg-gray-50" />}
        {error && <div className="text-red-600 text-sm">Failed to load trades.</div>}
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr><th className="text-left">Symbol</th><th>Side</th><th className="text-right">Qty</th><th className="text-right">Price</th></tr>
          </thead>
          <tbody>
            {data?.map(t => (
              <tr key={t.id} className="border-t">
                <td>{t.symbol}</td>
                <td className={t.side === 'BUY' ? 'text-emerald-600' : 'text-rose-600'}>{t.side}</td>
                <td className="text-right">{t.qty}</td>
                <td className="text-right">${t.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
