import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import type { ScoreResponse } from "@/types/models/leaderboard";

type WebSocketContextType = {
  client: Client | null;
  sendMessage: (destination: string, body: string) => void;
  subscribeToTopic: (
    topic: string,
    callback: (messageBody: string) => void
  ) => () => void;
  leaderboardData: ScoreResponse[];
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { auth } = useAuth();
  const clientRef = useRef<Client | null>(null);
  const [connectedClient, setConnectedClient] = useState<Client | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<ScoreResponse[]>([]);
  const [pendingSubscriptions, setPendingSubscriptions] = useState<
    { topic: string; callback: (msg: string) => void }[]
  >([]);

  useEffect(() => {
    const accountId = auth.currentAcc?.id;
    if (!accountId) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(import.meta.env.VITE_WS_URL),
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("✅ WebSocket connected");
        setConnectedClient(client);

        // Apply queued subscriptions
        pendingSubscriptions.forEach(({ topic, callback }) => {
          client.subscribe(topic, (message) => {
            callback(message.body);
          });
        });
        setPendingSubscriptions([]);

        // Personal notifications
        client.subscribe(`/topic/notifications/${accountId}`, (message) => {
          const data = JSON.parse(message.body);
          toast(data.title || "You have a new notification", {
            description: data.content || "",
            duration: 5000,
          });
        });

        // Global announcements
        client.subscribe(`/topic/notifications/`, (message) => {
          const data = JSON.parse(message.body);
          toast(data.title || "🌐 Announcement", {
            description: data.content || "",
            duration: 5000,
          });
        });

        // Leaderboard updates
        client.subscribe("/topic/leaderboard", (message) => {
          console.log("📡 Leaderboard update received:", message.body);
          const updatedScores: ScoreResponse[] = JSON.parse(message.body);
          setLeaderboardData(updatedScores);
        });
      },

      onStompError: (frame) => {
        console.error("❌ Broker error:", frame.headers["message"]);
        console.error("Details:", frame.body);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
      setConnectedClient(null);
      console.log("🔌 WebSocket disconnected");
    };
  }, [auth.currentAcc?.id]);

  const sendMessage = useCallback((destination: string, body: string) => {
    if (!clientRef.current?.connected) {
      console.warn("⚠️ Cannot send message. WebSocket not connected.");
      return;
    }
    clientRef.current.publish({ destination, body });
  }, []);

  const subscribeToTopic = useCallback(
    (topic: string, callback: (messageBody: string) => void): (() => void) => {
      const client = clientRef.current;

      if (!client || !client.connected) {
        console.warn("⏳ WebSocket not connected. Queuing:", topic);
        setPendingSubscriptions((prev) => [...prev, { topic, callback }]);
        return () => {}; // Return no-op unsubscribe for now
      }

      const subscription = client.subscribe(topic, (message) => {
        callback(message.body);
      });

      return () => subscription.unsubscribe(); // ✅ clean unsubscribe
    },
    []
  );

  return (
    <WebSocketContext.Provider
      value={{
        sendMessage,
        client: connectedClient,
        subscribeToTopic,
        leaderboardData,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
