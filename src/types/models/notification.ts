export interface NotificationResponse {
    id: string;
    accountId: string;
    content: string;
    notificationType: NotificationType;
    sentAt: string;
    isRead: boolean;
}

export const NotificationType = {
  EMAIL: "EMAIL",
  LIVE: "LIVE",
} as const;

export type NotificationType = typeof NotificationType[keyof typeof NotificationType];