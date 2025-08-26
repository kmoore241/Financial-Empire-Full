
import React from 'react';
import KpiCard from './KpiCard';
import BroadcastNotice from './BroadcastNotice';
import ComplaintMonitor from './ComplaintMonitor';
import BugFeedbackTable from './BugFeedbackTable';
import GrowthTracker from './GrowthTracker';
import ScaleHeatmap from './ScaleHeatmap';
import AccessControl from './AccessControl';
import CouponCodes from './CouponCodes';
import MaintenanceMode from './MaintenanceMode';
import SecuritySettings from './SecuritySettings';
import SystemHealth from './SystemHealth';
import AuditLog from './AuditLog';
import { getLS } from './storage';

export default function AdminDashboard(){
  const [tab, setTab] = React.useState(getLS('fe:admin:activeTab', 'overview'));

  React.useEffect(()=>{
    const handler = () => setTab(localStorage.getItem('fe:admin:activeTab')?.replaceAll('"','') || 'overview');
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  },[]);

  return (
    <div className="space-y-6">
      {tab === 'overview' && (
        <>
          <div className="grid md:grid-cols-4 gap-3">
            <KpiCard title="Active Users" value="1,248" sub="+4.3% week" />
            <KpiCard title="New Trades" value="3,912" sub="24h" />
            <KpiCard title="Bug Open" value="12" sub="↓ 3 this week" />
            <KpiCard title="Uptime" value="99.9%" sub="last 30d" />
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <BroadcastNotice />
            <SystemHealth />
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <GrowthTracker />
            <ScaleHeatmap />
          </div>
          <AuditLog />
        </>
      )}

      {tab === 'users' && <AccessControl />}
      {tab === 'broadcast' && <BroadcastNotice />}
      {tab === 'complaints' && <ComplaintMonitor />}
      {tab === 'bugs' && <BugFeedbackTable />}
      {tab === 'growth' && <GrowthTracker />}
      {tab === 'heatmap' && <ScaleHeatmap />}
      {tab === 'coupons' && <CouponCodes />}
      {tab === 'maintenance' && <MaintenanceMode />}
      {tab === 'security' && <SecuritySettings />}
      {tab === 'health' && <SystemHealth />}
      {tab === 'audit' && <AuditLog />}
    </div>
  );
}
