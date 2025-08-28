
export function SMA(arr, len){
  const out = new Array(arr.length).fill(null);
  let sum = 0;
  for(let i=0;i<arr.length;i++){
    sum += arr[i];
    if(i>=len){ sum -= arr[i-len]; }
    if(i>=len-1){ out[i] = +(sum/len).toFixed(2); }
  }
  return out;
}
export function EMA(arr, len){
  const out = new Array(arr.length).fill(null);
  const k = 2/(len+1);
  let ema = null;
  for(let i=0;i<arr.length;i++){
    const v = arr[i];
    ema = ema==null? v : v*k + ema*(1-k);
    if(i>=len-1) out[i] = +ema.toFixed(2);
  }
  return out;
}
export function RSI(arr, len=14){
  const out = new Array(arr.length).fill(null);
  let gains=0, losses=0;
  for(let i=1;i<arr.length;i++){
    const ch = arr[i]-arr[i-1];
    const g = ch>0? ch:0, l = ch<0? -ch:0;
    if(i<=len){ gains+=g; losses+=l; if(i===len){ const rs = (gains/len)/((losses||1)/len); out[i]=+(100-100/(1+rs)).toFixed(2);} }
    else {
      const prev = out[i-1];
      const avgG = ( (prev!=null? ((100/(100-prev))-1) : 0) ); // not exact; but continue with smoothed approach
      const avgGain = (gains - (arr[i-len]>arr[i-len-1]? arr[i-len]-arr[i-len-1]:0) + g)/len;
      const avgLoss = (losses - (arr[i-len]<arr[i-len-1]? arr[i-len-1]-arr[i-len]:0) + l)/len;
      const rs = avgLoss===0? 100 : avgGain/avgLoss;
      out[i] = +(100 - 100/(1+rs)).toFixed(2);
      gains += g; losses += l;
    }
  }
  return out;
}
export function MACD(arr, fast=12, slow=26, signalLen=9){
  const eFast = EMA(arr, fast);
  const eSlow = EMA(arr, slow);
  const macd = arr.map((_,i)=> (eFast[i]!=null && eSlow[i]!=null)? +(eFast[i]-eSlow[i]).toFixed(2) : null);
  const signal = EMA(macd.map(x=>x??0), signalLen);
  const hist = macd.map((m,i)=> (m!=null && signal[i]!=null)? +(m - signal[i]).toFixed(2) : null);
  return { macd, signal, hist };
}
