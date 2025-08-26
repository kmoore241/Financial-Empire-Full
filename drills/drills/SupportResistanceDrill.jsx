
import React from 'react';
import DrillLayout from './DrillLayout';
import DrillChart from './DrillChart';
import { genOHLC } from './utils/ohlc';

export default function SupportResistanceDrill(){
  const data = React.useMemo(()=>genOHLC('SR', 220, 100), []);
  const [levels, setLevels] = React.useState([]); // {idx, price}
  const [score, setScore] = React.useState(0);

  const toggleLevel = (idx, price) => {
    // If a close level exists within 5 bars, remove it; else add
    const near = levels.find(l => Math.abs(l.idx - idx) <= 5);
    if(near){ setLevels(levels.filter(l => l!==near)); }
    else { setLevels([...levels, { idx, price }]); }
  };

  const assess = () => {
    // Simple algo: detect swing highs/lows and compare
    const closes = data.map(d=>d.c);
    const swings = [];
    for(let i=2;i<closes.length-2;i++){
      const isHigh = closes[i]>closes[i-1] && closes[i]>closes[i-2] && closes[i]>closes[i+1] && closes[i]>closes[i+2];
      const isLow  = closes[i]<closes[i-1] && closes[i]<closes[i-2] && closes[i]<closes[i+1] && closes[i]<closes[i+2];
      if(isHigh || isLow){ swings.push({ idx:i, price:closes[i] }); }
    }
    let correct=0;
    levels.forEach(l => {
      const match = swings.find(s => Math.abs(s.idx - l.idx) <= 8 && Math.abs(s.price - l.price) <= (0.01*closes[i||0] + 1.5));
      if(match) correct++;
    });
    const s = levels.length? (correct/levels.length)*100 : 0;
    setScore(s);
    localStorage.setItem('fe:drills:sr', JSON.stringify({ levels, score:s }));
    alert(`Score: ${Math.round(s)}%`);
  };

  return (
    <DrillLayout title="Support & Resistance" description="Click the chart to mark likely S/R levels. Click near an existing mark to remove it." score={score}>
      <DrillChart data={data} onClick={toggleLevel} />
      <div className="mt-3 flex items-center gap-2">
        <button onClick={assess} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Check</button>
        <button onClick={()=>setLevels([])} className="px-3 py-2 rounded-lg border">Clear</button>
      </div>
      <div className="mt-2 text-xs text-gray-500">Marks: {levels.length}</div>
    </DrillLayout>
  );
}
