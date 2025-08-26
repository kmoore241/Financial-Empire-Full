
import React from 'react';
import { useAppContext } from '@/context/AppContext';

export default function Settings(){
  const { darkMode, toggleDarkMode } = useAppContext();
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold">Settings</h2>
      <div className="mt-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Theme</div>
            <div className="text-sm text-gray-500">Current: {darkMode}</div>
          </div>
          <button onClick={toggleDarkMode} className="px-3 py-2 rounded-lg border">Toggle</button>
        </div>
      </div>
    </div>
  );
}
