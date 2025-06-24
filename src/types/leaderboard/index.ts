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