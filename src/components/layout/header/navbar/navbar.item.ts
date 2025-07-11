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
    title: "nav.about.team.title",
    icon: BadgeInfo,
    href: Paths.PUBLIC.ABOUT.TEAM,
    description: "nav.about.team.description",
    forDisplays: [ForDisplay.ALL],
    forRoles: [ForRoles.ALL],
    items: null,
  },
  {
    id: "about-story",
    title: "nav.about.story.title",
    icon: LibraryBig,
    href: Paths.PUBLIC.ABOUT.STORY,
    description: "nav.about.story.description",
    forDisplays: [ForDisplay.ALL],
    forRoles: [ForRoles.ALL],
    items: null,
  },
]

export const leaderboardItems: NavItem[] = [
  {
    id: "leaderboard-global",
    title: "nav.leaderboard.global.title",
    icon: Earth,
    href: Paths.PUBLIC.LEADERBOARD.RANKINGS,
    description: "nav.leaderboard.global.description",
    forDisplays: [ForDisplay.ALL],
    forRoles: [ForRoles.ALL],
    items: null,
  },
  {
    id: "leaderboard-hall-of-fame",
    title: "nav.leaderboard.hallOfFame.title",
    icon: Landmark,
    href: Paths.PUBLIC.LEADERBOARD.HALL_OF_FAME,
    description: "nav.leaderboard.hallOfFame.description",
    forDisplays: [ForDisplay.ALL],
    forRoles: [ForRoles.ALL],
    items: null,
  }
]

export const mainNav: NavItem[] = [
  {
    id: "profile",
    title: "nav.profile.title",
    icon: User,
    href: Paths.ACCOUNT.PROFILE,
    description: null,
    forDisplays: [ForDisplay.USER_NAV, ForDisplay.MOBILE_AUTHENTICATED],
    forRoles: [ForRoles.COACH, ForRoles.MEMBER],
    items: null,
  },
  {
    id: "settings",
    title: "nav.settings.title",
    icon: Settings,
    href: Paths.ACCOUNT.SETTING,
    description: null,
    forDisplays: [ForDisplay.USER_NAV, ForDisplay.MOBILE_AUTHENTICATED],
    forRoles: [ForRoles.COACH, ForRoles.MEMBER, ForRoles.ADMIN],
    items: null,
  },
  {
    id: "home",
    title: "nav.home.title",
    icon: House,
    href: Paths.PUBLIC.ROOT,
    description: null,
    forDisplays: [ForDisplay.ALL_MOBILE, ForDisplay.ALL_NAVBAR],
    forRoles: [ForRoles.ALL],
    items: null,
  },
  {
    id: "pricing",
    title: "nav.pricing.title",
    icon: Gem,
    href: Paths.PUBLIC.PRICING,
    description: "nav.pricing.description",
    forDisplays: [ForDisplay.ALL_MOBILE, ForDisplay.NAVBAR_GUEST, ForDisplay.USER_NAV],
    forRoles: [ForRoles.ALL],
    items: null,
  },
  {
    id: "blog",
    title: "nav.blog.title",
    icon: BookMarked,
    href: Paths.PUBLIC.BLOG.ROOT,
    description: "nav.blog.description",
    forDisplays: [ForDisplay.ALL_MOBILE, ForDisplay.ALL_NAVBAR],
    forRoles: [ForRoles.ALL],
    items: null,
  },
  {
    id: "leaderboard",
    title: "nav.leaderboard.title",
    icon: LandPlot,
    href: Paths.PUBLIC.LEADERBOARD.ROOT,
    description: "nav.leaderboard.description",
    forDisplays: [ForDisplay.ALL_MOBILE, ForDisplay.ALL_NAVBAR],
    forRoles: [ForRoles.ALL],
    items: leaderboardItems
  },
  {
    id: "community",
    title: "nav.community.title",
    icon: MessageCircleMore,
    href: Paths.PUBLIC.COMMUNITY,
    description: "nav.community.description",
    forDisplays: [ForDisplay.ALL_MOBILE, ForDisplay.ALL_NAVBAR],
    forRoles: [ForRoles.ALL],
    items: null
  },
  {
    id: "about",
    title: "nav.about.title",
    icon: BookOpenText,
    href: Paths.PUBLIC.ABOUT.ROOT,
    description: "nav.about.description",
    forDisplays: [ForDisplay.ALL_MOBILE, ForDisplay.NAVBAR_GUEST, ForDisplay.USER_NAV],
    forRoles: [ForRoles.ALL],
    items: aboutItems,
  },
  {
    id: "contact",
    icon: Send,
    title: "nav.contact.title",
    href: Paths.PUBLIC.CONTACT,
    description: null,
    forDisplays: [ForDisplay.ALL_MOBILE, ForDisplay.NAVBAR_GUEST, ForDisplay.USER_NAV],
    forRoles: [ForRoles.ALL],
    items: null,
  },
  {
    id: "feedback",
    icon: MessageSquareText,
    title: "nav.feedback.title",
    href: Paths.ACCOUNT.FEEDBACK,
    description: null,
    forDisplays: [ForDisplay.USER_NAV],
    forRoles: [ForRoles.COACH, ForRoles.MEMBER],
    items: null,
  }
]