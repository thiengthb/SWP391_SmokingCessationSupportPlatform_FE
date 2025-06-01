import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChatMessage } from "./ChatMessage";
import { BotMessageSquare, Loader2Icon, SendIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { platformData } from "./platform.data";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const STORAGE_KEY = "chatbot_messages";

const ChatBot = () => {
  const baseUrl = import.meta.env.VITE_GEMINI_GOOGLE_URL;
  const model = import.meta.env.VITE_GEMINI_GOOGLE_MODEL;
  const apiKey = import.meta.env.VITE_GEMINI_GOOGLE_API_KEY;
  const url = `${baseUrl}/models/${model}:generateContent?key=${apiKey}`;

  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isMinimized && messages.length === 0) {
      const welcomeMessage: Message = {
        sender: "bot",
        text: `Hello! I'm the assistant for smokingcessation.website. How can I help you today?`,
      };
      setMessages([welcomeMessage]);
    }
  }, [isMinimized]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isLoading && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isLoading, isMinimized]);

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `
                Based on the following information to answer: ${platformData}
                Question: ${input}
                Instructions: Answer briefly and concisely, 
                focusing only on the question, without digressing.
                Answer the same language, if the answer don't match any language, answer in english.
            `,
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      const rawReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Something went wrong!";

      const botMessage: Message = { sender: "bot", text: rawReply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        sender: "bot",
        text: "Failed to connect API",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Add focus after bot responds
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "fixed bottom-20 right-3 z-50 rounded-full shadow-lg",
          "transition-all duration-300 ease-in-out hover:scale-110",
          "animate-bounce-slow",
          "hidden lg:flex",
          "w-12 h-12",
        )}
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <BotMessageSquare />
      </Button>

      {!isMinimized && (
        <Card
          className={cn(
            "fixed bottom-32 lg:bottom-4 2xl:bottom-16 right-4 sm:right-8 lg:right-16 lg:w-96 h-[500px] z-40",
            "shadow-2xl border-primary/20",
            "animate-in slide-in-from-bottom-10 duration-300 p-0 gap-0 overflow-hidden",
            "hidden lg:flex",
            isMinimized ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}
        >
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <BotMessageSquare className="h-5 w-5" />
              AI Assistant
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-primary-foreground ml-auto rounded-full"
                onClick={() => setIsMinimized(true)}
              >
                <span className="sr-only">Minimize chat</span>
                <X />
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="h-[440px] p-0 flex flex-col bg-gradient-to-b from-muted/50">
            <div className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-hidden">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isLoading && (
                <ChatMessage message={{ sender: "bot", text: "..." }} loading />
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 pb-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <Input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 bg-background shadow-sm"
                  autoComplete="off"
                />
                {isLoading ? (
                  <Button size="icon" disabled>
                    <Loader2Icon className="animate-spin" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim()}
                    className="shadow-sm hover:scale-105 transition-transform"
                  >
                    <SendIcon className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                )}
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
