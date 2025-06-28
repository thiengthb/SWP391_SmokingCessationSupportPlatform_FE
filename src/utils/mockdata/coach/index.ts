export const clients = [
  {
    name: "John Doe",
    progress: 75,
    lastSession: "2024-03-15",
    status: "page.coachdashboard.clientTabs.status.active",
  },
  {
    name: "Jane Smith",
    progress: 45,
    lastSession: "2024-03-14",
    status: "page.coachdashboard.clientTabs.status.atRisk",
  },
  // Add more clients...
];

export const clientStats = [
  {
    title: "page.coachdashboard.clientStats.activeClients",
    value: "28",
    change: "+2",
    changeType: "increase",
  },
  {
    title: "page.coachdashboard.clientStats.successRate",
    value: "82%",
    change: "+5%",
    changeType: "increase",
  },
  {
    title: "page.coachdashboard.clientStats.sessionsToday",
    value: "5",
    change: "0",
    changeType: "neutral",
  },
  {
    title: "page.coachdashboard.clientStats.openChats",
    value: "12",
    change: "-3",
    changeType: "decrease",
  },
];

export const upcomingSessions = [
  {
    clientName: "John Doe",
    time: "10:00 AM",
    date: "2024-03-20",
    type: "Check-in",
    status: "confirmed",
  },
  // Add more sessions...
];

export const clientProgress = [
  {
    name: "Week 1",
    success: 65,
    relapse: 35,
  },
  {
    name: "Week 2",
    success: 75,
    relapse: 25,
  },
  // Add more weeks...
];

// Example appointments data
export const appointments = [
  {
    date: new Date(2025, 6, 1),
    sessions: [
      { time: "10:00", clientName: "John Doe", status: "confirmed" },
      { time: "14:30", clientName: "Jane Smith", status: "pending" },
    ],
  },
  {
    date: new Date(2025, 6, 2),
    sessions: [
      { time: "11:00", clientName: "Mike Johnson", status: "confirmed" },
      { time: "16:00", clientName: "Sarah Wilson", status: "confirmed" },
    ],
  },
  {
    date: new Date(2025, 6, 3),
    sessions: [
      { time: "09:30", clientName: "Alex Brown", status: "confirmed" },
      { time: "13:00", clientName: "Emma Davis", status: "pending" },
      { time: "15:30", clientName: "Chris Martin", status: "confirmed" },
    ],
  },
  {
    date: new Date(2025, 6, 1),
    sessions: [
      { time: "10:00", clientName: "Linda Chen", status: "confirmed" },
      { time: "14:00", clientName: "Tom Wilson", status: "confirmed" },
    ],
  },
  {
    date: new Date(2025, 6, 5),
    sessions: [
      { time: "11:30", clientName: "Maria Garcia", status: "pending" },
      { time: "15:00", clientName: "David Kim", status: "confirmed" },
      { time: "17:30", clientName: "Sophie Lee", status: "confirmed" },
    ],
  },
  {
    date: new Date(2025, 6, 6),
    sessions: [
      { time: "09:00", clientName: "James Taylor", status: "confirmed" },
      { time: "13:30", clientName: "Rachel Green", status: "pending" },
    ],
  },
];
