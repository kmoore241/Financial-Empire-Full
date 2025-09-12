// pages/dashboard.tsx
import useSWR from "swr";
import AppShell from '@/components/layout/AppShell'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Dashboard() {
  const { data: pnl } = useSWR("/api/pnl", fetcher);
  const { data: trades } = useSWR("/api/trades", fetcher);
  const { data: sentiment } = useSWR("/api/sentiment", fetcher);

  return (
    <>
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <section className="mt-6 rounded-2xl border p-6">
        <h2 className="font-medium">PnL</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={pnl?.points ?? []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <AppShell>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-slate-300">Demo data is preloaded. No keys required.</p>
      {/* mount a tiny read-only PnL widget using seeded data so page looks alive */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="font-semibold">Paper PnL (Demo)</h3>
          <p className="text-sm text-slate-400 mt-1">Last 7 days: +3.4%</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="font-semibold">Positions (Demo)</h3>
          <ul className="text-sm text-slate-300 mt-2 list-disc pl-4">
            <li>SOL 1.2 — Avg $148</li>
            <li>ETH 0.3 — Avg $3,050</li>
          </ul>
        </div>
      </div>
    </AppShell>

      <section className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border p-6">
          <h2 className="font-medium">Recent trades</h2>
          <div className="mt-4 divide-y">
            {trades?.slice(0, 6)?.map((t: any, i: number) => (
              <div key={i} className="py-3 flex items-center justify-between text-sm">
                <span className="font-mono">{t.symbol}</span>
                <span className={t.pnl >= 0 ? "text-green-600" : "text-red-600"}>
                  {t.pnl >= 0 ? "+" : ""}
                  {t.pnl}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="font-medium">Sentiment</h2>
          <p className="mt-2 text-gray-600">
            Score: <span className="font-medium">{sentiment?.score ?? "—"}</span>
          </p>
          <p className="text-sm text-gray-500">{sentiment?.explanation}</p>
        </div>
      </section>
    </>
  );
}

