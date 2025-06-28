import { Clock, Cigarette, DollarSign, Activity } from "lucide-react";

export const stats = [
  {
    title: "page.stat.smoke.title",
    value: "7",
    icon: Clock,
    description: "page.stat.smoke.description",
  },
  {
    title: "page.stat.cigarettes.title",
    value: "140",
    icon: Cigarette,
    description: "page.stat.cigarettes.description",
  },
  {
    title: "page.stat.moneySaved.title",
    value: "$70",
    icon: DollarSign,
    description: "page.stat.moneySaved.description",
  },
  {
    title: "page.stat.health.title",
    value: "85%",
    icon: Activity,
    description: "page.stat.health.description",
  },
];

export const achievements = [
  {
    title: "page.memberdashboard.recentAchievements.items.firstWeek.title",
    description:
      "page.memberdashboard.recentAchievements.items.firstWeek.description",
    progress: 100,
  },
  {
    title: "page.memberdashboard.recentAchievements.items.moneySaver.title",
    description:
      "page.memberdashboard.recentAchievements.items.moneySaver.description",
    progress: 70,
  },
  {
    title: "page.memberdashboard.recentAchievements.items.healthImprover.title",
    description:
      "page.memberdashboard.recentAchievements.items.healthImprover.description",
    progress: 85,
  },
];

export const healthTimeline = [
  {
    time: "page.memberdashboard.healthTimeline.time.20m",
    description: "page.memberdashboard.healthTimeline.description.20m",
    completed: true,
  },
  {
    time: "page.memberdashboard.healthTimeline.time.12h",
    description: "page.memberdashboard.healthTimeline.description.12h",
    completed: true,
  },
  {
    time: "page.memberdashboard.healthTimeline.time.2w_12w",
    description: "page.memberdashboard.healthTimeline.description.2w_12w",
    completed: false,
  },
  {
    time: "page.memberdashboard.healthTimeline.time.1m_9m",
    description: "page.memberdashboard.healthTimeline.description.1m_9m",
    completed: false,
  },
];

export const goals = [
  {
    title: "page.memberdashboard.goals.quit30days.title",
    progress: 60,
    target: "page.memberdashboard.goals.quit30days.target",
    description: "page.memberdashboard.goals.quit30days.description",
  },
  {
    title: "page.memberdashboard.goals.saveMoney.title",
    progress: 45,
    target: "page.memberdashboard.goals.saveMoney.target",
    description: "page.memberdashboard.goals.saveMoney.description",
  },
  {
    title: "page.memberdashboard.goals.exerciseWeekly.title",
    progress: 80,
    target: "page.memberdashboard.goals.exerciseWeekly.target",
    description: "page.memberdashboard.goals.exerciseWeekly.description",
  },
];

export const achievementCategories = [
  {
    name: "page.memberdashboard.achievements.categories.milestones.name",
    achievements: [
      {
        title:
          "page.memberdashboard.achievements.categories.milestones.firstDay.title",
        description:
          "page.memberdashboard.achievements.categories.milestones.firstDay.description",
        progress: 100,
        completed: true,
      },
      {
        title:
          "page.memberdashboard.achievements.categories.milestones.oneWeek.title",
        description:
          "page.memberdashboard.achievements.categories.milestones.oneWeek.description",
        progress: 100,
        completed: true,
      },
      {
        title:
          "page.memberdashboard.achievements.categories.milestones.oneMonth.title",
        description:
          "page.memberdashboard.achievements.categories.milestones.oneMonth.description",
        progress: 70,
        completed: false,
      },
    ],
  },
  {
    name: "page.memberdashboard.achievements.categories.health.name",
    achievements: [
      {
        title:
          "page.memberdashboard.achievements.categories.health.breath.title",
        description:
          "page.memberdashboard.achievements.categories.health.breath.description",
        progress: 100,
        completed: true,
      },
      {
        title:
          "page.memberdashboard.achievements.categories.health.heart.title",
        description:
          "page.memberdashboard.achievements.categories.health.heart.description",
        progress: 100,
        completed: true,
      },
      {
        title: "page.memberdashboard.achievements.categories.health.lung.title",
        description:
          "page.memberdashboard.achievements.categories.health.lung.description",
        progress: 45,
        completed: false,
      },
    ],
  },
  {
    name: "page.memberdashboard.achievements.categories.savings.name",
    achievements: [
      {
        title:
          "page.memberdashboard.achievements.categories.savings.saver.title",
        description:
          "page.memberdashboard.achievements.categories.savings.saver.description",
        progress: 100,
        completed: true,
      },
      {
        title:
          "page.memberdashboard.achievements.categories.savings.master.title",
        description:
          "page.memberdashboard.achievements.categories.savings.master.description",
        progress: 30,
        completed: false,
      },
    ],
  },
];
