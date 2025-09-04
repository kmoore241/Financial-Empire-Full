import type { NextApiRequest, NextApiResponse } from 'next';

type PnL = {
  equity: number;                     // current equity
  change: number;                     // absolute change from period start
  pct: number;                        // percentage change
  history: Array<{ t: number; eq: number }>; // simple equity curve
};

const BACKEND = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;

export default async function handler(_req: NextApiRequest, res: NextApiResponse<PnL | { error: string }>) {
  if (BACKEND) {
    try {
      const r = await fetch(`${BACKEND}/pnl`, { headers: { accept: 'application/json' } });
      if (!r.ok) return res.status(r.status).json({ error: `Upstream ${r.status}` });
      const data = (await r.json()) as PnL;
      return res.status(200).json(data);
    } catch {
      // fall back to mock
    }
  }

  // Mock: start at 10k, drift a bit
  const start = 10_000;
  const history: PnL['history'] = Array.from({ length: 20 }).map((_, i) => {
    const t = Date.now() - (19 - i) * 3_600_000;
    const eq = start + Math.sin(i / 3) * 120 + i * 15;
    return { t, eq: Math.round(eq * 100) / 100 };
    });
  const equity = history[history.length - 1].eq;
  const change = equity - history[0].eq;
  const pct = (change / history[0].eq) * 100;

  return res.status(200).json({ equity, change, pct, history });
}
