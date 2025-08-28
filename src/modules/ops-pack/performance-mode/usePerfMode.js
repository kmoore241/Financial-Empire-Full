
import { useEffect, useState } from 'react';

/**
 * Perf mode reduces animations and heavy rendering.
 */
export default function usePerfMode(){
  const [perf, setPerf] = useState(()=> JSON.parse(localStorage.getItem('fe:perfMode')||'false'));
  useEffect(()=>{
    localStorage.setItem('fe:perfMode', JSON.stringify(perf));
    document.documentElement.style.setProperty('--motion-safe', perf? 'reduce':'no-preference');
  }, [perf]);
  return { perf, setPerf };
}
