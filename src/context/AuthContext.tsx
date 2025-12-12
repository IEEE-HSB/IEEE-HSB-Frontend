'use client'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
type AuthProviderProps = {
  children: ReactNode;
};
export  type AuthContextType = {
  token: string | null;
  setToken: (value: string | null) => void;
};
export const authContextObj = createContext<AuthContextType>({
  token: null,
  setToken: () => { },
})

export default function AuthContextProvider({ children }: AuthProviderProps) {

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const userToken = localStorage.getItem('authToken');
    if (userToken) {
      setToken(userToken);
    }
  }, [])

  return (
    <authContextObj.Provider value={{ token, setToken }}>
      {children}
    </authContextObj.Provider >
  )
}
