import React, { createContext, useContext, useState, ReactNode } from 'react';

type Asset = { code: string; balance: number };

type WalletContextProps = {
  assets: Asset[];
  addAsset: (asset: Asset) => void;
  removeAsset: (code: string) => void;
};

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [assets, setAssets] = useState<Asset[]>([]);

  const addAsset = (asset: Asset) => setAssets((prev) => [...prev, asset]);
  const removeAsset = (code: string) => setAssets((prev) => prev.filter(a => a.code !== code));

  return (
    <WalletContext.Provider value={{ assets, addAsset, removeAsset }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within a WalletProvider");
  return context;
};