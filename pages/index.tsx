// pages/index.tsx (replace the top section)
import Link from "next/link";

export default function Home() {
  return (
    <div className="py-14">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-4xl/tight font-bold sm:text-5xl">
            Build wealth with <span className="text-brand">data-driven</span> trading
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Dashboards, bots, risk tools, news & academy — all in one platform.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl bg-brand px-5 py-3 text-white hover:opacity-90"
            >
              Open dashboard
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border px-5 py-3 hover:border-brand hover:text-brand"
            >
              See pricing
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border p-4">
          {/* Placeholder for a chart/screenshot */}
          <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-slate-50 to-slate-100" />
        </div>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Automated bots", "Deploy strategies and monitor PnL live."],
          ["Risk tools", "Position sizing and drawdown controls."],
          ["Academy", "Short, practical lessons with quizzes."],
        ].map(([title, desc]) => (
          <div key={title} className="rounded-2xl border p-6">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-slate-600">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
