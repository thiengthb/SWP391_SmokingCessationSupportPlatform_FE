import type { Account } from "./account";

export interface HallOfFame {
    account: Account,
    timeStamp: string,
    criteriaType: string,
    criteriaValue: number,
}
