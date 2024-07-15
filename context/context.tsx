'use client';
import React, { createContext, useState, useContext } from 'react';

const initialState = {
  userId: '',
  updateUserId: (userId: string) => {},
};
export const UserIdContext = createContext<any>(initialState);

export const UserIdContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [userId, setUserId] = useState('');

  const updateUserId = () => {
    setUserId(userId);
  };

  return <UserIdContext.Provider value={{ userId, updateUserId }}>{children}</UserIdContext.Provider>;
};
export function useUserIdCotext() {
  return useContext(UserIdContext);
}
