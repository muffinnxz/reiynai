"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, X } from "lucide-react";
import useUser, { MessageType } from "@/hooks/use-user";
import { Preset, Quiz, QuizType } from "@/interfaces/course";
import Image from "next/image";
import { Card } from "./ui/card";

const ChatButton = ({ slug, courseName }: { slug?: string; courseName?: string }) => {
  const { chatInput, setChatInput, messages, isOpenChat, loadingChat, handleSendMessage, toggleChat, sendMessage } =
    useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpenChat) {
      scrollToBottom();
    }
  }, [isOpenChat]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target as Node)) {
        toggleChat();
      }
    },
    [toggleChat]
  );

  useEffect(() => {
    if (isOpenChat) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenChat, handleClickOutside]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as unknown as React.FormEvent, slug);
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
      {isOpenChat && (
        <div
          ref={chatContainerRef}
          className="fixed bottom-[80px] right-4 max-sm:right-2 w-full max-w-sm sm:max-w-md md:max-w-lg bg-background rounded-2xl shadow-lg z-50"
        >
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
                  className={`flex items-start gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback>Bot</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`grid gap-1 max-sm:w-[70%] rounded-lg p-3 w-fit break-words ${
                      msg.sender === "user" ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {msg.type === MessageType.TEXT && <p className="text-sm">{msg.content as string}</p>}
                    {msg.type === MessageType.IMAGE && (
                      <div className="flex flex-col w-full justify-center items-center">
                        <p className="text-sm">{msg.content.text as string}</p>
                        <Image
                          className="mt-2"
                          src={msg.content.image as string}
                          alt="sent image"
                          width={150}
                          height={150}
                        />
                      </div>
                    )}
                    {msg.type === MessageType.QUIZ && (
                      <div className="text-sm">
                        <p className="text-sm">{(msg.content as Quiz).question}</p>
                        {(msg.content as Quiz).type === QuizType.MULTIPLE_CHOICE && (msg.content as Quiz)?.options && (
                          <div className="grid gap-2 mt-2">
                            {(msg.content as Quiz)?.options?.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-2">
                                <Button
                                  disabled={(msg.content as Quiz).done}
                                  className="flex-1"
                                  onClick={() => sendMessage(option)}
                                >
                                  {option}
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {msg.type === MessageType.PRESET && (
                      <div className="text-sm flex flex-col items-center justify-center max-sm:w-[100%]">
                        <p className="text-sm mb-4">คุณต้องการใช้ Preset ตัวอย่างหรือไม่</p>
                        {(msg?.content as Preset)?.image && (
                          <Image
                            src={(msg?.content as Preset)?.image ?? ""}
                            alt={(msg?.content as Preset)?.image ?? ""}
                            width={150}
                            height={150}
                          />
                        )}
                        <div className="flex flex-col w-full">
                          {Object.entries((msg.content as Preset).presets).map(([key, value], index) => (
                            <div
                              key={index}
                              className="flex flex-col w-full justify-center items-center text-center space-y-2"
                            >
                              {value.startsWith("http") || value.startsWith("image") ? (
                                <div className="flex flex-col items-center">
                                  <Image src={value} alt={value} width={150} height={150} />
                                  <p className="text-sm mb-4 break-words w-full">{key}</p>
                                </div>
                              ) : (
                                <Card className="text-sm mb-4 break-words w-96 max-sm:w-[100%]">
                                  {key}: {value}
                                </Card>
                              )}
                            </div>
                          ))}
                          <Button
                            className="flex-1 mt-6"
                            variant="outline"
                            onClick={() => {
                              sendMessage("ใช้ Preset ตัวอย่าง").then((r) =>
                                ((msg?.content as Preset)?.content as () => {})()
                              );
                            }}
                          >
                            ใช้ Preset ตัวอย่าง
                          </Button>
                        </div>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground/80">{msg.time}</div>
                  </div>
                  {msg.sender === "user" && (
                    <Avatar className="w-8 h-8 border">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback>User</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {loadingChat && (
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
            <form onSubmit={handleSendMessage}>
              <div className="relative flex items-center">
                <Textarea
                  placeholder="Type your message..."
                  className="min-h-[48px] rounded-2xl resize-none p-4 pr-16 w-full"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loadingChat}
                />
                <Button
                  variant="secondary"
                  type="submit"
                  size="icon"
                  className="absolute w-8 h-8 top-1/2 right-3 transform -translate-y-1/2"
                  disabled={loadingChat}
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
