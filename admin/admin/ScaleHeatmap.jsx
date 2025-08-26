
import React from 'react';

const MODULES = ['Bots','LMS','News','Wallet','Charts','Admin','API','Auth','DB','UI'];
function intensityToClass(n){
  const shades = ['bg-gray-100','bg-green-100','bg-green-200','bg-green-300','bg-green-400','bg-green-500'];
  return shades[Math.max(0, Math.min(shades.length-1, n))];
}

export default function ScaleHeatmap(){
  const [cells, setCells] = React.useState(
    MODULES.map(m => ({ module: m, growth: Math.floor(Math.random()*6), effort: Math.floor(Math.random()*6) }))
  );
  const update = (idx, field, delta) => {
    const next = cells.map((c,i)=> i===idx ? { ...c, [field]: Math.max(0, Math.min(5, c[field] + delta)) } : c);
    setCells(next);
  };
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold mb-3">Scale Heatmap (Impact vs Effort)</h3>
      <div className="grid grid-cols-1 gap-2">
        {cells.map((c, idx)=>(
          <div key={c.module} className="flex items-center gap-3">
            <div className="w-24 text-sm">{c.module}</div>
            <div className={`flex-1 h-6 rounded ${intensityToClass(c.growth)}`} title={`Growth impact: ${c.growth}`}></div>
            <div className={`flex-1 h-6 rounded ${intensityToClass(c.effort)}`} title={`Build effort: ${c.effort}`}></div>
            <div className="flex gap-1">
              <button onClick={()=>update(idx,'growth',1)} className="px-2 py-1 border rounded">+GI</button>
              <button onClick={()=>update(idx,'growth',-1)} className="px-2 py-1 border rounded">-GI</button>
              <button onClick={()=>update(idx,'effort',1)} className="px-2 py-1 border rounded">+E</button>
              <button onClick={()=>update(idx,'effort',-1)} className="px-2 py-1 border rounded">-E</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
