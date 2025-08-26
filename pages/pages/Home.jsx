
import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/common/common';

export default function Home(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
      <header className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-bold text-lg">Financial Empire</div>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/bots" className="hover:underline">Bots</Link>
          <Link href="/academy" className="hover:underline">Academy</Link>
          <Link href="/pricing" className="hover:underline">Pricing</Link>
          <ThemeToggle />
          <Link href="/login" className="px-3 py-1.5 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Login</Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Build your edge. Trade with confidence.</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Paper-trading bots, an AI-powered academy, and a clean dashboard that adapts to your style.</p>
            <div className="mt-6 flex gap-3">
              <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Launch App</Link>
              <Link href="/academy" className="px-4 py-2 rounded-lg border">Explore Academy</Link>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="h-64 rounded-xl bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
              <span className="text-sm text-gray-500">Preview — connect charts & API feeds later</span>
            </div>
          </div>
        </div>

        <section className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {t:'Bots', d:'Safe, Aggressive, and Manual paper trading.'},
            {t:'Academy', d:'Adaptive quizzes + drills to sharpen skills.'},
            {t:'Admin', d:'Growth, security, coupons, system health.'},
          ].map((c,i)=>(
            <div key={i} className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="font-semibold">{c.t}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{c.d}</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
