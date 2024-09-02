'use client';
import { ReactNode, useState } from 'react';
import AuthContext from './auth.context';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    const response = await fetch('/api/auth/login', { body: JSON.stringify({ username, password }) });
    setUser(response.ok ? username : null);
    localStorage.setItem('user', username);
  };

  const signup = async (username: string, password: string) => {
    const response = await fetch('/api/auth/signup', { body: JSON.stringify({ username, password }) });

    setUser(response.ok ? username : null);
    localStorage.setItem('user', username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
