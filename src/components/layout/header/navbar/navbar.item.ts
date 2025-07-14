import { BadgeInfo, BookMarked, BookOpenText, Earth, Gem, House, Landmark, LandPlot, LibraryBig, MessageCircleMore, Send, Settings, User, type LucideIcon } from "lucide-react";

export type NavItem = {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
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
    title: "navbar.about.team.title",
    icon: BadgeInfo,
    href: "/about-us/team",
    description: "navbar.about.team.description"
  },
  {
    id: "about-story",
    title: "navbar.about.story.title",
    icon: LibraryBig,
    href: "/about-us/story",
    description: "navbar.about.story.description"
  },
]

export const leaderboardItems: NavItem[] = [
  {
    id: "leaderboard-global",
    title: "navbar.leaderboard.global.title",
    icon: Earth,
    href: "/leaderboard",
    description: "navbar.leaderboard.global.description"
  },
  {
    id: "leaderboard-hall-of-fame",
    title: "navbar.leaderboard.hallOfFame.title",
    icon: Landmark,
    href: "/leaderboard/hall-of-fame",
    description: "navbar.leaderboard.hallOfFame.description"
  }
]

export type NavigationType = {
  id: string;
  title: string;
  icon: LucideIcon;
  href: string;
  displayMobile?: boolean;
  description?: string;
  items?: NavItem[];
};

export const mainNav: NavigationType[] = [
  {
    id: "profile",
    title: "navbar.profile.title",
    icon: User,
    href: "/profile",
    displayMobile: true,
  },
  {
    id: "settings",
    title: "navbar.settings.title",
    icon: Settings,
    href: "/settings",
    displayMobile: true,
  },
  {
    id: "home",
    title: "navbar.home.title",
    icon: House,
    href: "/",
  },
  {
    id: "pricing",
    title: "navbar.pricing.title",
    icon: Gem,
    href: "/pricing",
    description: "navbar.pricing.description",
  },
  {
    id: "blog",
    title: "navbar.blog.title",
    icon: BookMarked,
    href: "/blog",
    description: "navbar.blog.description",
  },
  {
    id: "leaderboard",
    title: "navbar.leaderboard.title",
    icon: LandPlot,
    href: "/leaderboard",
    description: "navbar.leaderboard.description",
    items: leaderboardItems
  },
  {
    id: "community",
    title: "navbar.community.title",
    icon: MessageCircleMore,
    href: "/community",
    description: "navbar.community.description",
  },
  {
    id: "about",
    title: "navbar.about.title",
    icon: BookOpenText,
    href: "/about-us",
    description: "navbar.about.description",
    items: aboutItems
  },
  {
    id: "contact",
    icon: Send,
    title: "navbar.contact.title",
    href: "/contact",
  },
]