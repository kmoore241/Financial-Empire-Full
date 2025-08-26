
import React from 'react';
import Link from 'next/link';
export default function NotFound(){
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-6xl">🧭</div>
      <h2 className="mt-3 text-xl font-semibold">Page not found</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Try going back home.</p>
      <Link href="/" className="mt-4 px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Home</Link>
    </div>
  );
}
