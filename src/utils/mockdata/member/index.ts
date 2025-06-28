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
    title: "First Week Complete",
    description: "7 days smoke-free",
    progress: 100,
  },
  {
    title: "Money Saver",
    description: "Saved $50",
    progress: 70,
  },
  {
    title: "Health Improver",
    description: "Oxygen levels normalized",
    progress: 85,
  },
];

export const healthTimeline = [
  {
    time: "20 minutes",
    description: "Heart rate and blood pressure drop",
    completed: true,
  },
  {
    time: "12 hours",
    description: "Carbon monoxide levels normalize",
    completed: true,
  },
  {
    time: "2-12 weeks",
    description: "Circulation improves",
    completed: false,
  },
  {
    time: "1-9 months",
    description: "Coughing and shortness of breath decrease",
    completed: false,
  },
];

export const goals = [
  {
    title: "Quit for 30 Days",
    progress: 60,
    target: "20 days remaining",
    description: "Stay smoke-free for a full month"
  },
  {
    title: "Save $500",
    progress: 45,
    target: "$275 to go",
    description: "Track your financial benefits"
  },
  {
    title: "Exercise Weekly",
    progress: 80,
    target: "3 of 4 weeks complete",
    description: "Build healthy habits"
  }
];

export const achievementCategories = [
	{
		name: "Milestones",
		achievements: [
			{
				title: "First Day",
				description: "Complete your first smoke-free day",
				progress: 100,
				completed: true
			},
			{
				title: "One Week Wonder",
				description: "Stay smoke-free for 7 days",
				progress: 100,
				completed: true
			},
			{
				title: "One Month Milestone",
				description: "Complete 30 days smoke-free",
				progress: 70,
				completed: false
			}
		]
	},
	{
		name: "Health",
		achievements: [
			{
				title: "Breath of Fresh Air",
				description: "Oxygen levels return to normal",
				progress: 100,
				completed: true
			},
			{
				title: "Heart Hero",
				description: "Blood pressure normalizes",
				progress: 100,
				completed: true
			},
			{
				title: "Lung Power",
				description: "Lung capacity improves by 30%",
				progress: 45,
				completed: false
			}
		]
	},
	{
		name: "Savings",
		achievements: [
			{
				title: "Money Saver",
				description: "Save your first $100",
				progress: 100,
				completed: true
			},
			{
				title: "Money Master",
				description: "Save $1000 from not smoking",
				progress: 30,
				completed: false
			}
		]
	}
];

