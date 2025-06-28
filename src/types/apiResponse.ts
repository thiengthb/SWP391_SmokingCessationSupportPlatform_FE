export interface ApiResponse<T> {
  code: number;      // e.g. 1000
  message?: string;
  result: T;         
}