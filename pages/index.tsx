// pages/index.tsx
export default function Home() {
  return (
    <>
      <section className="py-16">
        <h1 className="text-3xl md:text-5xl font-semibold">
          Build wealth with data-driven trading
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl">
          Dashboards, bots, news & academy — all in one platform.
        </p>
        <div className="mt-6 flex gap-3">
          <a className="rounded-xl px-4 py-2 bg-black text-white" href="/dashboard">Open dashboard</a>
          <a className="rounded-xl px-4 py-2 border" href="/pricing">See pricing</a>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          { t: "Automated bots", d: "Deploy strategies and monitor PnL live." },
          { t: "Risk tools", d: "Position sizing and drawdown controls." },
          { t: "Academy", d: "Short, practical lessons with quizzes." },
        ].map((x) => (
          <div key={x.t} className="rounded-2xl border p-6">
            <h3 className="font-medium">{x.t}</h3>
            <p className="mt-2 text-gray-600">{x.d}</p>
          </div>
        ))}
      </section>
    </>
  );
}
