// pages/api/sentiment.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Sentiment = {
  score: number; // -1..1
  label: 'Bearish' | 'Neutral' | 'Bullish';
  breakdown?: { positive: number; neutral: number; negative: number };
};

const BACKEND = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Sentiment | { error: string }>
) {
  // Try proxying to your backend if configured
  if (BACKEND) {
    try {
      const r = await fetch(`${BACKEND}/sentiment`, { headers: { accept: 'application/json' } });
      if (!r.ok) return res.status(r.status).json({ error: `Upstream ${r.status}` });
      const data = (await r.json()) as Sentiment;
      return res.status(200).json(data);
    } catch {
      // fall through to mock below
    }
  }

  // Mock fallback so UI keeps working without a backend
  const score = 0.22;
  return res.status(200).json({
    score,
    label: score > 0.15 ? 'Bullish' : score < -0.15 ? 'Bearish' : 'Neutral',
    breakdown: { positive: 0.46, neutral: 0.34, negative: 0.20 },
  });
}
