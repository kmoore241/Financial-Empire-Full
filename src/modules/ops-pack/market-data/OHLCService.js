
export default {
  generate(symbol='BTC', n=200, start=100){
    let p = start;
    const out=[];
    for(let i=0;i<n;i++){
      const o=p, h=o+Math.random()*2, l=Math.max(0.01,o-Math.random()*2); p=Math.max(0.01,o+(Math.random()-0.5)*2);
      out.push({ i, o:+o.toFixed(2), h:+h.toFixed(2), l:+l.toFixed(2), c:+p.toFixed(2), v:100+Math.floor(Math.random()*400) });
    }
    return out;
  }
}
