
/**
 * Aggregate a list of 0..100 scores into a single index with simple smoothing.
 */
export default {
  compute(scores=[]){
    if(!scores.length) return 50;
    const avg = scores.reduce((a,b)=>a+b,0)/scores.length;
    return Math.round(0.7*avg + 0.3*50);
  }
}
