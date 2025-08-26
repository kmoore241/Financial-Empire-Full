
import React from 'react';
import DrillLayout from './DrillLayout';
import DrillChart from './DrillChart';
import { genOHLC } from './utils/ohlc';

export default function VolumeBreakoutDrill(){
  const data = React.useMemo(()=>genOHLC('VOL', 220, 100), []);
  const [marks, setMarks] = React.useState([]);
  const [score, setScore] = React.useState(0);

  const onClick = (idx) => {
    const near = marks.find(m => Math.abs(m-idx)<=3);
    setMarks(near ? marks.filter(m => m!==near) : [...marks, idx]);
  };

  const assess = () => {
    // Detect simple volume spike + range breakout
    const events = [];
    const closes = data.map(d=>d.c);
    const vols = data.map(d=>d.v);
    const avgV = (i, w=20) => {
      let s=0, n=0;
      for(let k=Math.max(0,i-w+1); k<=i; k++){ s+=vols[k]; n++; }
      return s/Math.max(1,n);
    };
    for(let i=20;i<closes.length;i++){
      const spike = vols[i] > avgV(i-1)*1.8;
      const rangeHigh = Math.max(...closes.slice(i-20,i));
      const rangeLow = Math.min(...closes.slice(i-20,i));
      const breakoutUp = closes[i] > rangeHigh;
      const breakoutDown = closes[i] < rangeLow;
      if(spike && (breakoutUp || breakoutDown)) events.push(i);
    }
    let hit=0;
    marks.forEach(m => { if(events.find(e => Math.abs(e-m)<=3)) hit++; });
    const s = marks.length? (hit/marks.length)*100 : 0;
    setScore(s);
    localStorage.setItem('fe:drills:vol', JSON.stringify({ marks, score:s }));
    alert(`Score: ${Math.round(s)}%`);
  };

  return (
    <DrillLayout title="Volume Breakout" description="Click where you think volume-fueled breakouts occur." score={score}>
      <DrillChart data={data} onClick={onClick} />
      <div className="mt-3 flex items-center gap-2">
        <button onClick={assess} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Check</button>
        <button onClick={()=>setMarks([])} className="px-3 py-2 rounded-lg border">Clear</button>
      </div>
    </DrillLayout>
  );
}
