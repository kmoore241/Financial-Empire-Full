
import React from 'react';
import { getLS, setLS } from './storage';
import { DEFAULT_ACCOUNT, STORAGE_KEYS } from './defaults';

export default function RiskSettings(){
  const [acct, setAcct] = React.useState(getLS(STORAGE_KEYS.account, DEFAULT_ACCOUNT));

  const save = () => setLS(STORAGE_KEYS.account, acct);

  return (
    <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h3 className="font-semibold mb-3">Risk Settings</h3>
      <div className="grid md:grid-cols-3 gap-2 text-sm">
        <label className="space-y-1">
          <div>Account Balance ($)</div>
          <input type="number" className="w-full rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"
                 value={acct.balance} onChange={e=>setAcct({...acct, balance:+e.target.value})}/>
        </label>
        <label className="space-y-1">
          <div>Risk per Trade (%)</div>
          <input type="number" className="w-full rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"
                 value={acct.riskPct} onChange={e=>setAcct({...acct, riskPct:+e.target.value})}/>
        </label>
        <label className="flex items-center gap-2 mt-6">
          <input type="checkbox" checked={acct.trailing} onChange={e=>setAcct({...acct, trailing:e.target.checked})}/>
          Enable Trailing Stop
        </label>
      </div>
      <button onClick={save} className="mt-3 px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Save</button>
    </div>
  );
}
