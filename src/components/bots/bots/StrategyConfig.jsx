
import React from 'react';
import { getLS, setLS } from './storage';
import { STORAGE_KEYS } from './defaults';

export default function StrategyConfig({ keyName }){
  const [cfg, setCfg] = React.useState(getLS(STORAGE_KEYS.cfg, {
    safe: { maFast: 10, maSlow: 30, rsiBuy: 35, rsiSell: 65, trailPct: 1.2 },
    aggressive: { maFast: 7, maSlow: 18, rsiBuy: 40, rsiSell: 60, trailPct: 0.8 }
  }));

  const save = () => setLS(STORAGE_KEYS.cfg, cfg);

  const c = cfg[keyName] ?? {};

  return (
    <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h3 className="font-semibold mb-3">Strategy Config — {keyName}</h3>
      <div className="grid md:grid-cols-5 gap-2 text-sm">
        <label className="space-y-1"><div>MA Fast</div>
          <input type="number" value={c.maFast} onChange={e=>setCfg({...cfg, [keyName]:{...c, maFast:+e.target.value}})}
                 className="w-full rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"/></label>
        <label className="space-y-1"><div>MA Slow</div>
          <input type="number" value={c.maSlow} onChange={e=>setCfg({...cfg, [keyName]:{...c, maSlow:+e.target.value}})}
                 className="w-full rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"/></label>
        <label className="space-y-1"><div>RSI Buy</div>
          <input type="number" value={c.rsiBuy} onChange={e=>setCfg({...cfg, [keyName]:{...c, rsiBuy:+e.target.value}})}
                 className="w-full rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"/></label>
        <label className="space-y-1"><div>RSI Sell</div>
          <input type="number" value={c.rsiSell} onChange={e=>setCfg({...cfg, [keyName]:{...c, rsiSell:+e.target.value}})}
                 className="w-full rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"/></label>
        <label className="space-y-1"><div>Trail %</div>
          <input type="number" value={c.trailPct} onChange={e=>setCfg({...cfg, [keyName]:{...c, trailPct:+e.target.value}})}
                 className="w-full rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"/></label>
      </div>
      <button onClick={save} className="mt-3 px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Save</button>
    </div>
  );
}
