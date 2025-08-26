
import React from 'react';
import usePerfMode from './usePerfMode';

export default function PerformanceToggle(){
  const { perf, setPerf } = usePerfMode();
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <input type="checkbox" checked={perf} onChange={e=>setPerf(e.target.checked)} />
      Performance Mode
    </label>
  );
}
