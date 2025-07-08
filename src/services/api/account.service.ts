import { authApi } from "@/lib/axios";
import { createBaseService } from "../base.service";
import { Domains } from "@/constants/domain";
import type { Account } from "@/types/models/account";

const base = createBaseService<Account>(
    authApi,
    Domains.ACCOUNT,
);

export const accountService = Object.assign({}, base, {
    // You can add more specific methods here if needed
})