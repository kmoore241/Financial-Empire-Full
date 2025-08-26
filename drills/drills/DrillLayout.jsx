
import React from 'react';
import ScoreBadge from './ScoreBadge';

export default function DrillLayout({ title, description, children, score }){
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          {description && <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>}
        </div>
        <ScoreBadge score={score} />
      </div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
        {children}
      </div>
    </div>
  );
}
