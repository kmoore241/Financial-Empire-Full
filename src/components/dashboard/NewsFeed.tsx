import * as React from 'react';
import useSWR from 'swr';
import { jsonFetcher } from '@/lib/fetcher';
import { Card } from '@/components/ui';
type NewsItem = { title: string; url: string; source?: string; publishedAt?: string };
export default function NewsFeed() {
  const { data, error, isLoading } = useSWR<NewsItem[]>('/api/news', jsonFetcher);
  return (
    <Card className="md:col-span-2">
      <div className="text-sm text-gray-500">News Feed</div>
      {isLoading && (
        <div className="mt-3 space-y-2">
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
        </div>
      )}
      {error && <div className="mt-3 text-sm text-red-600">Failed to load news.</div>}
      {!!data?.length && (
        <ul className="mt-3 space-y-3">
          {data.slice(0, 6).map((n, i) => (
            <li key={i} className="leading-snug">
              <a className="text-blue-600 hover:underline" href={n.url} target="_blank" rel="noreferrer">
                {n.title}
              </a>
              <div className="text-xs text-gray-500">
                {n.source ?? 'Source'}{n.publishedAt ? ` • ${new Date(n.publishedAt).toLocaleString()}` : ''}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
