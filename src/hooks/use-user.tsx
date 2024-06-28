"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "@/lib/firebase-auth";
import axios from "@/lib/axios";
import { UserData } from "@/interfaces/user";

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => null,
  isLoading: false,
  setIsLoading: () => null,
  userData: null,
  setUserData: () => null
});

export default function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be within UserProvider");
  }
  return context;
}

export function UserProvider({ children }: { children?: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        axios
          .post("/user", {
            name: u.displayName,
            email: u.email,
            avatar: u.photoURL
          })
          .then(({ data }: any) => {
            setUserData(data.data);
            setIsLoading(false);
          })
          .catch(() => setIsLoading(false));
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [setUser]);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    userData,
    setUserData
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
