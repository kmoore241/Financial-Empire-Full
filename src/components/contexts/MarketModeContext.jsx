// src/contexts/MarketModeContext.jsx
import React, { createContext, useState, useContext } from 'react';

const MarketModeContext = createContext();

export const MarketModeProvider = ({ children }) => {
  const [mode, setMode] = useState('bull');
  return (
    <MarketModeContext.Provider value={{ mode, setMode }}>
      {children}
    </MarketModeContext.Provider>
  );
};

export const useMarketMode = () => useContext(MarketModeContext);
