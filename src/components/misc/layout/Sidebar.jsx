
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to:'/dashboard', label:'Overview' },
  { to:'/bots', label:'Bots' },
  { to:'/wallet', label:'Wallet' },
  { to:'/trades', label:'Trades' },
  { to:'/academy', label:'Academy' },
  { to:'/news', label:'News' },
];

export default function Sidebar(){
  const { pathname } = useLocation();
  return (
    <aside className="hidden md:block w-56 shrink-0 h-screen sticky top-0 border-r border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-black/20 backdrop-blur">
      <div className="p-4 font-semibold">Menu</div>
      <nav className="px-2 space-y-1">
        {links.map(l => (
          <Link key={l.to} to={l.to}
                className={\`block px-3 py-2 rounded-lg text-sm \${pathname===l.to ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:hover:bg-gray-900'}\`}>
            {l.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
