
import React from 'react';

export default function NewsFeed({ items=[], onSelect }){
  return (
    <div className="space-y-2">
      {items.map(n => (
        <button key={n.id} onClick={()=>onSelect?.(n)} className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
          <div className="font-medium">{n.title}</div>
          <div className="text-xs text-gray-500">{n.source} • {n.time}</div>
        </button>
      ))}
    </div>
  );
}
