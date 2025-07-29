import type { Account } from "./account";

export interface HallOfFame {
    account: Account,
    timestamp: string,
    criteriaType: string,
    criteriaValue: number,
    description?: string,
}
