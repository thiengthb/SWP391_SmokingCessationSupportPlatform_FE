import type { NotificationType } from "../enums/NotificationType";

export interface NotificationResponse {
    id: string;
    accountId: string;
    content: string;
    notificationType: NotificationType;
    sentAt: string;
    isRead: boolean;
}