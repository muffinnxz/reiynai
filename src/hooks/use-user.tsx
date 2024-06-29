"use client";

import { createContext, useContext, useEffect, useState } from "react";
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
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  sendMessage: (message: string, slug?: string) => Promise<void>;
  isOpenChat: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loadingChat: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => null,
  isLoading: false,
  setIsLoading: () => null,
  userData: null,
  setUserData: () => null,
  messages: [],
  setMessages: () => null,
  sendMessage: async () => {},
  isOpenChat: false,
  setIsOpen: () => null,
  loadingChat: false,
  setLoading: () => null
});

export default function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be within UserProvider");
  }
  return context;
}

interface Message {
  type: "user" | "bot";
  text: string;
  time: string;
  avatar?: string;
}

export function UserProvider({ children }: { children?: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpenChat, setIsOpen] = useState<boolean>(false);
  const [loadingChat, setLoading] = useState<boolean>(false);

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
        setUserData(null);
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [setUser]);

  const sendMessage = async (text: string, slug?: string) => {
    const newMessage: Message = {
      type: "user",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      avatar: userData?.avatar || "https://via.placeholder.com/150"
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    try {
      const response = await fetch("/api/typhoon/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: updatedMessages, slug })
      });

      if (!response.ok) {
        console.error("API response status:", response.status);
        throw new Error("Failed to fetch the response from the chat API");
      }

      const data = await response.json();

      const botReply: Message = {
        type: "bot",
        text: data.reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        }),
        avatar: "/icons/typhoon.jpg" // bot avatar
      };

      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        type: "bot",
        text: "Sorry, something went wrong. Please try again later.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        }),
        avatar: "/icons/typhoon.jpg" // bot avatar
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    userData,
    setUserData,
    messages,
    setMessages,
    sendMessage,
    isOpenChat,
    setIsOpen,
    loadingChat,
    setLoading
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
