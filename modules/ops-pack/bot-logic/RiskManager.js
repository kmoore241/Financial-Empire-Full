
export default {
  sizeByRisk({ balance, riskPct, entry, stop }){
    const riskDollar = balance * (riskPct/100);
    const perUnit = Math.max(0.0000001, Math.abs(entry - stop));
    return Math.max(0, +(riskDollar / perUnit).toFixed(6));
  },
  trail(side, price, prev=null, pct=1){
    if(side==='long') return Math.max(prev ?? -Infinity, price*(1-pct/100));
    if(side==='short') return Math.min(prev ?? Infinity, price*(1+pct/100));
    return prev;
  }
}
