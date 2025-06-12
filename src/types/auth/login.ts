export interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  code: number;
  message?: string;
  result: {
    authenticated: boolean;
    accessToken?: string;
    role?: 'admin' | 'coach' | 'member';
  };
}