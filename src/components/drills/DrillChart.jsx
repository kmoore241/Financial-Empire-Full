
import React from 'react';

/**
 * Minimal SVG line chart for Close prices + optional overlays.
 * Props:
 *  - data: [{c, v}]
 *  - overlays: [{ points: [yValues], color, label }]
 *  - onClick: (index, price) => void
 *  - height: number
 */
export default function DrillChart({ data, overlays=[], onClick, height=220 }){
  const width = 700;
  const pad = 24;
  const xs = data.map((_,i)=>i);
  const ys = data.map(d=>d.c);
  const min = Math.min(...ys), max = Math.max(...ys);
  const x = i => pad + (i / Math.max(1, data.length-1)) * (width - pad*2);
  const y = v => height - pad - ((v - min) / Math.max(0.0001, max-min)) * (height - pad*2);

  const path = ys.map((v,i)=> `${i===0?'M':'L'} ${x(i)},${y(v)}`).join(' ');

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - pad;
    const idx = Math.round((relX / (width - pad*2)) * (data.length-1));
    if(idx>=0 && idx<data.length){
      onClick?.(idx, ys[idx]);
    }
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" onClick={handleClick}>
      <rect x="0" y="0" width={width} height={height} fill="transparent" />
      <path d={path} fill="none" stroke="currentColor" strokeWidth="1.5" />
      {overlays.map((o, k)=>{
        const p = o.points.map((v,i)=> v==null? null : `${i===0?'M':'L'} ${x(i)},${y(v)}`).filter(Boolean).join(' ');
        return <path key={k} d={p} fill="none" stroke={o.color || 'gray'} strokeWidth="1" opacity="0.9" />;
      })}
      {/* axes (simple) */}
      <line x1={pad} y1={height-pad} x2={width-pad} y2={height-pad} stroke="currentColor" opacity="0.2"/>
      <line x1={pad} y1={pad} x2={pad} y2={height-pad} stroke="currentColor" opacity="0.2"/>
    </svg>
  );
}
