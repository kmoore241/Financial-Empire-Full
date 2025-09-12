// pages/news.tsx
import useSWR from "swr";
import AppShell from '@/components/layout/AppShell'
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function News() {
  const { data, error, isLoading } = useSWR("/api/news", fetcher);

  return (
    <>
     <AppShell>
      <h1 className="text-2xl font-bold">News</h1>
      <p className="mt-2 text-slate-300">Live feed integration coming. Showing demo headlines.</p>
      <ul className="mt-4 list-disc pl-5 text-slate-300">
        <li>Crypto fear/greed ticks to 61 (Greed)</li>
        <li>ETH L2 volumes up 14% WoW</li>
      </ul>
    </AppShell>
    
      <h1 className="text-2xl font-semibold">Market News</h1>
      {isLoading && <p className="mt-4 text-gray-500">Loading…</p>}
      {error && <p className="mt-4 text-red-600">Failed to load news.</p>}
      <div className="mt-6 grid gap-4">
        {data?.articles?.map((a: any) => (
          <a key={a.id ?? a.url} href={a.url} className="rounded-2xl border p-4 hover:bg-gray-50">
            <div className="text-sm text-gray-500">{a.source}</div>
            <div className="font-medium">{a.title}</div>
            <div className="text-sm text-gray-600 mt-1 line-clamp-2">{a.summary}</div>
          </a>
        ))}
      </div>
    </>
  );
}
