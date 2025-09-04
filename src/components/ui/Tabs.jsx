import React from 'react';

export default function Tabs({ tabs = [] }) {
  const [active, setActive] = React.useState(0);

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((t, idx) => (
          <button
            key={t?.id ?? idx}
            onClick={() => setActive(idx)}
            className={`px-4 py-2 -mb-px ${
              active === idx
                ? 'border-b-2 border-blue-600 font-bold'
                : 'text-gray-500'
            }`}
          >
            {t?.label ?? `Tab ${idx + 1}`}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs[active]?.content ?? null}
      </div>
    </div>
  );
}
