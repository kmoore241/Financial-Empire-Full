
import React from 'react';
import SignalEngine from './SignalEngine';
import PositionManager from './PositionManager';
import RiskManager from './RiskManager';

export default function BotRuntime({ getPrice, account={balance:10000, riskPct:1}, symbol='BTC' }){
  const [pos, setPos] = React.useState(null);
  const [equity, setEq] = React.useState(account.balance);
  const [trades, setTrades] = React.useState([]);
  const [log, setLog] = React.useState([]);

  React.useEffect(()=>{
    const id = setInterval(()=>{
      const price = getPrice?.() ?? 100;
      const closes = (window.__closes ||= []);
      closes.push(price); if(closes.length>300) closes.shift();

      if(!pos){
        const sig = SignalEngine.maCross(closes, 10, 30);
        if(sig){
          const entry = price;
          const stop = sig==='long' ? price*0.98 : price*1.02;
          const p = PositionManager.open({ symbol, side:sig, entry, stop, account, trailPct:1, trailing:true });
          setPos(p); setLog(l=>[...l, `Open ${sig} @ ${entry.toFixed(2)}`]);
        }
      } else {
        const res = PositionManager.mark({ pos, price, trades, equity });
        if(res.closed){
          setTrades(res.trades); setEq(res.equity); setPos(null);
          setLog(l=>[...l, `Close @ ${price.toFixed(2)} PnL ${res.closed.pnl.toFixed(2)}`]);
        } else {
          setPos(res.updated);
        }
      }
    }, 1000);
    return ()=>clearInterval(id);
  }, [pos, trades, equity, account, symbol]);

  return (
    <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2">
      <div className="text-sm">Equity: <b className="tabular-nums">${equity.toFixed(2)}</b></div>
      <div className="text-xs text-gray-500">Pos: {pos? `${pos.side} ${symbol} trail ${pos.trail?pos.trail.toFixed(2):'—'}` : 'none'}</div>
      <div className="max-h-32 overflow-auto text-xs bg-gray-50 dark:bg-gray-900 p-2 rounded">
        {log.map((l,i)=><div key={i}>{l}</div>)}
      </div>
    </div>
  );
}
