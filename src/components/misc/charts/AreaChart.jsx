
import React from 'react';

export default function AreaChart({ data=[], width=700, height=220 }){
  if(!data.length) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const pad = 24;
  const x = i => pad + (i/(data.length-1))*(width-pad*2);
  const y = v => height - pad - ((v-min)/(max-min||1))*(height-pad*2);
  const path = data.map((v,i)=> \`\${i===0?'M':'L'} \${x(i)},\${y(v)}\`).join(' ');
  const area = \`\${path} L \${x(data.length-1)},\${height-pad} L \${x(0)},\${height-pad} Z\`;
  return (
    <svg className="w-full" viewBox={\`0 0 \${width} \${height}\`}>
      <path d={area} fill="currentColor" opacity="0.1" />
      <path d={path} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
