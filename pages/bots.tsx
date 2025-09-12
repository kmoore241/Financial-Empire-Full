// pages/bots.tsx
import AppShell from '@/components/layout/AppShell'
export default function Bots() {
  return (
    <AppShell>
      <h1 className="text-2xl font-bold">Bots</h1>
      <p className="mt-2 text-slate-300">Safe • Aggressive • Manual (demo profiles).</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ['SafeBot','Risk-adjusted swing entries with tight stops.'],
          ['AggressiveBot','Momentum scalps; higher drawdown ceiling.'],
          ['Manual','You control entries; coach grades decisions.'],
        ].map(([t,d])=>(
          <div key={t} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="font-semibold">{t}</h3>
            <p className="text-sm text-slate-300 mt-2">{d}</p>
          </div>
        ))}
      </div>
    </AppShell>
  )
}