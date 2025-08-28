
/**
 * Mock price feed service (client-side). Replace with WebSocket/REST later.
 */
function hashCode(str){ let h=0; for(let i=0;i<str.length;i++){ h=((h<<5)-h)+str.charCodeAt(i); h|=0; } return Math.abs(h); }
function mulberry32(a){ return function(){ let t=a+=0x6D2B79F5; t=Math.imul(t^t>>>15, t|1); t^=t+Math.imul(t^t>>>7, t|61); return ((t^t>>>14)>>>0)/4294967296; } }

export default {
  makeTicker(symbol='BTC', start=100){
    const rnd = mulberry32(hashCode(symbol));
    let price = start + Math.floor(rnd()*50);
    const next = () => {
      const drift = (rnd() - 0.5) * 0.6;
      const vol = (rnd() - 0.5) * 1.6;
      price = Math.max(0.01, price + drift + vol);
      return +price.toFixed(2);
    };
    return { current: () => +price.toFixed(2), next };
  }
}
