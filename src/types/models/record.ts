export interface SmokingRecord {
  id: string;
  accountId: string;
  cigarettesSmoked: number;
  date: Date;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}
