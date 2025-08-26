
import React from 'react';
import { SafeBot, AggressiveBot, ManualBot } from '../../components/bots';
import { useBot } from '../../contexts/BotContext';

/**
 * High-level switcher that keeps a single source of truth for which bot is "active"
 * across the app (via BotContext). Composes bot UI components.
 */
export default function BotOrchestrator(){
  const { activeBot, setActiveBot } = useBot();
  const tab = activeBot ?? 'safe';

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {['safe','aggressive','manual'].map(t => (
          <button key={t} onClick={()=>setActiveBot(t)}
            className={`px-3 py-2 rounded-lg border ${tab===t ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : ''}`}>
            {t}
          </button>
        ))}
      </div>
      {tab==='safe' && <SafeBot />}
      {tab==='aggressive' && <AggressiveBot />}
      {tab==='manual' && <ManualBot />}
    </div>
  );
}
