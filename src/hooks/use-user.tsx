"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "@/lib/firebase-auth";
import axios from "@/lib/axios";
import { UserData } from "@/interfaces/user";
import { ActionType, BotAction } from "@/interfaces/bot";
import { Preset, Quiz, QuizType } from "@/interfaces/course";

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  chatInput: string;
  setChatInput: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;

  sendMessage: (message: string, slug?: string) => Promise<void>;
  toggleChat: () => void;
  handleSendMessage: (e: React.FormEvent, slug?: string) => Promise<void>;
  addBotMessage: (text: string) => void;

  addBotAction: (action: BotAction) => void;

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
  chatInput: "",
  setChatInput: () => null,
  messages: [],
  setMessages: () => null,

  sendMessage: async () => {},
  toggleChat: () => null,
  handleSendMessage: async () => {},
  addBotMessage: () => null,

  addBotAction: () => null,

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

export interface Message {
  sender: "user" | "bot";
  type: MessageType;
  content: any;
  time: string;
  avatar?: string;
}

export enum MessageType {
  TEXT = "text",
  QUIZ = "quiz",
  PRESET = "preset",
  IMAGE = "image"
}

export function UserProvider({ children }: { children?: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chatInput, setChatInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("chatMessages");
      return savedMessages ? JSON.parse(savedMessages) : [];
    }
    return [];
  });
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

  // controlling chat bot
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const addBotAction = (action: BotAction) => {
    console.log("Adding bot action", action);
    if (action.type == ActionType.SEND_MESSAGE) {
      addBotMessage(action.content as string);
    } else if (action.type == ActionType.SEND_QUIZ) {
      addBotQuiz(action.content as Quiz);
    } else if (action.type == ActionType.SEND_PRESET) {
      addBotPreset(action.content as Preset);
    } else if (action.type == ActionType.CHECK_IMAGE) {
      addCheckImageMessage(action.content.image, action.content.quest);
    }
  };

  const sendMessage = async (text: string, slug?: string) => {
    const newMessage: Message = {
      sender: "user",
      type: MessageType.TEXT,
      content: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      avatar: userData?.avatar || "https://via.placeholder.com/150"
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    for (let i = 0; i < messages.length; i++) {
      if (messages[i].type === MessageType.QUIZ) {
        let quiz = messages[i].content as Quiz;
        if (!quiz.done) {
          if (
            (quiz.options && quiz.options.includes(text)) ||
            quiz.correctAnswer == text ||
            quiz.type === QuizType.TEXT
          ) {
            try {
              const response = await fetch("/api/typhoon/check-answer", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ question: quiz.question, solution: quiz.correctAnswer, answer: text, slug })
              });

              if (!response.ok) {
                console.error("API response status:", response.status);
                throw new Error("Failed to fetch the response from the check answer API");
              }

              const data = await response.json();

              const botReply: Message = {
                sender: "bot",
                type: MessageType.TEXT,
                content: data.reply,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                }),
                avatar: "/icons/typhoon.jpg" // bot avatar
              };

              quiz.done = true;
              messages[i].content = quiz;

              setMessages((prevMessages) => [...prevMessages, botReply]);
              return;
            } catch (error) {}
          }
        }
      }
    }

    if (text === "ใช้ Preset ตัวอย่าง") {
      return;
    }

    try {
      const response = await fetch("/api/typhoon/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: messages, slug })
      });

      if (!response.ok) {
        console.error("API response status:", response.status);
        throw new Error("Failed to fetch the response from the chat API");
      }

      const data = await response.json();

      const botReply: Message = {
        sender: "bot",
        type: MessageType.TEXT,
        content: data.reply,
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
        sender: "bot",
        type: MessageType.TEXT,
        content: "Sorry, something went wrong. Please try again later.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        }),
        avatar: "/icons/typhoon.jpg" // bot avatar
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const addCheckImageMessage = (image: string, quest: string) => {
    axios
      .post("/openai/vision", {
        imageUrl: image,
        prompt: `You are an assigment grader. You can compare the image with the requirement of the Image. \n\n The requirement: ${quest} \n\n Is the image meet the requirement? Yes or No? If Yes please give some praise. If No please give some feedback. ANSWER CONCISELY:`
      })
      .then((response) => {
        const newUserMassage: Message = {
          sender: "user",
          type: MessageType.IMAGE,
          content: {
            text: "Sending the image for grading...",
            image: image
          },
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          }),
          avatar: userData?.avatar || "https://via.placeholder.com/150"
        };

        const newBotMessage: Message = {
          sender: "bot",
          type: MessageType.TEXT,
          content: response.data.data,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          }),
          avatar: "/icons/typhoon.jpg" // bot avatar
        };

        setMessages((prevMessages) => [...prevMessages, newUserMassage, newBotMessage]);
      });
  };

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      sender: "bot",
      type: MessageType.TEXT,
      content: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      avatar: "/icons/typhoon.jpg" // bot avatar
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const addBotQuiz = (quiz: Quiz) => {
    const newMessage: Message = {
      sender: "bot",
      type: MessageType.QUIZ,
      content: quiz,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      avatar: "/icons/typhoon.jpg" // bot avatar
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const addBotPreset = (preset: Preset) => {
    const newMessage: Message = {
      sender: "bot",
      type: MessageType.PRESET,
      content: preset,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      avatar: "/icons/typhoon.jpg" // bot avatar
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpenChat);
    if (!isOpenChat && messages.length === 0) {
      addBotMessage("สวัสดีครับ มีอะไรให้ช่วยไหม");
    }
  };

  const handleSendMessage = async (e: React.FormEvent, slug?: string) => {
    e.preventDefault();
    if (chatInput.trim() === "") return;
    setLoading(true);
    await sendMessage(chatInput, slug);
    setChatInput("");
    setLoading(false);
  };

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    userData,
    setUserData,
    chatInput,
    setChatInput,
    messages,
    setMessages,

    sendMessage,
    toggleChat,
    handleSendMessage,
    addBotMessage,

    addBotAction,

    isOpenChat,
    setIsOpen,
    loadingChat,
    setLoading
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
