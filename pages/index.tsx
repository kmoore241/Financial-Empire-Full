import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl border bg-white p-8 md:p-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Build wealth with data-driven trading
          </h1>
          <p className="mt-3 text-gray-600">
            Dashboards, bots, risk tools, news & academy — all in one platform.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl bg-[--color-brand] px-4 py-2 text-white hover:opacity-90"
            >
              Open dashboard
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border px-4 py-2 hover:bg-gray-50"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Automated bots",
            desc: "Deploy strategies and monitor PnL live.",
          },
          {
            title: "Risk tools",
            desc: "Position sizing and drawdown controls.",
          },
          {
            title: "Academy",
            desc: "Short, practical lessons with quizzes.",
          },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border bg-white p-6">
            <h3 className="font-medium">{c.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{c.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
