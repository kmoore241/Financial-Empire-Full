import type { NextApiRequest, NextApiResponse } from 'next';

type Sentiment = {
  score: number;               // -1..1
  label: 'Bearish' | 'Neutral' | 'Bullish';
  breakdown?: { positive: number; neutral: number; negative: number }; // 0..1 sums≈1
};

const BACKEND = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Sentiment | { error: string }>) {
  if (BACKEND) {
    try {
      const r = await fetch(`${BACKEND}/sentiment`, { headers: { accept: 'application/json' } });
      if (!r.ok) return res.status(r.status).json({ error: `Upstream ${r.status}` });
      const data = (await r.json()) as Sentiment;
      return res.status(200).json(data);
    } catch {
      // f
