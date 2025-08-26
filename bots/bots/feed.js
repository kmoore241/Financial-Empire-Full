
/**
 * Deterministic pseudo-random feed seeded by symbol for stable demos.
 */
function hashCode(str){ let h=0; for(let i=0;i<str.length;i++){ h=((h<<5)-h)+str.charCodeAt(i); h|=0; } return Math.abs(h); }
function mulberry32(a){ return function(){ let t=a+=0x6D2B79F5; t=Math.imul(t^t>>>15, t|1); t^=t+Math.imul(t^t>>>7, t|61); return ((t^t>>>14)>>>0)/4294967296; } }

export function makeTicker(symbol, start=100){
  const seed = hashCode(symbol);
  const rnd = mulberry32(seed);
  let price = start + Math.floor(rnd()*50);
  return {
    next(){
      const drift = (rnd() - 0.5) * 0.8;   // small drift
      const vol = (rnd() - 0.5) * 1.8;     // volatility
      price = Math.max(0.01, price + drift + vol);
      return +price.toFixed(2);
    },
    current(){ return +price.toFixed(2); }
  };
}

export function genOHLC(symbol, points=200, start=100){
  const t = makeTicker(symbol, start);
  const out = [];
  for(let i=0;i<points;i++){
    const o = t.current();
    const h = o + Math.random()*2;
    const l = Math.max(0.01, o - Math.random()*2);
    const c = t.next();
    out.push({ t:i, o:+o.toFixed(2), h:+h.toFixed(2), l:+l.toFixed(2), c:+c.toFixed(2) });
  }
  return out;
}
