
import React from 'react';

export default function Scorecard({ report }){
  if(!report) return null;
  return (
    <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 text-sm">
      <div className="font-medium mb-1">Bot Score: <span className="tabular-nums">{report.score.toFixed(1)}</span>/100</div>
      <div className="grid md:grid-cols-3 gap-2">
        <div>Trades: <b>{report.n}</b></div>
        <div>Win rate: <b>{report.winRate.toFixed(1)}%</b></div>
        <div>Total PnL: <b className={report.totalPnL>=0?'text-green-600':'text-red-500'}>${report.totalPnL.toFixed(2)}</b></div>
        <div>Avg trade: <b className={report.avgPnL>=0?'text-green-600':'text-red-500'}>${report.avgPnL.toFixed(2)}</b></div>
        <div>Max DD: <b>${report.drawdown.abs.toFixed(2)} ({report.drawdown.pct.toFixed(1)}%)</b></div>
      </div>
    </div>
  );
}
