import type { NextApiRequest, NextApiResponse } from 'next';

type Trade = {
  id: string;
  time: string;        // ISO
  symbol: string;
  side: 'BUY' | 'SELL';
  qty: number;
  price: number;
  pnl?: number;        // realized P&L for closed trades
};

const BACKEND = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Trade[] | { error: string }>) {
  if (BACKEND) {
    try {
      const r = await fetch(`${BACKEND}/trades`, { headers: { accept: 'application/json' } });
      if (!r.ok) return res.status(r.status).json({ error: `Upstream ${r.status}` });
      const data = (await r.json()) as Trade[];
      return res.status(200).json(data);
    } catch {
      // fall back to mock
    }
  }

  const now = Date.now();
  return res.status(200).json([
    { id: 't1', time: new Date(now - 15 * 60 * 1000).toISOString(), symbol: 'AAPL', side: 'BUY',  qty: 10, price: 227.5, pnl: 12.3 },
    { id: 't2', time: new Date(now - 45 * 60 * 1000).toISOString(), symbol: 'NVDA', side: 'SELL', qty: 2,  price: 118.4, pnl: -4.1 },
    { id: 't3', time: new Date(now - 90 * 60 * 1000).toISOString(), s
