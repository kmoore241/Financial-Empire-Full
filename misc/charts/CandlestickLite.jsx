
import React from 'react';

/**
 * CandlestickLite expects `data` = [{ o,h,l,c }] and optional `width`, `height`.
 */
export default function CandlestickLite({ data=[], width=700, height=260 }){
  if(!data.length) return null;
  const pad = 24;
  const min = Math.min(...data.map(d=>d.l)), max = Math.max(...data.map(d=>d.h));
  const x = i => pad + (i/(data.length-1))*(width-pad*2);
  const y = v => height - pad - ((v-min)/(max-min||1))*(height-pad*2);
  const bw = Math.max(1, (width - pad*2)/data.length * 0.6);

  return (
    <svg className="w-full" viewBox={\`0 0 \${width} \${height}\`}>
      {data.map((d,i)=>{
        const up = d.c >= d.o;
        const xc = x(i);
        return (
          <g key={i}>
            <line x1={xc} x2={xc} y1={y(d.h)} y2={y(d.l)} stroke="currentColor" opacity="0.6" />
            <rect x={xc-bw/2} y={y(up? d.c : d.o)} width={bw} height={Math.max(1, Math.abs(y(d.c)-y(d.o)))} fill={up? '#10b981':'#ef4444'} />
          </g>
        );
      })}
      <line x1={pad} y1={height-pad} x2={width-pad} y2={height-pad} stroke="currentColor" opacity="0.2"/>
      <line x1={pad} y1={pad} x2={pad} y2={height-pad} stroke="currentColor" opacity="0.2"/>
    </svg>
  );
}
