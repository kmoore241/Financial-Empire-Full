import * as React from 'react';
import useSWR from 'swr';
import { jsonFetcher } from '@/lib/fetcher';
import { Card } from '@/components/ui';
type Sentiment = { score: number; label: 'Bearish'|'Neutral'|'Bullish'; breakdown?: { positive: number; neutral: number; negative: number } };
export default function MarketSentiment() {
  const { data, error, isLoading } = useSWR<Sentiment>('/api/sentiment', jsonFetcher);
  return (
    <Card>
      <div className="text-sm text-gray-500">Market Sentiment</div>
      {isLoading && <div className="mt-2 text-sm text-gray-500">Loading…</div>}
      {error && <div className="mt-2 text-sm text-red-600">Failed to load sentiment.</div>}
      {data && (
        <div className="mt-2 space-y-2">
          <div className="text-lg font-semibold">{data.label}</div>
          {data.breakdown && (
            <div className="space-y-1">
              {(['positive','neutral','negative'] as const).map(k => (
                <div key={k}>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span className="capitalize">{k}</span>
                    <span>{Math.round((data.breakdown[k] ?? 0) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full rounded bg-gray-100 dark:bg-gray-800">
                    <div
                      className={`h-2 rounded ${k==='positive' ? 'bg-green-500' : k==='negative' ? 'bg-red-500' : 'bg-gray-400'}`}
                      style={{ width: `${(data.breakdown[k] ?? 0) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
