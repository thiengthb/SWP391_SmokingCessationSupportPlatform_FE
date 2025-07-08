import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Send } from "lucide-react";
import { ChatMessage } from "./components/ChatMessage";
import { OnlineUser } from "./components/OnlineUser";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { useAuth } from "@/contexts/AuthContext";
import type { ChatMessage as ChatMessageType } from "@/types/models/chat";
import type { Account } from "@/types/models/account";
import useApi from "@/hooks/useApi";

import { useTranslation } from "react-i18next";

export default function CommunityPage() {
  const { t } = useTranslation();
  const PAGE_SIZE = 50; // Number of messages per page
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<Account[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { sendMessage, subscribeToTopic } = useWebSocket();
  const { auth } = useAuth();

  const apiWithInterceptor = useApi();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = async () => {
    const element = scrollContainerRef.current;
    if (!element) return;

    const scrollHeight = element.scrollHeight;

    if (element.scrollTop === 0 && hasMore) {
      const newPage = page + 1;
      try {
        const response = await apiWithInterceptor.get(`/v1/chats`, {
          params: {
            page: newPage,
            size: PAGE_SIZE,
            sortBy: "createdAt",
            direction: "ASC",
          },
        });
        const newMessages: ChatMessageType[] = Array.isArray(
          response.data.result.content
        )
          ? response.data.result.content
          : [];
        console.log("Fetched messages:", newMessages);
        if (newMessages.length > 0) {
          setMessages((prev) => [...newMessages, ...prev]);

          requestAnimationFrame(() => {
            if (scrollContainerRef.current) {
              const newScrollHeight = scrollContainerRef.current?.scrollHeight;
              scrollContainerRef.current.scrollTop =
                newScrollHeight - scrollHeight;
            }
          });
          setPage(newPage);
        } else {
          setHasMore(false); // No more messages to load
        }
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    }
  };

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await apiWithInterceptor.get(
          "/v1/accounts/online-users"
        );
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

    const loadInitialMessages = async () => {
      try {
        const response = await apiWithInterceptor.get("/v1/chats", {
          params: {
            page: 0,
            size: PAGE_SIZE,
            sortBy: "createdAt",
            direction: "ASC",
          },
        });

        const initialMessages: ChatMessageType[] = Array.isArray(
          response.data.result.content
        )
          ? response.data.result.content
          : [];
        setMessages(initialMessages);
        setShouldScrollToBottom(true);
      } catch (err) {
        console.error("Failed to load initial messages", err);
      }
    };

    loadInitialMessages();

    fetchOnlineUsers();
  }, []);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    if (!shouldScrollToBottom) return;

    // Defer to next animation frame so message renders first
    requestAnimationFrame(() => {
      scrollContainerRef.current?.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
      setShouldScrollToBottom(false);
    });
  }, [messages, shouldScrollToBottom]);

  useEffect(() => {
    const unsubscribe = subscribeToTopic("/topic/public", (body) => {
      try {
        const newMessage: ChatMessageType = JSON.parse(body);
        setMessages((prev) => [...prev, newMessage]);

        if (newMessage.author.id === auth.currentAcc?.id) {
          setShouldScrollToBottom(true);
        }
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
      accountId: auth.currentAcc?.id,
      content: message,
    };

    console.log("Sending message:", chatMessage);
    sendMessage("/app/chat/send", JSON.stringify(chatMessage));
    setMessage("");
    setShouldScrollToBottom(true);
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
          <div className="flex flex-col h-[60vh]">
            <div
              className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hidden"
              ref={scrollContainerRef}
              onScroll={handleScroll}
            >
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  isOwnMessage={msg.author.id === auth.currentAcc?.id}
                />
              ))}
              <div ref={scrollRef} />
            </div>

            <form
              onSubmit={handleSendMessage}
              className="flex gap-2 pt-4 border-t mt-4 min-h-[50px]"
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
