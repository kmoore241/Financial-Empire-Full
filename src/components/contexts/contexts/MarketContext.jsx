
import React from 'react';

const MarketCtx = React.createContext();
export function MarketProvider({ children }){
  const [mode, setMode] = React.useState('sideways'); // bull, bear, sideways
  const [sentiment, setSentiment] = React.useState(50); // 0-100 fear/greed index

  return <MarketCtx.Provider value={{ mode, setMode, sentiment, setSentiment }}>{children}</MarketCtx.Provider>;
}
export function useMarket(){ return React.useContext(MarketCtx); }
