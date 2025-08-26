
/**
 * Simple rule engines returning 'long' | 'short' | null
 */
function sma(series, len){
  const out=[]; let sum=0;
  for(let i=0;i<series.length;i++){
    sum+=series[i];
    if(i>=len) sum-=series[i-len];
    out[i]= i>=len-1? +(sum/len).toFixed(2): null;
  }
  return out;
}
export default {
  maCross(closes, fast=10, slow=30){
    const f=sma(closes, fast), s=sma(closes, slow);
    const i=closes.length-1;
    if(i<1 || f[i]==null || s[i]==null || f[i-1]==null || s[i-1]==null) return null;
    if(f[i]>s[i] && f[i-1]<=s[i-1]) return 'long';
    if(f[i]<s[i] && f[i-1]>=s[i-1]) return 'short';
    return null;
  },
  rsi(closes, len=14, lo=30, hi=70){
    const r=(arr,n)=>{
      let g=0,l=0; for(let i=1;i<=n;i++){ const ch=arr[i]-arr[i-1]; if(ch>0) g+=ch; else l+=-ch; }
      const rs = (g/n)/((l||1)/n); return 100-100/(1+rs);
    };
    if(closes.length<=len) return null;
    const slice = closes.slice(-len-1);
    const v = r(slice, len);
    if(v<lo) return 'long';
    if(v>hi) return 'short';
    return null;
  }
}
