
import Risk from './RiskManager';

export default {
  open({ symbol, side, entry, stop, account, trailPct=1, trailing=true }){
    const qty = Risk.sizeByRisk({ balance: account.balance, riskPct: account.riskPct, entry, stop });
    return {
      id: 'p'+Date.now(), symbol, side, entry, stop, qty,
      trailing, trail: null, trailPct, openedAt: Date.now()
    };
  },
  mark({ pos, price, trades=[], equity=0 }){
    let closed=null, updated={...pos};
    if(pos.trailing){
      updated.trail = Risk.trail(pos.side, price, pos.trail, pos.trailPct);
    }
    if((pos.side==='long' && price <= (updated.trail ?? pos.stop)) ||
       (pos.side==='short' && price >= (updated.trail ?? pos.stop))){
      const pnl = (pos.side==='long' ? price - pos.entry : pos.entry - price)*pos.qty;
      closed = { ...pos, exit: price, pnl, closedAt: Date.now() };
      return { updated:null, closed, equity: +(equity + pnl).toFixed(2), trades:[closed, ...trades] };
    }
    return { updated, closed:null, equity, trades };
  }
}
