export interface SmokingRecord {
  id: string;
  date: string;
  cigarettesSmoked: number;
  note?: string;
}

export interface RecordResponse {
  content: SmokingRecord[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
