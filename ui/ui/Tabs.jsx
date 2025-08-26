
import React, { useState } from 'react';

export function Tabs({ tabs, defaultIndex = 0 }) {
  const [active, setActive] = useState(defaultIndex);
  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={\`px-4 py-2 -mb-px \${active === idx ? 'border-b-2 border-blue-600 font-bold' : 'text-gray-500'}\`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[active].content}</div>
    </div>
  );
}
