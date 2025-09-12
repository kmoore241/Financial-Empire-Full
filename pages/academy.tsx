// pages/academy.tsx
import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'
type Lesson = { title: string; minutes: number };
type Track = { name: string; desc: string; lessons: Lesson[] };

const TRACKS: Track[] = [
  {
    name: "Foundations",
    desc: "Accounts, orders, and risk basics.",
    lessons: [
      { title: "Market vs limit", minutes: 6 },
      { title: "Position sizing", minutes: 8 },
      { title: "Stop losses", minutes: 7 },
    ],
  },
  {
    name: "Strategies",
    desc: "Momentum, mean reversion, and trend-following.",
    lessons: [
      { title: "Breakout rules", minutes: 9 },
      { title: "MA crossovers", minutes: 5 },
      { title: "RSI bands", minutes: 7 },
    ],
  },
];

export default function Academy() {
  return (
    <>
    <AppShell>
      <h1 className="text-2xl font-bold">Academy</h1>
      <ul className="mt-4 space-y-3">
        <li className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <div className="font-medium">Module 0 — Credibility in Trading</div>
          <div className="text-sm text-slate-400">Real vs fake traders • Spot-the-Scam quiz</div>
          <Link className="mt-2 inline-block text-blue-400" href="/course-detail">Open</Link>
        </li>
      </ul>
    </AppShell>
    
      <h1 className="text-2xl font-semibold">Academy</h1>
      <p className="mt-2 text-gray-600">Learn by doing. Short lessons, immediate practice.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {TRACKS.map((t) => (
          <div key={t.name} className="rounded-2xl border p-6">
            <h3 className="font-medium">{t.name}</h3>
            <p className="mt-1 text-gray-600">{t.desc}</p>
            <ul className="mt-4 space-y-2">
              {t.lessons.map((l) => (
                <li key={l.title} className="flex items-center justify-between rounded-xl border p-3">
                  <span>{l.title}</span>
                  <span className="text-xs text-gray-500">{l.minutes} min</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
