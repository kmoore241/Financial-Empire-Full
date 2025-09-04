
import React from 'react';
import { getLS } from './storage';
import { STORAGE_KEYS } from './defaults';

export default function PnLWidget(){
  const account = getLS(STORAGE_KEYS.account, { balance:10000 });
  const equity = getLS(STORAGE_KEYS.equity, [{ t: Date.now(), eq: account.balance }]);
  const last = equity[equity.length-1]?.eq ?? account.balance;
  const change = last - (equity[0]?.eq ?? account.balance);
  const pct = ((change) / (equity[0]?.eq ?? 1)) * 100;

  return (
    <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="text-xs uppercase tracking-wider text-gray-500">Equity</div>
      <div className="text-2xl font-semibold tabular-nums mt-1">${last.toFixed(2)}</div>
      <div className={`text-xs mt-1 ${change>=0?'text-green-600':'text-red-500'}`}>
        {change>=0?'+':''}${change.toFixed(2)} ({pct.toFixed(2)}%)
      </div>
    </div>
  );
}
