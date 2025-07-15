export const NotificationType = {
  EMAIL: "EMAIL",
  LIVE: "LIVE",
} as const;

export type NotificationType = typeof NotificationType[keyof typeof NotificationType];