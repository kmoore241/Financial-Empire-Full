// pages/pricing.tsx
import AppShell from '@/components/layout/AppShell'
export default function Pricing(){
  return (
    <AppShell>
      <h1 className="text-2xl font-bold">Pricing</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          ['Free','$0','Paper trading • Basic LMS'],
          ['Pro','$19/mo','Live feeds • Exports • Alerts'],
          ['Investor','$99/mo','Admin analytics • Priority features'],
        ].map(([name,price,feat])=>(
          <div key={name} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-sm text-slate-400">{name}</div>
            <div className="text-3xl font-semibold mt-1">{price}</div>
            <div className="text-sm text-slate-300 mt-2">{feat}</div>
            <button className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white">
              Select
            </button>
          </div>
        ))}
      </div>
    </AppShell>
  )
}
