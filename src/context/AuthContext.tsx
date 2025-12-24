"use client";

import { createContext, useEffect, useState, ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  logout: () => void;
  login: () => void;
};

export const authContextObj = createContext<AuthContextType>({
  isAuthenticated: false,
  logout: () => {},
  login: () => {},
});

export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const hasToken = document.cookie.includes("authToken=");
    setIsAuthenticated(hasToken);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    document.cookie = "authToken=; path=/; max-age=0";
    setIsAuthenticated(false);
  };

  return (
    <authContextObj.Provider value={{ isAuthenticated, logout, login }}>
      {children}
    </authContextObj.Provider>
  );
}