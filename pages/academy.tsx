// pages/academy.tsx
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
