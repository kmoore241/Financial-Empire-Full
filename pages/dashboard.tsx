// pages/dashboard.tsx
import useSWR from "swr";
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

