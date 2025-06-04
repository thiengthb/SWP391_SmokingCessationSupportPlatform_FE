export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  result: {
    token: string;
    authenticated: boolean;
    message?: string;
  };
}