
import React from 'react';

export default function KpiCard({ title, value, sub, right }) {
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500">{title}</div>
          <div className="text-2xl font-semibold mt-1">{value}</div>
          {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
        </div>
        {right}
      </div>
    </div>
  );
}
