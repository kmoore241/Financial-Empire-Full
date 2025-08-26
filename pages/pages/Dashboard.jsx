
import React from 'react';
import { PnLWidget } from '@/components/bots/bots';
import { NotificationBanner } from '@/components/common/common';

export default function Dashboard(){
  const [broadcast, setBroadcast] = React.useState('');
  const [active, setActive] = React.useState(false);
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setBroadcast(JSON.parse(localStorage.getItem('fe:admin:broadcast') || '""'));
      setActive(JSON.parse(localStorage.getItem('fe:admin:broadcast:active') || 'false'));
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
      {active && broadcast && <NotificationBanner message={broadcast} type="info" />}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
          <div className="text-sm text-gray-500">News Feed (placeholder)</div>
          <div className="mt-2 h-48 rounded-lg bg-gray-50 dark:bg-gray-900"></div>
        </div>
        <PnLWidget />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800">Recent Trades (placeholder)</div>
        <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800">Market Sentiment (placeholder)</div>
        <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800">Shortcuts (placeholder)</div>
      </div>
    </div>
  );
}
