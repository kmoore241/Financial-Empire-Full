
import React from 'react';
import { riskQty } from './math';
import { getLS } from './storage';
import { STORAGE_KEYS } from './defaults';

export default function TradeForm({ symbol, price, onSubmit }){
  const acct = getLS(STORAGE_KEYS.account, { balance: 10000, riskPct: 1, trailing: true });
  const [side, setSide] = React.useState('long');
  const [entry, setEntry] = React.useState(price || 0);
  const [stop, setStop] = React.useState(price ? +(price*0.98).toFixed(2) : 0);
  const qty = React.useMemo(()=>riskQty({ balance: acct.balance, riskPct: acct.riskPct, entry, stop }), [acct.balance, acct.riskPct, entry, stop]);

  React.useEffect(()=>setEntry(price), [price]);

  const submit = () => onSubmit?.({ symbol, side, entry:+entry, stop:+stop, qty:+qty.toFixed(6) });

  return (
    <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h4 className="font-semibold mb-2 text-sm">New Position</h4>
      <div className="grid md:grid-cols-5 gap-2 text-sm">
        <select value={side} onChange={e=>setSide(e.target.value)} className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2">
          <option value="long">Long</option>
          <option value="short">Short</option>
        </select>
        <input type="number" value={entry} onChange={e=>setEntry(+e.target.value)} className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2" placeholder="Entry"/>
        <input type="number" value={stop} onChange={e=>setStop(+e.target.value)} className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2" placeholder="Stop"/>
        <input type="number" value={qty} readOnly className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2" placeholder="Qty (risk-based)"/>
        <button onClick={submit} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Open</button>
      </div>
    </div>
  );
}
