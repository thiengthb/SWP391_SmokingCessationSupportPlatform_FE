export type Feedback = {
  id: string;
  username: string;
  comment: string;
  rating: number;
  feedbackType: "SYSTEM" | "IMPROVEMENT" | "MEMBERSHIP" | "STORY" | "OTHERS";
};