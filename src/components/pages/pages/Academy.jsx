
import React from 'react';
import Link from 'next/link';

const COURSES = [
  { id:'drills', title:'Core Trading Drills', desc:'Practice SR, MA crosses, RSI/MACD, volume breakouts.' },
  { id:'risk', title:'Risk & Money Management', desc:'Position sizing, drawdown control, journaling.' },
  { id:'news', title:'News & Sentiment', desc:'Use headlines, risk events, and macro context.' },
];

export default function Academy(){
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold">Academy</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {COURSES.map(c => (
          <Link href={`/academy/${c.id}`} key={c.id} className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
            <div className="font-medium">{c.title}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{c.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
