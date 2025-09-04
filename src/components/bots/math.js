
export function calcPnL(side, entry, price, qty, fees=0){
  const diff = (side==='long' ? price - entry : entry - price) * qty;
  return diff - fees;
}
export function updateTrailingStop(side, trail, price, distance){
  // distance in % (e.g., 1 = 1%)
  if(side==='long'){
    const newTrail = Math.max(trail ?? -Infinity, price * (1 - distance/100));
    return newTrail;
  } else {
    const newTrail = Math.min(trail ?? Infinity, price * (1 + distance/100));
    return newTrail;
  }
}
export function positionValue(price, qty){ return price * qty; }
export function riskQty({balance, riskPct, entry, stop}){
  const riskDollar = balance * (riskPct/100);
  const perUnit = Math.max(0.0000001, Math.abs(entry - stop));
  return Math.max(0, +(riskDollar / perUnit).toFixed(6));
}
