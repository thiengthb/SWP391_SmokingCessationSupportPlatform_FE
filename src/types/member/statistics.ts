export interface Statistics {
    avgCigarettesPerDay: number;
    daysTracked: number;
    cigarettesAvoided?: number;
    moneySaved?: number;    
}

export interface AdminStatistics {
    totalRevenue: number;
    revenueByMembership: MembershipRevenue[];
}

export interface MembershipRevenue {
    name: string;
    membershipRevenue: number;
}