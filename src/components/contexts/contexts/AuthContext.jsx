
import React from 'react';

const AuthCtx = React.createContext();
export function AuthProvider({ children }){
  const [user, setUser] = React.useState(null);

  const login = (email, role='viewer') => setUser({ email, role });
  const logout = () => setUser(null);

  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>;
}
export function useAuth(){ return React.useContext(AuthCtx); }
