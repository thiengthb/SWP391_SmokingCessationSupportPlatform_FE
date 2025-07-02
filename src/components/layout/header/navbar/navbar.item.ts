export type NavItem = {
  id: string;
  title: string;
  href: string;
  description?: string;
  items?: {
    title: string;
    href: string;
    description?: string;
  }[];
  displayMobile?: boolean;
}

export interface NavItems {
    items: NavItem[];
}

export const aboutItems: NavItem[] = [
  {
    id: "about-us",
    title: "nav.about.team.title",
    href: "/about-us/team",
    description: "nav.about.team.description"
  },
  {
    id: "about-story",
    title: "nav.about.story.title",
    href: "/about-us/story",
    description: "nav.about.story.description"
  },
]

export const leaderboardItems: NavItem[] = [
  {
    id: "leaderboard-global",
    title: "nav.leaderboard.global.title",
    href: "/leaderboard",
    description: "nav.leaderboard.global.description"
  },
  {
    id: "leaderboard-hall-of-fame",
    title: "nav.leaderboard.hallOfFame.title",
    href: "/leaderboard/hall-of-fame",
    description: "nav.leaderboard.hallOfFame.description"
  }
]

export type NavigationType = {
  id: string;
  title: string;
  href: string;
  displayMobile?: boolean;
  description?: string;
  items?: NavItem[];
};

export const mainNav: NavigationType[] = [
  {
    id: "profile",
    title: "nav.profile.title",
    href: "/profile",
    displayMobile: true,
  },
  {
    id: "settings",
    title: "nav.settings.title",
    href: "/settings",
    displayMobile: true,
  },
  {
    id: "home",
    title: "nav.home.title",
    href: "/",
  },
  {
    id: "pricing",
    title: "nav.pricing.title",
    href: "/pricing",
    description: "nav.pricing.description",
  },
  {
    id: "blog",
    title: "nav.blog.title",
    href: "/blog",
    description: "nav.blog.description",
  },
  {
    id: "leaderboard",
    title: "nav.leaderboard.title",
    href: "/leaderboard",
    description: "nav.leaderboard.description",
    items: leaderboardItems
  },
  {
    id: "community",
    title: "nav.community.title",
    href: "/community",
    description: "nav.community.description",
  },
  {
    id: "about",
    title: "nav.about.title",
    href: "/about-us",
    description: "nav.about.description",
    items: aboutItems
  },
  {
    id: "contact",
    title: "nav.contact.title",
    href: "/contact",
  },
]