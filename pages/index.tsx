// pages/index.tsx
import Link from 'next/link'
import AppShell from '@/components/layout/AppShell'

export default function Home() {
  return (
    <AppShell>
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Build wealth with <span className="text-blue-400">data-driven trading</span>.
          </h1>
          <p className="mt-4 text-slate-300">
            Dashboards, bots, risk tools, news & academy — all in one platform.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/dashboard" className="rounded-lg bg-blue-600 px-4 py-2 text-white">Try the Demo</Link>
            <Link href="/pricing" className="rounded-lg border border-slate-700 px-4 py-2">See pricing</Link>
          </div>
          <p className="mt-3 text-xs text-slate-500">Paper trading only. Not financial advice.</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          {/* Placeholder “screenshot” card; replace with an actual image soon */}
          <div className="aspect-video rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 grid place-items-center">
            <span className="text-slate-400 text-sm">Dashboard preview</span>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          ['Automated bots','Deploy strategies and monitor PnL live.'],
          ['Risk tools','Position sizing, drawdown controls, alerts.'],
          ['Academy','Short, practical lessons with quizzes.'],
        ].map(([title, body]) => (
          <div key={title} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-slate-300">{body}</p>
          </div>
        ))}
      </section>
    </AppShell>
  )
}
