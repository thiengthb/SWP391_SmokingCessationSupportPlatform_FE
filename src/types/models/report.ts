export interface UserActivityData{
  date: string;
  newAccounts: number;
  currentAccounts: number;
  activeAccounts: number;
};


export interface UserDistributionResponse{
  totalAccounts: number
  onlineAccounts: number
  offlineAccounts: number
  inactiveAccounts: number
}

export type TimeRange = '7-days' | '30-days' | '12-months' | 'since-launch';