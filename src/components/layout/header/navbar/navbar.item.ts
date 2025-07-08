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
    title: "nav.about.team.title",
    icon: BadgeInfo,
    href: "/about-us/team",
    description: "nav.about.team.description"
  },
  {
    id: "about-story",
    title: "nav.about.story.title",
    icon: LibraryBig,
    href: "/about-us/story",
    description: "nav.about.story.description"
  },
]

export const leaderboardItems: NavItem[] = [
  {
    id: "leaderboard-global",
    title: "nav.leaderboard.global.title",
    icon: Earth,
    href: "/leaderboard",
    description: "nav.leaderboard.global.description"
  },
  {
    id: "leaderboard-hall-of-fame",
    title: "nav.leaderboard.hallOfFame.title",
    icon: Landmark,
    href: "/leaderboard/hall-of-fame",
    description: "nav.leaderboard.hallOfFame.description"
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
    title: "nav.profile.title",
    icon: User,
    href: "/profile",
    displayMobile: true,
  },
  {
    id: "settings",
    title: "nav.settings.title",
    icon: Settings,
    href: "/settings",
    displayMobile: true,
  },
  {
    id: "home",
    title: "nav.home.title",
    icon: House,
    href: "/",
  },
  {
    id: "pricing",
    title: "nav.pricing.title",
    icon: Gem,
    href: "/pricing",
    description: "nav.pricing.description",
  },
  {
    id: "blog",
    title: "nav.blog.title",
    icon: BookMarked,
    href: "/blog",
    description: "nav.blog.description",
  },
  {
    id: "leaderboard",
    title: "nav.leaderboard.title",
    icon: LandPlot,
    href: "/leaderboard",
    description: "nav.leaderboard.description",
    items: leaderboardItems
  },
  {
    id: "community",
    title: "nav.community.title",
    icon: MessageCircleMore,
    href: "/community",
    description: "nav.community.description",
  },
  {
    id: "about",
    title: "nav.about.title",
    icon: BookOpenText,
    href: "/about-us",
    description: "nav.about.description",
    items: aboutItems
  },
  {
    id: "contact",
    icon: Send,
    title: "nav.contact.title",
    href: "/contact",
  },
]