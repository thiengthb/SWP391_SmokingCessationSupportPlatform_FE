import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Send } from "lucide-react";
import { onlineUsers, chatMessages } from "@/utils/mockdata/community";
import { ChatMessage } from "./components/ChatMessage";
import { OnlineUser } from "./components/OnlineUser";

export default function CommunityPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: message,
      author: onlineUsers[0], // Current user
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="container py-10 px-4 mx-auto">
      <div className="mb-6 space-y-1">
        <h1 className="text-4xl font-bold mb-2">Community</h1>
        <p className="text-muted-foreground">
          Connect and share with others on their journey
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
                placeholder="Type a message..."
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
              <h3 className="font-semibold">Online Users</h3>
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
