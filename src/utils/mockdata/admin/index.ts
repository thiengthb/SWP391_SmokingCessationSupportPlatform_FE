import { Users, ActivitySquare, Medal, LineChart } from "lucide-react";

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

export const stats = [
  {
    title: "admindashboard.stats.totalUsers.title",
    value: "1,234",
    icon: Users,
    description: "admindashboard.stats.totalUsers.description",
  },
  {
    title: "admindashboard.stats.activeGoals.title",
    value: "845",
    icon: ActivitySquare,
    description: "admindashboard.stats.activeGoals.description",
  },
  {
    title: "admindashboard.stats.successRate.title",
    value: "75%",
    icon: Medal,
    description: "admindashboard.stats.successRate.description",
  },
  {
    title: "admindashboard.stats.weeklyGrowth.title",
    value: "+22%",
    icon: LineChart,
    description: "admindashboard.stats.weeklyGrowth.description",
  },
];

export const reports = [
  {
    title: "admindashboard.reports.userActivity.title",
    description: "admindashboard.reports.userActivity.description",
    lastGenerated: "2024-03-15",
  },
  {
    title: "admindashboard.reports.successMetrics.title",
    description: "admindashboard.reports.successMetrics.description",
    lastGenerated: "2024-03-14",
  },
  {
    title: "admindashboard.reports.systemPerformance.title",
    description: "admindashboard.reports.systemPerformance.description",
    lastGenerated: "2024-03-15",
  },
];