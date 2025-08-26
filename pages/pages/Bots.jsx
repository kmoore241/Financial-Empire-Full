
import React from 'react';
import { SafeBot, AggressiveBot, ManualBot } from '@/components/bots/bots';

export default function Bots(){
  const [tab, setTab] = React.useState('safe');
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
      <div className="flex gap-2">
        {['safe','aggressive','manual'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={`px-3 py-2 rounded-lg border ${tab===t?'bg-gray-900 text-white dark:bg-white dark:text-black':''}`}>{t}</button>
        ))}
      </div>
      {tab==='safe' && <SafeBot />}
      {tab==='aggressive' && <AggressiveBot />}
      {tab==='manual' && <ManualBot />}
    </div>
  );
}
