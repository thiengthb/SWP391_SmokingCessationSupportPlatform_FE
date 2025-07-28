export interface Statistics {
    totalRecords: number;
    avgCigarettesPerDay: number;
    daysTracked: number;
}

export interface AdminStatistics {
    totalRevenue: number;
    revenueByMembership: MembershipRevenue[];
}

export interface MembershipRevenue {
    name: string;
    membershipRevenue: number;
}