
/**
 * Stubs for connecting multiple providers behind a common interface.
 */
export default {
  fromMock(){
    return {
      async price(symbol='BTC'){
        const p = +(100 + Math.random()*50).toFixed(2);
        return { symbol, price:p, ts: Date.now() };
      }
    }
  }
}
