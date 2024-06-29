"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, X } from "lucide-react";
import useUser from "@/hooks/use-user";

type Message = {
  type: "user" | "bot";
  text: string;
  time: string;
  avatar?: string;
};

const ChatButton = ({ slug, courseName }: { slug?: string; courseName?: string }) => {
  const { userData } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("chatMessages");
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          type: "bot",
          text: "สวัสดีครับ มีอะไรให้ช่วยไหม",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          }),
          avatar: "/icons/typhoon.jpg" // bot avatar
        }
      ]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessage: Message = {
      type: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      avatar: userData?.avatar || "https://via.placeholder.com/150"
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e as unknown as React.FormEvent);
    }
  };

  return (
    <div>
      <Button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2 justify-center transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        <img src="/icons/bot.svg" alt="Chat" className="w-8 h-8 filter invert" />
        <p className="font-bold">ถามอะไรตอบได้</p>
      </Button>
      {isOpen && (
        <div className="fixed bottom-[80px] right-4 w-full max-w-sm sm:max-w-md md:max-w-lg bg-background rounded-2xl shadow-lg z-50">
          <div className="flex items-center justify-between border-b border-muted px-4 py-3 bg-primary text-primary-foreground">
            <h3 className="text-lg font-medium text-white">Chat {courseName}</h3>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleChat}>
              <X className="w-4 h-4 text-white" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <ScrollArea className="h-[400px] max-h-[80vh] px-4 py-3">
            <div className="grid gap-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.type === "bot" && (
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback>Bot</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`grid gap-1 rounded-lg p-3 max-w-[70%] ${
                      msg.type === "user" ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <div className="text-xs text-muted-foreground/80">{msg.time}</div>
                  </div>
                  {msg.type === "user" && (
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="border-t border-muted px-4 py-3">
            <form onSubmit={sendMessage}>
              <div className="relative flex items-center">
                <Textarea
                  placeholder="Type your message..."
                  className="min-h-[48px] rounded-2xl resize-none p-4 pr-16 w-full"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
                <Button
                  variant="secondary"
                  type="submit"
                  size="icon"
                  className="absolute w-8 h-8 top-1/2 right-3 transform -translate-y-1/2"
                  disabled={loading}
                >
                  <ArrowUp className="w-4 h-4 text-black" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatButton;
