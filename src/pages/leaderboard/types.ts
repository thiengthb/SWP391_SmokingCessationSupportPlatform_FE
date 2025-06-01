export interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  rank: number;
  score: number;
  smokeFreeDay: number;
  badge?: string;
  achievement: string;
  progress: number;
}
