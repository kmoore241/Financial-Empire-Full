
import React from 'react';

export default function HeadlinesGrid({ items=[] }){
  return (
    <div className="grid md:grid-cols-3 gap-3">
      {items.map(n => (
        <div key={n.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="text-xs uppercase text-gray-500">{n.source}</div>
          <div className="font-medium mt-1">{n.title}</div>
        </div>
      ))}
    </div>
  );
}
