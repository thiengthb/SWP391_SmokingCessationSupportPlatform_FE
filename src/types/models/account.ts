import type { AccountStatus } from "../enums/AccountStatus";
import type { Role } from "../enums/Role";

export interface Account {
  id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
  role: Role;
  status: AccountStatus;
  createdAt: string;
  updatedAt: string;
  havingSubscription: boolean;
}