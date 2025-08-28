
import React from 'react';
import { useToasts } from './useToasts';

export default function Toaster(){
  const { toasts, dismiss } = useToasts() || { toasts: [] };
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map(t => (
        <div key={t.id} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black shadow flex items-center gap-3">
          <div className="text-sm">{t.message}</div>
          <button onClick={()=>dismiss(t.id)} className="text-xs opacity-70 hover:opacity-100">Dismiss</button>
        </div>
      ))}
    </div>
  );
}
