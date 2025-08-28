import React, { createContext, useContext, useState, ReactNode } from 'react';

type BotType = 'safe' | 'aggressive' | 'manual';
type BotStatus = 'idle' | 'running' | 'paused' | 'error';

type BotConfig = {
  type: BotType;
  risk: number; // 0–100
  status: BotStatus;
};

type BotContextProps = {
  bot: BotConfig;
  setBot: (bot: BotConfig) => void;
  updateStatus: (status: BotStatus) => void;
};

const defaultBot: BotConfig = {
  type: 'safe',
  risk: 20,
  status: 'idle',
};

const BotContext = createContext<BotContextProps | undefined>(undefined);

export const BotProvider = ({ children }: { children: ReactNode }) => {
  const [bot, setBot] = useState<BotConfig>(defaultBot);

  const updateStatus = (status: BotStatus) =>
    setBot((prev) => ({ ...prev, status }));

  return (
    <BotContext.Provider value={{ bot, setBot, updateStatus }}>
      {children}
    </BotContext.Provider>
  );
};

export const useBot = () => {
  const context = useContext(BotContext);
  if (!context) throw new Error("useBot must be used within a BotProvider");
  return context;
};