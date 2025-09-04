
import React from 'react';
import { calcPnL, updateTrailingStop } from './math';
import { exportCSV, exportJSON, getLS, setLS } from './storage';
import { STORAGE_KEYS } from './defaults';

export default function PositionTable({ price }){
  const [open, setOpen] = React.useState(getLS(STORAGE_KEYS.open, []));
  const [trades, setTrades] = React.useState(getLS(STORAGE_KEYS.trades, []));
  const [equity, setEquity] = React.useState(getLS(STORAGE_KEYS.equity, [{ t: Date.now(), eq: getLS(STORAGE_KEYS.account, {balance:10000}).balance }]));

  React.useEffect(()=>{
    setLS(STORAGE_KEYS.open, open);
    setLS(STORAGE_KEYS.trades, trades);
    setLS(STORAGE_KEYS.equity, equity);
  },[open, trades, equity]);

  // Update trailing and check stops on price changes
  React.useEffect(()=>{
    if(!price || !open.length) return;
    setOpen(prev => prev.map(p => {
      let trail = p.trail;
      if(p.trailing){
        trail = updateTrailingStop(p.side, trail, price, p.trailPct ?? 1);
      }
      let hit = false;
      if(p.side==='long' && price <= (trail ?? p.stop)) hit = true;
      if(p.side==='short' && price >= (trail ?? p.stop)) hit = true;
      if(hit){
        const exit = price;
        const pnl = calcPnL(p.side, p.entry, exit, p.qty);
        const closed = { ...p, exit, pnl, closedAt: Date.now() };
        const nextTrades = [closed, ...trades];
        setTrades(nextTrades);
        const lastEq = equity[equity.length-1]?.eq ?? 10000;
        const nextEq = lastEq + pnl;
        setEquity([...equity, { t: Date.now(), eq: +nextEq.toFixed(2) }]);
        return null; // remove
      }
      return { ...p, trail };
    }).filter(Boolean));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[price]);

  const closeNow = (id) => {
    const p = open.find(x=>x.id===id);
    if(!p) return;
    const exit = price ?? p.entry;
    const pnl = calcPnL(p.side, p.entry, exit, p.qty);
    const closed = { ...p, exit, pnl, closedAt: Date.now() };
    const nextTrades = [closed, ...trades];
    setTrades(nextTrades);
    setOpen(open.filter(x=>x.id!==id));
    const lastEq = equity[equity.length-1]?.eq ?? 10000;
    setEquity([...equity, { t: Date.now(), eq: +(lastEq + pnl).toFixed(2) }]);
  };

  const removeTrade = (id) => setTrades(trades.filter(t=>t.id!==id));

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-sm">Open Positions</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead><tr className="text-left text-gray-500">
              <th className="py-2">Symbol</th><th className="py-2">Side</th><th className="py-2">Entry</th><th className="py-2">Stop/Trail</th><th className="py-2">Qty</th><th className="py-2">Unreal PnL</th><th></th>
            </tr></thead>
            <tbody>
              {open.map(p => (
                <tr key={p.id} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="py-2 pr-4">{p.symbol}</td>
                  <td className="py-2 pr-4">{p.side}</td>
                  <td className="py-2 pr-4">${p.entry.toFixed(2)}</td>
                  <td className="py-2 pr-4">{p.trailing ? (p.trail ? `$${p.trail.toFixed(2)}` : '—') : `$${p.stop.toFixed(2)}`}</td>
                  <td className="py-2 pr-4">{p.qty}</td>
                  <td className="py-2 pr-4">${calcPnL(p.side, p.entry, price ?? p.entry, p.qty).toFixed(2)}</td>
                  <td className="py-2"><button onClick={()=>closeNow(p.id)} className="px-2 py-1 rounded border">Close</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-sm">Closed Trades</h4>
          <div className="flex gap-2">
            <button className="px-2 py-1 rounded border" onClick={()=>exportCSV('trades.csv', trades)}>Export CSV</button>
            <button className="px-2 py-1 rounded border" onClick={()=>exportJSON('trades.json', trades)}>Export JSON</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead><tr className="text-left text-gray-500">
              <th className="py-2">Symbol</th><th className="py-2">Side</th><th className="py-2">Entry</th><th className="py-2">Exit</th><th className="py-2">Qty</th><th className="py-2">PnL</th><th></th>
            </tr></thead>
            <tbody>
              {trades.map(t => (
                <tr key={t.id} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="py-2 pr-4">{t.symbol}</td>
                  <td className="py-2 pr-4">{t.side}</td>
                  <td className="py-2 pr-4">${t.entry.toFixed(2)}</td>
                  <td className="py-2 pr-4">${t.exit.toFixed(2)}</td>
                  <td className="py-2 pr-4">{t.qty}</td>
                  <td className={`py-2 pr-4 ${t.pnl>=0?'text-green-600':'text-red-500'}`}>${t.pnl.toFixed(2)}</td>
                  <td className="py-2"><button onClick={()=>removeTrade(t.id)} className="px-2 py-1 rounded border">Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
