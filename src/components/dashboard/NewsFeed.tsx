import useSWR from 'swr';
import { formatDistanceToNowStrict } from 'date-fns';
import { Card, CardTitle } from '@/components/ui';
import { fetcher } from '@/lib/fetcher';
import type { NewsItem } from '@/pages/api/news';

export default function NewsFeed() {
  const { data, isLoading, error } = useSWR<NewsItem[]>('/api/news', fetcher);

  return (
    <Card className="md:col-span-2">
      <CardTitle>News Feed</CardTitle>
      <div className="mt-3 space-y-3">
        {isLoading && <div className="h-24 animate-pulse rounded-lg bg-gray-50" />}
        {error && <div className="text-red-600 text-sm">Failed to load news.</div>}
        {data?.map(n => (
          <a key={n.id} href={n.url} target="_blank" rel="noreferrer"
             className="block rounded-lg px-3 py-2 hover:bg-gray-50">
            <div className="font-medium">{n.title}</div>
            <div className="text-xs text-gray-500">
              {n.source} • {formatDistanceToNowStrict(new Date(n.publishedAt))} ago
            </div>
          </a>
        ))}
      </div>
    </Card>
  );
}
