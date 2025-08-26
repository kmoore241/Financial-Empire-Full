
import React from 'react';

export default function MiniSparkline({ data=[], width=120, height=36 }){
  if(!data.length) return <div className="h-9 w-28 bg-gray-100 dark:bg-gray-900 rounded" />;
  const min = Math.min(...data), max = Math.max(...data);
  const x = i => (i/(data.length-1))*width;
  const y = v => height - ((v-min)/(max-min||1))*height;
  const path = data.map((v,i)=> \`\${i===0?'M':'L'} \${x(i)},\${y(v)}\`).join(' ');
  return (
    <svg width={width} height={height} viewBox={\`0 0 \${width} \${height}\`}>
      <path d={path} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
