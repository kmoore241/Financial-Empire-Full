
import React from 'react';
import DrillLayout from './DrillLayout';
import DrillChart from './DrillChart';
import { genOHLC } from './utils/ohlc';
import { RSI, MACD } from './utils/indicators';

export default function RSIMACDDrill(){
  const data = React.useMemo(()=>genOHLC('RSI', 240, 100), []);
  const closes = data.map(d=>d.c);
  const rsi = RSI(closes, 14);
  const { macd, signal } = MACD(closes, 12, 26, 9);
  const [score, setScore] = React.useState(0);
  const [marks, setMarks] = React.useState([]);

  const onClick = (idx) => {
    const near = marks.find(m => Math.abs(m-idx)<=3);
    setMarks(near ? marks.filter(m => m!==near) : [...marks, idx]);
  };

  const assess = () => {
    // Conditions: RSI cross 30/70 and MACD cross zero or signal
    const events = [];
    for(let i=1;i<closes.length;i++){
      const r = rsi[i], rp = rsi[i-1];
      const m = macd[i], mp = macd[i-1];
      const s = signal[i], sp = signal[i-1];
      const rUp = rp!=null && r!=null && rp<30 && r>=30;
      const rDown = rp!=null && r!=null && rp>70 && r<=70;
      const mSigUp = m!=null && s!=null && mp!=null && sp!=null && m> s && mp<= sp;
      const mZeroUp = m!=null && mp!=null && m>0 && mp<=0;
      const mSigDown = m!=null && s!=null && mp!=null && sp!=null && m< s && mp>= sp;
      const mZeroDown = m!=null && mp!=null && m<0 && mp>=0;
      if(rUp || rDown || mSigUp || mZeroUp || mSigDown || mZeroDown) events.push(i);
    }
    let hit=0;
    marks.forEach(m => { if(events.find(e => Math.abs(e-m)<=3)) hit++; });
    const s = marks.length? (hit/marks.length)*100 : 0;
    setScore(s);
    localStorage.setItem('fe:drills:rsi', JSON.stringify({ marks, score:s }));
    alert(`Score: ${Math.round(s)}%`);
  };

  return (
    <DrillLayout title="RSI & MACD" description="Mark likely momentum reversal/cross events." score={score}>
      <DrillChart data={data} onClick={onClick} />
      <div className="mt-2 text-xs text-gray-500">Internal overlays used for scoring: RSI(14), MACD(12,26,9)</div>
      <div className="mt-3 flex items-center gap-2">
        <button onClick={assess} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Check</button>
        <button onClick={()=>setMarks([])} className="px-3 py-2 rounded-lg border">Clear</button>
      </div>
    </DrillLayout>
  );
}
