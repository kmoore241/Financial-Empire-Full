import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type AuthContextProps = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Replace with real auth logic (Firebase, etc.)
    setTimeout(() => {
      setUser({ id: '123', email, name: 'Demo User', role: 'user' });
      setIsLoading(false);
    }, 500);
  };

  const logout = () => setUser(null);

  useEffect(() => {
    // Optionally load user session from localStorage/Firebase here
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};