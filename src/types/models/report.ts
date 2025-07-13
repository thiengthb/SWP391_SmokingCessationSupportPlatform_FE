export interface UserActivityData {
  date: string;
  newAccounts: number;
};


export interface UserDistributionResponse {
  totalAccounts: number
  onlineAccounts: number
  offlineAccounts: number
  inactiveAccounts: number
}

export interface RevenueResponse {
  date: string
  revenue: number
}

export interface PremiumDistribution {
  premiumAccounts: number;
  nonPremiumAccounts: number;
  totalAccounts: number;
}

export type TimeRange = 'Weekly' | 'Monthly' | 'Yearly';