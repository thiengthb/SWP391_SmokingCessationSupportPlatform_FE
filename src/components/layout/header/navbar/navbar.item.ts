import { forRoles } from "@/utils/TabUtil";
import { BadgeInfo, BookMarked, BookOpenText, Earth, Gem, House, Landmark, LandPlot, LibraryBig, MessageCircleMore, Send, Settings, User, type LucideIcon } from "lucide-react";

export type NavItem = {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  description: string | null;
  navbarLoginDisplay: boolean;
  userNavDisplay: boolean;
  displayMobile: boolean;
  forRoles: forRoles[];
  items: NavItem[] | null;
}

export const aboutItems: NavItem[] = [
  {
    id: "about-us",
    title: "nav.about.team.title",
    icon: BadgeInfo,
    href: "/about-us/team",
    description: "nav.about.team.description",
    navbarLoginDisplay: true,
    userNavDisplay: false,
    displayMobile: true,
    forRoles: [forRoles.ALL],
    items: null,
  },
  {
    id: "about-story",
    title: "nav.about.story.title",
    icon: LibraryBig,
    href: "/about-us/story",
    description: "nav.about.story.description",
    navbarLoginDisplay: true,
    userNavDisplay: false,
    displayMobile: true,
    forRoles: [forRoles.ALL],
    items: null,
  },
]

export const leaderboardItems: NavItem[] = [
  {
    id: "leaderboard-global",
    title: "nav.leaderboard.global.title",
    icon: Earth,
    href: "/leaderboard",
    description: "nav.leaderboard.global.description",
    navbarLoginDisplay: true,
    userNavDisplay: false,
    displayMobile: true,
    forRoles: [forRoles.ALL],
    items: null,
  },
  {
    id: "leaderboard-hall-of-fame",
    title: "nav.leaderboard.hallOfFame.title",
    icon: Landmark,
    href: "/leaderboard/hall-of-fame",
    description: "nav.leaderboard.hallOfFame.description",
    navbarLoginDisplay: true,
    userNavDisplay: false,
    displayMobile: true,
    forRoles: [forRoles.ALL],
    items: null,
  }
]

export const mainNav: NavItem[] = [
  {
    id: "profile",
    title: "nav.profile.title",
    icon: User,
    href: "/profile",
    description: null,
    navbarLoginDisplay: false,
    userNavDisplay: true,
    displayMobile: true,
    forRoles: [forRoles.COACH, forRoles.MEMBER],
    items: null,
  },
  {
    id: "settings",
    title: "nav.settings.title",
    icon: Settings,
    href: "/settings",
    description: null,
    navbarLoginDisplay: false,
    userNavDisplay: true,
    displayMobile: true,
    forRoles: [forRoles.COACH, forRoles.MEMBER, forRoles.ADMIN],
    items: null,
  },
  {
    id: "home",
    title: "nav.home.title",
    icon: House,
    href: "/",
    description: null,
    navbarLoginDisplay: true,
    userNavDisplay: false,
    displayMobile: true,
    forRoles: [forRoles.ALL],
    items: null,
  },
  {
    id: "pricing",
    title: "nav.pricing.title",
    icon: Gem,
    href: "/pricing",
    description: "nav.pricing.description",
    navbarLoginDisplay: false,
    userNavDisplay: true,
    displayMobile: true,
    forRoles: [forRoles.ALL],
    items: null,
  },
  {
    id: "blog",
    title: "nav.blog.title",
    icon: BookMarked,
    href: "/blog",
    description: "nav.blog.description",
    navbarLoginDisplay: true,
    userNavDisplay: false,
    displayMobile: true,
    forRoles: [forRoles.ALL],
    items: null,
  },
  {
    id: "leaderboard",
    title: "nav.leaderboard.title",
    icon: LandPlot,
    href: "/leaderboard",
    description: "nav.leaderboard.description",
    navbarLoginDisplay: true,
    userNavDisplay: false,
    displayMobile: true,
    forRoles: [forRoles.ALL],
    items: leaderboardItems
  },
  {
    id: "community",
    title: "nav.community.title",
    icon: MessageCircleMore,
    href: "/community",
    description: "nav.community.description",
    navbarLoginDisplay: true,
    userNavDisplay: false,
    displayMobile: true,
    forRoles: [forRoles.ALL],
    items: null
  },
  {
    id: "about",
    title: "nav.about.title",
    icon: BookOpenText,
    href: "/about-us",
    description: "nav.about.description",
    navbarLoginDisplay: false,
    userNavDisplay: true,
    displayMobile: true,
    forRoles: [forRoles.ALL],
    items: aboutItems,
  },
  {
    id: "contact",
    icon: Send,
    title: "nav.contact.title",
    href: "/contact",
    description: null,
    navbarLoginDisplay: false,
    userNavDisplay: true,
    displayMobile: true,
    forRoles: [forRoles.ALL],
    items: null,
  },
]

export { forRoles };
