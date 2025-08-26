
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(){
  return (
    <header className="sticky top-0 z-40 bg-white/70 dark:bg-black/30 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold tracking-tight">Financial Empire</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/bots" className="hover:underline">Bots</Link>
          <Link to="/academy" className="hover:underline">Academy</Link>
          <Link to="/news" className="hover:underline">News</Link>
          <Link to="/settings" className="px-3 py-1.5 rounded-lg border">Settings</Link>
        </nav>
      </div>
    </header>
  );
}
