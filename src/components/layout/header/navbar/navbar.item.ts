import { Paths } from "@/constants/path";
import { Role } from "@/types/enums/Role";
import { ForRoles } from "@/utils/tab.util";
import { BadgeInfo, BookMarked, BookOpenText, Earth, Gem, House, Landmark, LandPlot, LibraryBig, MessageCircleMore, MessageSquareText, Send, Settings, User, type LucideIcon } from "lucide-react";

export const ForDisplay = {
  NAVBAR_GUEST: 1,
  NAVBAR_AUTHENTICATED: 2,
  USER_NAV: 3,
  MOBILE_GUEST: 4,
  MOBILE_AUTHENTICATED: 5,
  ALL: 6,
  ALL_NAVBAR: 7,
  ALL_MOBILE: 8,
} as const;

export type ForDisplay = (typeof ForDisplay)[keyof typeof ForDisplay];

export const routeRoleDashboard = (role: Role | undefined) => {
  if (!role) return Paths.HOME;
  switch (role) {
    case Role.ADMIN:
      return Paths.ADMIN.DASHBOARD;
    case Role.COACH:
      return Paths.COACH.DASHBOARD;
    case Role.MEMBER:
      return Paths.MEMBER.DASHBOARD;
    default:
      return Paths.HOME;
  }
};

export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  description: string | null;
  forDisplays: ForDisplay[];
  forRoles: ForRoles[];
  items: NavItem[] | null;
}

export const aboutItems: NavItem[] = [
  {
    id: "about-us",
    title: "navbar.about.team.title",
    icon: BadgeInfo,
    href: Paths.PUBLIC.ABOUT.TEAM,
    description: "navbar.about.team.description",
    forDisplays: [ForDisplay.ALL],
    forRoles: [ForRoles.ALL],
    items: null,
  },
  {
    id: "about-story",
    title: "navbar.about.story.title",
    icon: LibraryBig,
    href: Paths.PUBLIC.ABOUT.STORY,
    description: "navbar.about.story.description",
    forDisplays: [ForDisplay.ALL],
    forRoles: [ForRoles.ALL],
    items: null,
  },
]

export const leaderboardItems: NavItem[] = [
  {
    id: "leaderboard-global",
    title: "navbar.leaderboard.global.title",
    icon: Earth,
    href: Paths.PUBLIC.LEADERBOARD.RANKINGS,
    description: "navbar.leaderboard.global.description",
    forDisplays: [ForDisplay.ALL],
    forRoles: [ForRoles.ALL],
    items: null,
  },
  {
    id: "leaderboard-hall-of-fame",
    title: "navbar.leaderboard.hallOfFame.title",
    icon: Landmark,
    href: Paths.PUBLIC.LEADERBOARD.HALL_OF_FAME,
    description: "navbar.leaderboard.hallOfFame.description",
    forDisplays: [ForDisplay.ALL],
    forRoles: [ForRoles.ALL],
    items: null,
  }
]

export const mainNav: NavItem[] = [
  {
    id: "profile",
    title: "navbar.profile.title",
    icon: User,
    href: Paths.ACCOUNT.PROFILE,
    description: null,
    forDisplays: [ForDisplay.USER_NAV, ForDisplay.MOBILE_AUTHENTICATED],
    forRoles: [ForRoles.COACH, ForRoles.MEMBER],
    items: null,
  },
  {
    id: "settings",
    title: "navbar.settings.title",
    icon: Settings,
    href: Paths.ACCOUNT.SETTING,
    description: null,
    forDisplays: [ForDisplay.USER_NAV, ForDisplay.MOBILE_AUTHENTICATED],
    forRoles: [ForRoles.COACH, ForRoles.MEMBER, ForRoles.ADMIN],
    items: null,
  },
  {
    id: "home",
    title: "navbar.home.title",
    icon: House,
    href: Paths.PUBLIC.ROOT,
    description: null,
    forDisplays: [ForDisplay.ALL_MOBILE, ForDisplay.ALL_NAVBAR],
    forRoles: [ForRoles.ALL],
    items: null,
  },
  {
    id: "pricing",
    title: "navbar.pricing.title",
    icon: Gem,
    href: Paths.PUBLIC.PRICING,
    description: "navbar.pricing.description",
    forDisplays: [ForDisplay.ALL_MOBILE, ForDisplay.NAVBAR_GUEST, ForDisplay.USER_NAV],
    forRoles: [ForRoles.ALL],
    items: null,
  },
  {
    id: "blog",
    title: "navbar.blog.title",
    icon: BookMarked,
    href: Paths.PUBLIC.BLOG.ROOT,
    description: "navbarb.blog.description",
    forDisplays: [ForDisplay.ALL_MOBILE, ForDisplay.ALL_NAVBAR],
    forRoles: [ForRoles.ALL],
    items: null,
  },
  {
    id: "leaderboard",
    title: "navbar.leaderboard.title",
    icon: LandPlot,
    href: Paths.PUBLIC.LEADERBOARD.ROOT,
    description: "navbar.leaderboard.description",
    forDisplays: [ForDisplay.ALL_MOBILE, ForDisplay.ALL_NAVBAR],
    forRoles: [ForRoles.ALL],
    items: leaderboardItems
  },
  {
    id: "community",
    title: "navbar.community.title",
    icon: MessageCircleMore,
    href: Paths.PUBLIC.COMMUNITY,
    description: "navbar.community.description",
    forDisplays: [ForDisplay.ALL_MOBILE, ForDisplay.ALL_NAVBAR],
    forRoles: [ForRoles.ALL],
    items: null
  },
  {
    id: "about",
    title: "navbar.about.title",
    icon: BookOpenText,
    href: Paths.PUBLIC.ABOUT.ROOT,
    description: "navbar.about.description",
    forDisplays: [ForDisplay.ALL_MOBILE, ForDisplay.NAVBAR_GUEST, ForDisplay.USER_NAV],
    forRoles: [ForRoles.ALL],
    items: aboutItems,
  },
  {
    id: "contact",
    icon: Send,
    title: "navbar.contact.title",
    href: Paths.PUBLIC.CONTACT,
    description: null,
    forDisplays: [ForDisplay.ALL_MOBILE, ForDisplay.NAVBAR_GUEST, ForDisplay.USER_NAV],
    forRoles: [ForRoles.ALL],
    items: null,
  },
  {
    id: "feedback",
    icon: MessageSquareText,
    title: "navbar.feedback.title",
    href: Paths.ACCOUNT.FEEDBACK,
    description: null,
    forDisplays: [ForDisplay.USER_NAV],
    forRoles: [ForRoles.COACH, ForRoles.MEMBER],
    items: null,
  }
]