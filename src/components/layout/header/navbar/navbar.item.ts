export type NavItem = {
  title: string
  href: string
  description?: string
  items?: {
    title: string
    href: string
    description?: string
  }[]
  requireAuth?: boolean
}

export interface NavItems {
    items: NavItem[];
}

export const aboutItems: NavItem[] = [
  {
    title: "nav.about.team.title",
    href: "/about/team",
    description: "nav.about.team.description"
  },
  {
    title: "nav.about.story.title",
    href: "/about/story",
    description: "nav.about.story.description"
  },
]

export const leaderboardItems: NavItem[] = [
  {
    title: "nav.leaderboard.global.title",
    href: "/leaderboard",
    description: "nav.leaderboard.global.description"
  },
  {
    title: "nav.leaderboard.hallOfFame.title",
    href: "/leaderboard/hall-of-fame",
    description: "nav.leaderboard.hallOfFame.description"
  }
]

export type NavigationType = {
  title: string;
  href: string;
  requireAuth?: boolean;
  description?: string;
  items?: NavItem[];
};

export const mainNav: NavigationType[] = [
  {
    title: "nav.profile.title",
    href: "/profile",
    requireAuth: true,
  },
  {
    title: "nav.settings.title",
    href: "/settings",
    requireAuth: true,
  },
  {
    title: "nav.home.title",
    href: "/",
  },
  {
    title: "nav.pricing.title",
    href: "/pricing",
    description: "nav.pricing.description",
  },
  {
    title: "nav.blog.title",
    href: "/blog",
    description: "nav.blog.description",
  },
  {
    title: "nav.leaderboard.title",
    href: "/leaderboard",
    description: "nav.leaderboard.description",
    items: leaderboardItems
  },
  {
    title: "nav.community.title",
    href: "/community",
    description: "nav.community.description",
  },
  {
    title: "nav.about.title",
    href: "/about-us",
    description: "nav.about.description",
    items: aboutItems
  },
  {
    title: "nav.contact.title",
    href: "/contact",
  },
]