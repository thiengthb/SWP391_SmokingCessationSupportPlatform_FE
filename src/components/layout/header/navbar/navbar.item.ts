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
    title: "Our Team",
    href: "/about/team",
    description: "Meet the amazing people behind our success"
  },
  {
    title: "Our Story",
    href: "/about/story",
    description: "Learn about our journey and mission"
  },
]

export const blogItems: NavItem[] = [
  {
    title: "Latest Posts",
    href: "/blog/latest",
    description: "Check out our most recent articles"
  },
  {
    title: "Featured",
    href: "/blog/featured",
    description: "Must-read articles from our editors"
  },
  {
    title: "Categories",
    href: "/blog/categories",
    description: "Browse articles by topic"
  }
]

export const leaderboardItems: NavItem[] = [
  {
    title: "Global Rankings",
    href: "/leaderboard/global",
    description: "See top performers worldwide"
  },
  {
    title: "Hall of Fame",
    href: "/leaderboard/hall-of-fame",
    description: "All-time greatest performances"
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
    title: "Dashboard",
    href: "/dashboard",
    requireAuth: true,
  },
  {
    title: "Profile",
    href: "/profile",
    requireAuth: true,
  },
  {
    title: "Settings",
    href: "/setting",
    requireAuth: true,
  },
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "News, articles, and resources",
    items: blogItems
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    description: "Explore top rankings and achievements",
    items: leaderboardItems
  },
  {
    title: "Community",
    href: "/community",
    description: "Connect with other members",
  },
  {
    title: "About Us",
    href: "/about",
    description: "Learn more about our company",
    items: aboutItems
  },
  {
    title: "Contact",
    href: "/contact",
  },
]