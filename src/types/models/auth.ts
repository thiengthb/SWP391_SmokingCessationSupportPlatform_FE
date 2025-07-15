import type { Account } from "./account";

export interface Auth {
    account: Account;
    accessToken: string;
}

