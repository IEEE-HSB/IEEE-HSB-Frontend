"use client";
import { createContext, ReactNode } from "react";
import { getAuthToken } from "@/lib/getAuthToken";
import { useApiQuery } from "@/hooks/useFetch";

export type UserType = {
  name: string;
  email: string;
  role: string;
  committee: string;
  chapter: { id: string; code: string; name: string };
  status: string;
  points: number;
  level: string;
  badges: string[];
  _id: string;
};

type UserContextType = {
  user: UserType | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
});

export default function UserProvider({ children }: { children: ReactNode }) {
  const token = getAuthToken();

  const {
    data: user,
    isLoading,
  } = useApiQuery<UserType>({
    queryKey: ["me"],
    url: "https://ieee-hsb-backend.vercel.app/api/user/me",
    enabled: !!token,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <UserContext.Provider
      value={{
        user: user ?? null,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}