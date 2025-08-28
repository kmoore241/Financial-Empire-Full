
export default async function ServicePinger(urls=[]){
  const out=[];
  for(const u of urls){
    const t0 = performance.now();
    try {
      await fetch(u, { method:'HEAD', mode:'no-cors' });
      const ms = Math.round(performance.now()-t0);
      out.push({ url:u, ok:true, ms });
    } catch (e){
      const ms = Math.round(performance.now()-t0);
      out.push({ url:u, ok:false, ms, error: e?.message });
    }
  }
  return out;
}
