import type { NextApiRequest, NextApiResponse } from 'next';

type NewsItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string; // ISO
};

const BACKEND = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;

export default async function handler(_req: NextApiRequest, res: NextApiResponse<NewsItem[] | { error: string }>) {
  if (BACKEND) {
    try {
      const r = await fetch(`${BACKEND}/news`, { headers: { accept: 'application/json' } });
      if (!r.ok) return res.status(r.status).json({ error: `Upstream ${r.status}` });
      const data = (await r.json()) as NewsItem[];
      return res.status(200).json(data);
    } catch (e: any) {
      // fall back to mock
    }
  }

  // Mock data so the UI renders
  const now = Date.now();
  return res.status(200).json([
    {
      id: 'n1',
      title: 'Markets edge higher as tech leads',
      url: 'https://example.com/news/1',
      source: 'ExampleWire',
      publishedAt: new Date(now - 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'n2',
      title: 'Energy stocks rally on supply concerns',
      url: 'https://example.com/news/2',
      source: 'Market Daily',
      publishedAt: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'n3',
      title: 'Fed commentary hints at data-dependence',
      url: 'https://example.com/news/3',
      source: 'Finance Post',
      publishedAt: new Date(now - 3 * 60 * 60 * 1000).toISOString(),
    },
  ]);
}
