
import React from 'react';

const AppCtx = React.createContext();
export function AppProvider({ children }){
  const [theme, setTheme] = React.useState(() => document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  const toggleTheme = () => {
    const root = document.documentElement;
    if(theme==='dark'){ root.classList.remove('dark'); setTheme('light'); }
    else { root.classList.add('dark'); setTheme('dark'); }
  };

  const [settings, setSettings] = React.useState({});

  return <AppCtx.Provider value={{ theme, toggleTheme, settings, setSettings }}>{children}</AppCtx.Provider>;
}
export function useApp(){ return React.useContext(AppCtx); }

