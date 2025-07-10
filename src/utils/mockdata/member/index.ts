import { Clock, Cigarette, DollarSign, Activity } from "lucide-react";

export const stats = [
  {
    title: "memberdashboard.stat.smoke.title",
    value: "7",
    icon: Clock,
    description: "memberdashboard.stat.smoke.description",
  },
  {
    title: "memberdashboard.stat.cigarettes.title",
    value: "140",
    icon: Cigarette,
    description: "memberdashboard.stat.cigarettes.description",
  },
  {
    title: "memberdashboard.stat.moneySaved.title",
    value: "$70",
    icon: DollarSign,
    description: "memberdashboard.stat.moneySaved.description",
  },
  {
    title: "memberdashboard.stat.health.title",
    value: "85%",
    icon: Activity,
    description: "memberdashboard.stat.health.description",
  },
];

export const achievements = [
  {
    title: "memberdashboard.recentAchievements.items.firstWeek.title",
    description: "memberdashboard.recentAchievements.items.firstWeek.description",
    progress: 100,
  },
  {
    title: "memberdashboard.recentAchievements.items.moneySaver.title",
    description: "memberdashboard.recentAchievements.items.moneySaver.description",
    progress: 70,
  },
  {
    title: "memberdashboard.recentAchievements.items.healthImprover.title",
    description: "memberdashboard.recentAchievements.items.healthImprover.description",
    progress: 85,
  },
];

export const healthTimeline = [
  {
    time: "memberdashboard.healthTimeline.time.20m",
    description: "memberdashboard.healthTimeline.description.20m",
    completed: true,
  },
  {
    time: "memberdashboard.healthTimeline.time.12h",
    description: "memberdashboard.healthTimeline.description.12h",
    completed: true,
  },
  {
    time: "memberdashboard.healthTimeline.time.2w_12w",
    description: "memberdashboard.healthTimeline.description.2w_12w",
    completed: false,
  },
  {
    time: "memberdashboard.healthTimeline.time.1m_9m",
    description: "memberdashboard.healthTimeline.description.1m_9m",
    completed: false,
  },
];

export const goals = [
  {
    title: "memberdashboard.goals.quit30days.title",
    progress: 60,
    target: "memberdashboard.goals.quit30days.target",
    description: "memberdashboard.goals.quit30days.description",
  },
  {
    title: "memberdashboard.goals.saveMoney.title",
    progress: 45,
    target: "memberdashboard.goals.saveMoney.target",
    description: "memberdashboard.goals.saveMoney.description",
  },
  {
    title: "memberdashboard.goals.exerciseWeekly.title",
    progress: 80,
    target: "memberdashboard.goals.exerciseWeekly.target",
    description: "memberdashboard.goals.exerciseWeekly.description",
  },
];

export const achievementCategories = [
  {
    name: "memberdashboard.achievements.categories.milestones.name",
    achievements: [
      {
        title: "memberdashboard.achievements.categories.milestones.firstDay.title",
        description: "memberdashboard.achievements.categories.milestones.firstDay.description",
        progress: 100,
        completed: true,
      },
      {
        title: "memberdashboard.achievements.categories.milestones.oneWeek.title",
        description: "memberdashboard.achievements.categories.milestones.oneWeek.description",
        progress: 100,
        completed: true,
      },
      {
        title: "memberdashboard.achievements.categories.milestones.oneMonth.title",
        description: "memberdashboard.achievements.categories.milestones.oneMonth.description",
        progress: 70,
        completed: false,
      },
    ],
  },
  {
    name: "memberdashboard.achievements.categories.health.name",
    achievements: [
      {
        title: "memberdashboard.achievements.categories.health.breath.title",
        description: "memberdashboard.achievements.categories.health.breath.description",
        progress: 100,
        completed: true,
      },
      {
        title: "memberdashboard.achievements.categories.health.heart.title",
        description: "memberdashboard.achievements.categories.health.heart.description",
        progress: 100,
        completed: true,
      },
      {
        title: "memberdashboard.achievements.categories.health.lung.title",
        description: "memberdashboard.achievements.categories.health.lung.description",
        progress: 45,
        completed: false,
      },
    ],
  },
  {
    name: "memberdashboard.achievements.categories.savings.name",
    achievements: [
      {
        title: "memberdashboard.achievements.categories.savings.saver.title",
        description: "memberdashboard.achievements.categories.savings.saver.description",
        progress: 100,
        completed: true,
      },
      {
        title: "memberdashboard.achievements.categories.savings.master.title",
        description: "memberdashboard.achievements.categories.savings.master.description",
        progress: 30,
        completed: false,
      },
    ],
  },
];
