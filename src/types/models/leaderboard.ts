export interface HallOfFameMember {
  id: string;
  name: string;
  achievement: string;
  date: string;
  avatar?: string;
  milestone: string;
  daysSmokeFree: number;
  moneySaved: string;
  story?: string;
}

export interface LeaderboardTabsProps {
  onFilterChange?: (filter: string) => void;
  onPeriodChange?: (period: string) => void;
}

export interface ScoreResponse{
  username: string;
  avatar?: string;
  score: number;
  score_rank: number;
}