export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'coach' | 'member';
  status: 'active' | 'inactive' | 'banned';
  joinDate: string;
}

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "member",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "coach",
    status: "active",
    joinDate: "2024-02-01",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    joinDate: "2023-12-01",
  },
  {
    id: "4",
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "member",
    status: "inactive",
    joinDate: "2024-03-01",
  },
  {
    id: "5",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "member",
    status: "banned",
    joinDate: "2024-02-15",
  },
];

export const userActivityData = [
  { date: '2024-03-01', active: 400, new: 240 },
  { date: '2024-03-02', active: 300, new: 139 },
  { date: '2024-03-03', active: 200, new: 980 },
  { date: '2024-03-04', active: 278, new: 390 },
  { date: '2024-03-05', active: 189, new: 480 },
  { date: '2024-03-06', active: 239, new: 380 },
  { date: '2024-03-07', active: 349, new: 430 },
];

export const successRateData = [
  { name: 'Week 1', rate: 65 },
  { name: 'Week 2', rate: 75 },
  { name: 'Week 3', rate: 70 },
  { name: 'Week 4', rate: 85 },
];

export const userDistributionData = [
  { name: 'Active', value: 400 },
  { name: 'Inactive', value: 300 },
  { name: 'New', value: 300 },
  { name: 'Banned', value: 20 },
];

export const analyticsData = [
  {
    date: "2024-01",
    "Average Session": 150,
    "Total Users": 1200,
  },
  {
    date: "2024-02",
    "Average Session": 180,
    "Total Users": 1500,
  },
  {
    date: "2024-03",
    "Average Session": 210,
    "Total Users": 1800,
  },
  // Add more data points...
];

export const retentionData = {
  categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
  series: [
    {
      name: "Users",
      data: [100, 85, 70, 65],
    },
  ],
};

export const advancedAnalyticsData = {
  monthlyUsers: [
    { month: "Jan", total: 1234 },
    { month: "Feb", total: 2341 },
    { month: "Mar", total: 3452 },
    { month: "Apr", total: 2341 },
    { month: "May", total: 3241 },
    { month: "Jun", total: 4321 }
  ],
  engagementData: [
    { month: "Jan", engagement: 75 },
    { month: "Feb", engagement: 80 },
    { month: "Mar", engagement: 85 },
    { month: "Apr", engagement: 82 },
    { month: "May", engagement: 88 },
    { month: "Jun", engagement: 90 }
  ]
};
