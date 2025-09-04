import type { NextApiRequest, NextApiResponse } from 'next';

const BACKEND = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Try proxy first (if a backend is configured)
  if (BACKEND) {
    try {
      const r = await fetch(`${BACKEND}/health`, { headers: { accept: 'application/json' } });
      const data = await r.json().catch(() => ({}));
      return res
        .status(r.ok ? 200 : r.status)
        .json(data ?? { status: r.ok ? 'ok' : 'error', upstreamStatus: r.status });
    } catch (e: any) {
      // fall through to local payload
    }
  }

  // Local fallback
  return res.status(200).json({
    status: 'ok',
    version: process.env.npm_package_version ?? '0.0.0',
    env: process.env.NEXT_PUBLIC_ENV ?? 'dev',
  });
}
