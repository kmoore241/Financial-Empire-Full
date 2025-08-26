
/**
 * Toy sentiment estimator that scores headlines 0..100.
 */
export default {
  score(headline){
    const good = ['gain','rally','beat','growth','bull','greed','breakout'];
    const bad = ['fall','drop','miss','slow','bear','fear','selloff'];
    const h = headline.toLowerCase();
    let s = 50;
    good.forEach(k => { if(h.includes(k)) s += 8; });
    bad.forEach(k => { if(h.includes(k)) s -= 8; });
    return Math.max(0, Math.min(100, s));
  }
}
