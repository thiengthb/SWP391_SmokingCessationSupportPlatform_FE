export interface HallOfFameMember {
  id: string;
  name: string;
  achievement: string;
  date: string;
  avatar?: string;
  milestone: string;
  daysSmokeFree: number;
  moneySaved: string;
  story?: string;
}

export const champions: HallOfFameMember[] = [
  {
    id: "1",
    name: "Michael Chen",
    achievement: "2 Years Smoke-Free Legend",
    date: "2023",
    avatar: "/avatars/michael.jpg",
    milestone: "Diamond Elite",
    daysSmokeFree: 730,
    moneySaved: "$5,840",
    story: "Started with small steps, now helping others in their journey."
  },
  {
    id: "2",
    name: "Sarah Williams",
    achievement: "18 Months Champion",
    date: "2023",
    avatar: "/avatars/sarah.jpg",
    milestone: "Diamond",
    daysSmokeFree: 547,
    moneySaved: "$4,376",
    story: "From pack-a-day to running marathons."
  },
  {
    id: "3",
    name: "James Rodriguez",
    achievement: "Community Leader Award",
    date: "2023",
    avatar: "/avatars/james.jpg",
    milestone: "Diamond",
    daysSmokeFree: 456,
    moneySaved: "$3,648",
    story: "Helped over 100 members in their quit journey."
  },
  {
    id: "4",
    name: "Emily Chang",
    achievement: "Most Inspiring Story",
    date: "2023",
    milestone: "Platinum",
    daysSmokeFree: 395,
    moneySaved: "$3,160",
    story: "Quit for my newborn daughter, never looked back."
  },
  {
    id: "5",
    name: "Robert Martinez",
    achievement: "Determination Award",
    date: "2023",
    avatar: "/avatars/robert.jpg",
    milestone: "Platinum",
    daysSmokeFree: 380,
    moneySaved: "$3,040",
    story: "Failed 5 times, succeeded on the 6th attempt."
  },
  {
    id: "6",
    name: "Lisa Anderson",
    achievement: "Health Transformation",
    date: "2023",
    avatar: "/avatars/lisa.jpg",
    milestone: "Platinum",
    daysSmokeFree: 365,
    moneySaved: "$2,920",
    story: "Lost 20 pounds and started teaching yoga."
  }
];
