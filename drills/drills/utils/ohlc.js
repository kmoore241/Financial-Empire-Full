
function hashCode(str){ let h=0; for(let i=0;i<str.length;i++){ h=((h<<5)-h)+str.charCodeAt(i); h|=0; } return Math.abs(h); }
function mulberry32(a){ return function(){ let t=a+=0x6D2B79F5; t=Math.imul(t^t>>>15, t|1); t^=t+Math.imul(t^t>>>7, t|61); return ((t^t>>>14)>>>0)/4294967296; } }

export function genOHLC(seed='DRILL', len=200, start=100){
  const rnd = mulberry32(hashCode(seed));
  let p = start + Math.floor(rnd()*20);
  const out = [];
  for(let i=0;i<len;i++){
    const o = p;
    const h = o + rnd()*2.5;
    const l = Math.max(0.01, o - rnd()*2.5);
    p = Math.max(0.01, o + (rnd()-0.5)*2 + (rnd()-0.5)*1.3);
    const c = p;
    const v = 100 + Math.floor(rnd()*400);
    out.push({ i, o:+o.toFixed(2), h:+h.toFixed(2), l:+l.toFixed(2), c:+c.toFixed(2), v });
  }
  return out;
}
