
export default {
  time(label, fn){
    const t0 = performance.now();
    const out = fn();
    const t1 = performance.now();
    return { label, ms: +(t1-t0).toFixed(2), out };
  }
}
