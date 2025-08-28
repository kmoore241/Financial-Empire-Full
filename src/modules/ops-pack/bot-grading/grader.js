
/**
 * Evaluates bot performance using common KPIs.
 * Expects trades: [{pnl, entry, exit, openedAt, closedAt}]
 */
function drawdown(equity){
  let peak = equity[0]?.eq ?? 0, dd=0;
  for(const p of equity){ peak=Math.max(peak,p.eq); dd=Math.max(dd, peak-p.eq); }
  return { abs: dd, pct: peak? (dd/peak)*100 : 0 };
}
export default {
  score({ trades=[], equity=[] }){
    const n = trades.length;
    const wins = trades.filter(t=>t.pnl>0).length;
    const winRate = n? (wins/n)*100 : 0;
    const totalPnL = trades.reduce((a,b)=>a+(b.pnl||0),0);
    const avgPnL = n? totalPnL/n : 0;
    const dd = drawdown(equity);
    // naive score: reward pnl + winrate, penalize drawdown
    const score = Math.max(0, Math.min(100, (winRate*0.4) + (avgPnL>0? 20:0) + Math.min(30, totalPnL/100) - (dd.pct*0.3)));
    return { n, wins, winRate, totalPnL, avgPnL, drawdown:dd, score };
  }
}
