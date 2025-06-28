import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Send } from "lucide-react";
import { ChatMessage } from "./components/ChatMessage";
import { OnlineUser } from "./components/OnlineUser";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { useAuth } from "@/contexts/AuthContext";
import type { ChatMessage as ChatMessageType } from "@/types/community/chat";
import type { User } from "@/types/community/user";
import useApi from "@/hooks/useApi";

import { useTranslation } from "react-i18next";

export default function CommunityPage() {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { sendMessage, subscribeToTopic } = useWebSocket();
  const { auth } = useAuth();

  const apiWithInterceptor = useApi();


  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await apiWithInterceptor.get("/v1/accounts/online-users");
        const data = response.data;

        if (Array.isArray(data.result)) {
          setOnlineUsers(data.result);
        } else if (Array.isArray(data.users.result)) {
          setOnlineUsers(data.users.result);
        } else {
          console.error("Unexpected online users format:", data);
          setOnlineUsers([]); // Fallback to empty array
        }

      } catch (error) {
        console.error("Failed to fetch online users", error);
      }
    };

    fetchOnlineUsers();
  }, []);


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
  const unsubscribe = subscribeToTopic("/topic/public", (body) => {
    try {
      const newMessage: ChatMessageType = JSON.parse(body);
      setMessages((prev) => [...prev, newMessage]);
    } catch (err) {
      console.error("Failed to parse chat message", err);
    }
  });

  return () => {
    if (typeof unsubscribe === "function") {
      unsubscribe();
    }
  };
}, [subscribeToTopic]);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const chatMessage = {
      accountId: auth.currentUser?.id,
      content: message,
    };

    console.log("Sending message:", chatMessage);
    sendMessage("/app/chat/send", JSON.stringify(chatMessage));
    setMessage("")
  };

  return (
    <div className="container py-10 px-4 mx-auto">
      <div className="mb-6 space-y-1">
        <h1 className="text-4xl font-bold mb-2">{t("page.community.title")}</h1>
        <p className="text-muted-foreground">
          {t("page.community.description")}
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_250px] gap-8">
        <Card className="p-4">
          <div className="flex flex-col h-[600px]">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4 h-[530px] overflow-y-auto scrollbar-hidden">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            <form
              onSubmit={handleSendMessage}
              className="flex gap-2 pt-4 border-t mt-4"
            >
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("page.community.inputPlaceholder")}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-4 h-full">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5" />
              <h3 className="font-semibold">
                {t("page.community.onlineUsers")}
              </h3>
            </div>
            <div className="space-y-1">
              {onlineUsers.map((user) => (
                <OnlineUser key={user.id} user={user} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
