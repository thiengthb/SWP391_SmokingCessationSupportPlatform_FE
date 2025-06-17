export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'COACH' | 'MEMBER';
  status: 'active' | 'inactive' | 'banned';
  createdAt: string;
  updatedAt: string;
}