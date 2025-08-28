
import React from 'react';
import DrillLayout from './DrillLayout';
import DrillChart from './DrillChart';
import { genOHLC } from './utils/ohlc';

/**
 * Approximation: flag "order blocks" as short consolidations before strong push.
 * User marks where they think an OB formed; score checks proximity to detected zones.
 */
export default function SmartMoneyDrill(){
  const data = React.useMemo(()=>genOHLC('SMC', 240, 100), []);
  const closes = data.map(d=>d.c);
  const [marks, setMarks] = React.useState([]);
  const [score, setScore] = React.useState(0);

  const detectOrderBlocks = () => {
    const zones = []; // {idx, price}
    for(let i=5;i<closes.length-5;i++){
      const pre = closes.slice(i-5,i);
      const post = closes.slice(i,i+5);
      const tight = Math.max(...pre) - Math.min(...pre) < 2.0;
      const pushUp = post[4] - pre[0] > 2.5;
      const pushDown = pre[0] - post[4] > 2.5;
      if(tight && (pushUp || pushDown)){
        zones.push({ idx: i-1, price: closes[i-1] });
      }
    }
    return zones;
  };

  const onClick = (idx) => {
    const near = marks.find(m => Math.abs(m-idx)<=4);
    setMarks(near ? marks.filter(m => m!==near) : [...marks, idx]);
  };

  const assess = () => {
    const zones = detectOrderBlocks();
    let hit=0;
    marks.forEach(m => {
      if(zones.find(z => Math.abs(z.idx - m)<=6)) hit++;
    });
    const s = marks.length? (hit/marks.length)*100 : 0;
    setScore(s);
    localStorage.setItem('fe:drills:smc', JSON.stringify({ marks, score:s }));
    alert(`Score: ${Math.round(s)}%`);
  };

  return (
    <DrillLayout title="Smart Money Concepts (Order Blocks)" description="Mark likely order blocks: tight base before a strong push." score={score}>
      <DrillChart data={data} onClick={onClick} />
      <div className="mt-3 flex items-center gap-2">
        <button onClick={assess} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Check</button>
        <button onClick={()=>setMarks([])} className="px-3 py-2 rounded-lg border">Clear</button>
      </div>
    </DrillLayout>
  );
}
