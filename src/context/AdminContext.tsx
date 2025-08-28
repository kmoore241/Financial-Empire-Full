import React, { createContext, useContext, useState, ReactNode } from 'react';

type AdminContextProps = {
  isAdmin: boolean;
  setAdmin: (val: boolean) => void;
  systemMessage: string;
  setSystemMessage: (msg: string) => void;
  toggleMaintenance: () => void;
  isMaintenance: boolean;
};

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setAdmin] = useState(false);
  const [systemMessage, setSystemMessage] = useState('');
  const [isMaintenance, setMaintenance] = useState(false);

  const toggleMaintenance = () => setMaintenance((val) => !val);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        setAdmin,
        systemMessage,
        setSystemMessage,
        isMaintenance,
        toggleMaintenance,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within an AdminProvider");
  return context;
};