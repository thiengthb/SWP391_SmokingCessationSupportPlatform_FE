export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'ONLINE' | 'OFFLINE' | 'BANNED';
}