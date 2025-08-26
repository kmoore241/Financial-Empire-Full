
import React from 'react';

/**
 * value 0..100
 */
export default function SentimentGauge({ value=50, width=220, height=120 }){
  const r = 100, cx = width/2, cy = height;
  const toXY = (deg) => {
    const rad = (Math.PI/180) * deg;
    return [cx + r * Math.cos(rad), cy - r * Math.sin(rad)];
  };
  const valDeg = 180 * (value/100);
  const [x, y] = toXY(valDeg);
  return (
    <svg width={width} height={height} viewBox={\`0 0 \${width} \${height}\`}>
      <path d={\`M \${cx-r},\${cy} A \${r} \${r} 0 0 1 \${cx+r},\${cy}\`} fill="none" stroke="currentColor" strokeWidth="10" opacity="0.15" />
      <line x1={cx} y1={cy} x2={x} y2={y} stroke="currentColor" strokeWidth="4" />
      <text x={cx} y={cy-8} textAnchor="middle" className="fill-current" fontSize="14">{Math.round(value)}</text>
    </svg>
  );
}
