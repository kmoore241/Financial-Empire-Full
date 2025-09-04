import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import type { Sentiment } from '@/pages/api/sentiment';
import { Card, CardTitle } from '@/components/ui';

export default function MarketSentiment() {
  const { data } = useSWR<Sentiment>('/api/sentiment', fetcher);
  const score = data?.score ?? 50;
  const label = data?.label ?? 'Neutral';

  return (
    <Card>
      <CardTitle>Market Sentiment</CardTitle>
      <div className="mt-3">
        <div className="text-2xl font-semibold">{label}</div>
        <div className="mt-1 text-sm text-gray-500">Index: {score}/100</div>
        <div className="mt-3 h-2 rounded-full bg-gray-100">
          <div className="h-2 rounded-full bg-brand" style={{ width: `${score}%` }} />
        </div>
      </div>
    </Card>
  );
}
