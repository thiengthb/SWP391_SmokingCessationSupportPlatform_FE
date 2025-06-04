export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'coach' | 'member';
  status: 'active' | 'inactive' | 'banned';
  joinDate: string;
}