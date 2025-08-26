
import React from 'react';

const Ctx = React.createContext();
export function useToasts(){
  return React.useContext(Ctx);
}

export function ToastProvider({ children }){
  const [toasts, setToasts] = React.useState([]);
  const push = (t) => {
    const id = 't'+Date.now();
    setToasts(prev => [...prev, { id, ...t }]);
    setTimeout(()=> setToasts(prev => prev.filter(x=>x.id!==id)), t.timeout ?? 2500);
  };
  const dismiss = (id) => setToasts(prev => prev.filter(x=>x.id!==id));
  return <Ctx.Provider value={{ toasts, push, dismiss }}>{children}</Ctx.Provider>;
}
