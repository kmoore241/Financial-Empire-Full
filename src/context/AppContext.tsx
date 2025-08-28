import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppContextProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const showToast = (message: string, type = 'info') => {
    // Integrate with your toast library here
    alert(`[${type.toUpperCase()}] ${message}`);
  };

  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode, showToast }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppProvider");
  return context;
};