
import React from 'react';
import { STORAGE_KEYS } from '@/components/bots/bots/defaults';
import { getLS, setLS } from '@/components/bots/bots/storage';

export default function Wallet(){
  const [acct, setAcct] = React.useState({ balance: 10000, riskPct: 1, trailing: true });
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setAcct(getLS(STORAGE_KEYS.account, { balance:10000, riskPct:1, trailing:true }));
    }
  }, []);

  const deposit = (amt) => { const next = { ...acct, balance: +(acct.balance + amt).toFixed(2) }; setAcct(next); setLS(STORAGE_KEYS.account, next); };
  const withdraw = (amt) => { const next = { ...acct, balance: Math.max(0, +(acct.balance - amt).toFixed(2)) }; setAcct(next); setLS(STORAGE_KEYS.account, next); };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
        <div className="text-xs uppercase text-gray-500">Paper Balance</div>
        <div className="text-3xl font-semibold tabular-nums mt-1">${acct.balance.toFixed(2)}</div>
      </div>
      <div className="flex gap-2">
        <button onClick={()=>deposit(500)} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Deposit $500</button>
        <button onClick={()=>withdraw(500)} className="px-3 py-2 rounded-lg border">Withdraw $500</button>
      </div>
    </div>
  );
}
