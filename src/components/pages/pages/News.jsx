
import React from 'react';

export default function News(){
  const [q, setQ] = React.useState('');
  const [items] = React.useState([
    { id:1, title:'Markets steady ahead of CPI', source:'Wire', t:'Today' },
    { id:2, title:'Tech leads broad gains', source:'Wire', t:'Yesterday' },
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2">
        <input className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2" placeholder="Search news (placeholder)"
               value={q} onChange={e=>setQ(e.target.value)} />
        <button className="px-3 py-2 rounded-lg border">Search</button>
      </div>
      <div className="mt-4 space-y-2">
        {items.filter(i => i.title.toLowerCase().includes(q.toLowerCase())).map(i => (
          <div key={i.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="font-medium">{i.title}</div>
            <div className="text-xs text-gray-500">{i.source} • {i.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
