import React from 'react';

export default function Progress({ value = 0, max = 100 }) {
  const percentage = Math.max(0, Math.min(100, (value / (max || 1)) * 100));

  return (
    <div className="w-full bg-gray-200 rounded">
      <div
        className="bg-blue-600 h-2 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
