
import React from 'react';
import Header from '../components/misc/layout/Header';
import Footer from '../components/misc/layout/Footer';
import Sidebar from '../components/misc/layout/Sidebar';

export default function AppShell({ children }){
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
