import type { AccountStatus } from "../enums/AccountStatus";
import type { Role } from "../enums/Role";

export interface Account {
  id: string;
  username: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: Role;
  status: AccountStatus;
  havingSubscription: boolean;
  createdAt: string;
  updatedAt: string;
}