export interface Subscription {
    id: string;
    accountId: string;
    membershipName: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
};

export const defaultSubscription: Subscription = {
    id: "",
    accountId: "",
    membershipName: "",
    startDate: new Date(),
    endDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
};
