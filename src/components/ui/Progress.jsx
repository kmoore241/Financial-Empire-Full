
import React from 'react';

export default function Progress({ value, max = 100 }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="bg-blue-600 h-2 rounded-full" style={{ width: \`\${percentage}%\` }}></div>
    </div>
  );
}
