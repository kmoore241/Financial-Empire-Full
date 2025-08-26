
import React from 'react';
import { Play, Pause, RotateCw, Bolt } from 'lucide-react';
import { getLS, setLS } from './storage';
import { DEFAULT_COINS, STORAGE_KEYS } from './defaults';

export default function BotControls({ running, setRunning, symbol, setSymbol }){
  const [mode, setMode] = React.useState(getLS(STORAGE_KEYS.mode, 'paper')); // 'paper' | 'backtest'
  const [coins] = React.useState(DEFAULT_COINS);

  React.useEffect(()=>setLS(STORAGE_KEYS.mode, mode), [mode]);

  return (
    <div className="p-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-wrap items-center gap-2">
      <select className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"
              value={symbol} onChange={e=>setSymbol(e.target.value)}>
        {coins.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <div className="ml-auto flex items-center gap-2">
        <label className="text-xs flex items-center gap-2">
          <Bolt size={14}/> Mode
          <select className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-1 text-xs"
                  value={mode} onChange={e=>setMode(e.target.value)}>
            <option value="paper">Paper</option>
            <option value="backtest">Backtest</option>
          </select>
        </label>
        <button onClick={()=>setRunning(true)} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black flex items-center gap-2 text-sm">
          <Play size={16}/> Start
        </button>
        <button onClick={()=>setRunning(false)} className="px-3 py-2 rounded-lg border flex items-center gap-2 text-sm">
          <Pause size={16}/> Pause
        </button>
        <button onClick={()=>window.location.reload()} className="px-3 py-2 rounded-lg border flex items-center gap-2 text-sm">
          <RotateCw size={16}/> Reset
        </button>
      </div>
    </div>
  );
}
