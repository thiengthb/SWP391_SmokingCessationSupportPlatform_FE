import React, { createContext, useContext, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

type WebSocketContextType = {
    client: Client | null;
    sendMessage: (destination: string, body: string) => void;
};

interface NotificationPayload {
  id?: string;
  accountId?: string;
  content?: string;
  notificationType?: 'EMAIL' | 'LIVE' | string;
  sentAt?: string;  
}

interface ChatMessagePayload {
    username?: string;  
    content?: string;
    sentAt?: string;
    isFirstTime?: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { auth } = useAuth();
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        const accountId = auth.currentUser?.id;

        if (!accountId) {
            return;
        }

        const client = new Client({
            webSocketFactory: () => new SockJS(import.meta.env.VITE_WS_URL),
            reconnectDelay: 5000,

            onConnect: () => {
                console.log('WebSocket connected');

                client.subscribe(`/topic/notifications/${accountId}`, (message) => {
                    const data = JSON.parse(message.body);

                    toast.success(data.title || "You have a new notification", {
                        description: data.content || "",
                        duration: 5000,
                    });
                });

                client.subscribe(`/topic/notifications/`, (message) => {
                    const data = JSON.parse(message.body);
                    toast.info(data.title || "🌐 Announcement", {
                        description: data.content || "",
                        duration: 5000,
                    });
                });

                
            },
            onStompError: (frame) => {
                console.error('Broker reported error:', frame.headers['message']);
                console.error('Additional details:', frame.body);
            },
        });

        client.activate();
        clientRef.current = client;

        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
                console.log('WebSocket disconnected');
            }
        };
    }, [auth.currentUser?.id]);

    const sendMessage = (destination: string, body: string) => {
        if (!clientRef.current?.connected) {
            console.warn('⚠️ WebSocket not connected yet');
            return;
        }

        clientRef.current.publish({ destination, body });
    };

    return (
        <WebSocketContext.Provider value={{ sendMessage, client: clientRef.current }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
}