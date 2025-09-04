import React from 'react';
import dynamic from 'next/dynamic';
import { NotificationBanner } from '@/components/common/common';
import { Card } from '@/components/ui';
import NewsFeed from '@/components/dashboard/NewsFeed';
import RecentTrades from '@/components/dashboard/RecentTrades';
import MarketSentiment from '@/components/dashboard/MarketSentiment';
import Shortcuts from '@/components/dashboard/Shortcuts';
import PnLWidget from '@/components/bots/pnlwidget';

const PnLWidget = dynamic(() => import('@/components/bots/PnLWidget').then(m => m.PnLWidget), { ssr: false });

export default function Dashboard(): JSX.Element {
  const [broadcast, setBroadcast] = React.useState('');
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setBroadcast(JSON.parse(localStorage.getItem('fe:admin:broadcast') || '""'));
      setActive(JSON.parse(localStorage.getItem('fe:admin:broadcast:active') || 'false'));
    }
  }, []);

  return (
    <div className="space-y-4">
      {active && broadcast && <NotificationBanner message={broadcast} type="info" />}

      <div className="grid md:grid-cols-3 gap-4">
        <NewsFeed />
        <Card>
          <div className="text-sm text-gray-500">Performance</div>
          <div className="mt-3"><PnLWidget /></div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <RecentTrades />
        <MarketSentiment />
        <Shortcuts />
      </div>
    </div>
  );
}
