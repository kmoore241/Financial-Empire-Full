import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Automated bots",
      desc: "Deploy strategies and monitor PnL live.",
    },
    {
      title: "Risk tools",
      desc: "Position sizing, drawdown controls, and alerts.",
    },
    {
      title: "Academy",
      desc: "Short, practical lessons with quizzes.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-slate-50 to-white">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Build wealth with <span className="text-brand">data-driven</span> trading
          </h1>
          <p className="mt-4 text-slate-600">
            Dashboards, bots, risk tools, news & academy — all in one platform.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-lg bg-brand px-4 py-2 text-white"
            >
              Open dashboard
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-lg border px-4 py-2 hover:border-brand hover:text-brand"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border p-5 hover:shadow-sm">
            <h3 className="font-medium">{f.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
          </div>
        ))}
      </section>
    </>
  );
}
