
import React from 'react';

const BotCtx = React.createContext();
export function BotProvider({ children }){
  const [activeBot, setActiveBot] = React.useState(null);
  const [trades, setTrades] = React.useState([]);

  return <BotCtx.Provider value={{ activeBot, setActiveBot, trades, setTrades }}>{children}</BotCtx.Provider>;
}
export function useBot(){ return React.useContext(BotCtx); }
