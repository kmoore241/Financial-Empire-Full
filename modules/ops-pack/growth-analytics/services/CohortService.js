
/**
 * Toy cohort generator for charts.
 */
export default {
  getCohorts(){
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months.map((m,i)=>({ month:m, users: Math.round(50 + Math.sin(i/2)*20 + i*8) }));
  }
}
