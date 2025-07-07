export const Language = {
    EN: "EN",
    VI: "VI",
} as const;

export type Language = (typeof Language)[keyof typeof Language];