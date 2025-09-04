// src/components/dashboard/MarketSentiment.tsx
import * as React from 'react';
import useSWR from 'swr';
import { Card } from '@/components/ui';

type Breakdown = { bullish: number; bearish: number; neutral: number };
type SentimentResp = {
  score: number;                 // 0..1
  breakdown?: Partial<Breakdown> // each 0..1, may be missing
};

// local fetcher so this file is self-contained
const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json() as Promise<SentimentResp>;
  });

export default function MarketSentiment(): JSX.Element {
  const { data, error } = useSWR<SentimentResp>('/api/sentiment', fetcher);

  // Safe defaults while loading/error:
  const score = data?.score ?? 0.5;
  const breakdown: Breakdown = {
    bullish: 0,
    bearish: 0,
    neutral: 1,
    ...(data?.breakdown ?? {}),
  };

  // keep keys typed, avoid string indexing errors
  const rows = Object.entries(breakdown) as [keyof Breakdown, number][];

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">Market Sentiment</div>
        {error && <div className="text-xs text-red-500">offline</div>}
      </div>

      <div className="mt-2 text-2xl font-semibold tabular-nums">
        {Math.round(score * 100)}%
      </div>

      <div className="mt-4 space-y-3">
        {rows.map(([k, v]) => (
          <div key={k}>
            <div className="flex justify-between text-xs text-gray-500">
              <span className="capitalize">{k}</span>
              <span>{Math.round((v ?? 0) * 100)}%</span>
            </div>
            <div className="h-2 w-full rounded bg-gray-100 dark:bg-gray-800">
              <div
                className="h-2 rounded bg-gray-900 dark:bg-gray-100"
                style={{ width: `${Math.round((v ?? 0) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
