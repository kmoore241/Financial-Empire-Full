
import React from 'react';
import { Activity, BarChart3, Bell, Bug, Cog, KeySquare, LayoutDashboard, Lock, Shield, Tickets, Users } from 'lucide-react';
import { getLS, setLS } from './storage';

const navItems = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'users', label: 'Access Control', icon: Users },
  { key: 'broadcast', label: 'Broadcast', icon: Bell },
  { key: 'complaints', label: 'Complaints', icon: Bug },
  { key: 'bugs', label: 'Bug Reports', icon: Activity },
  { key: 'growth', label: 'Growth Tracker', icon: BarChart3 },
  { key: 'heatmap', label: 'Scale Heatmap', icon: BarChart3 },
  { key: 'coupons', label: 'Coupons', icon: Tickets },
  { key: 'maintenance', label: 'Maintenance', icon: KeySquare },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'health', label: 'System Health', icon: Lock },
  { key: 'audit', label: 'Audit Log', icon: Cog },
];

export default function AdminSidebar() {
  const [active, setActive] = React.useState(getLS('fe:admin:activeTab', 'overview'));

  React.useEffect(() => setLS('fe:admin:activeTab', active), [active]);

  return (
    <aside className="hidden md:flex md:flex-col w-64 h-screen sticky top-0 border-r border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/20 backdrop-blur">
      <div className="p-4 text-xl font-semibold tracking-tight">Admin</div>
      <nav className="flex-1 overflow-y-auto px-2 space-y-1">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition
              ${active === key ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:hover:bg-gray-900'}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="p-3 text-xs text-gray-500">v2.0 dashboard</div>
    </aside>
  );
}
