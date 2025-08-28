
import React from 'react';
import DrillLayout from './DrillLayout';
import DrillChart from './DrillChart';
import { genOHLC } from './utils/ohlc';
import { SMA } from './utils/indicators';

export default function MACrossoverDrill(){
  const data = React.useMemo(()=>genOHLC('MA', 260, 100), []);
  const closes = data.map(d=>d.c);
  const fast = SMA(closes, 10);
  const slow = SMA(closes, 30);
  const [score, setScore] = React.useState(0);
  const [userMarks, setUserMarks] = React.useState([]);

  const onClick = (idx) => {
    // toggle mark near idx
    const near = userMarks.find(m => Math.abs(m-idx)<=3);
    setUserMarks(near ? userMarks.filter(m => m!==near) : [...userMarks, idx]);
  };

  const assess = () => {
    const crosses = [];
    for(let i=1;i<closes.length;i++){
      if(fast[i]!=null && slow[i]!=null && fast[i-1]!=null && slow[i-1]!=null){
        const up = fast[i]>slow[i] && fast[i-1]<=slow[i-1];
        const down = fast[i]<slow[i] && fast[i-1]>=slow[i-1];
        if(up || down) crosses.push(i);
      }
    }
    let hit=0;
    userMarks.forEach(m => {
      if(crosses.find(c => Math.abs(c-m)<=3)) hit++;
    });
    const s = userMarks.length? (hit/userMarks.length)*100 : 0;
    setScore(s);
    localStorage.setItem('fe:drills:ma', JSON.stringify({ userMarks, score:s }));
    alert(`Score: ${Math.round(s)}% (matched ${hit}/${userMarks.length})`);
  };

  return (
    <DrillLayout title="MA Crossover" description="Click where you believe golden/death cross events occur." score={score}>
      <DrillChart data={data} overlays={[{ points: fast, color: '#22c55e' }, { points: slow, color: '#ef4444' }]} onClick={onClick} />
      <div className="mt-3 flex items-center gap-2">
        <button onClick={assess} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Check</button>
        <button onClick={()=>setUserMarks([])} className="px-3 py-2 rounded-lg border">Clear</button>
      </div>
      <div className="mt-2 text-xs text-gray-500">Marks: {userMarks.length}</div>
    </DrillLayout>
  );
}
