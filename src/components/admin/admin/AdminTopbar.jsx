
import React from 'react';
import { Moon, Sun, Search, Bell } from 'lucide-react';

export default function AdminTopbar() {
  const [dark, setDark] = React.useState(() => document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      setDark(false);
    } else {
      root.classList.add('dark');
      setDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/60 dark:bg-black/30 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="font-semibold">Financial Empire — Admin</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input className="pl-8 pr-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 outline-none text-sm"
                   placeholder="Search settings, users, logs..." />
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"><Bell size={18} /></button>
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900">
            {dark ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
        </div>
      </div>
    </header>
  );
}
