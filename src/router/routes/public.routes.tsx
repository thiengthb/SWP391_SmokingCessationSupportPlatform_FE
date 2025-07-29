import LazyLoad from "@/lazyload";
import { Navigate, type RouteObject } from "react-router-dom";
import { Paths } from "../../constants/path";
import { BlogPageSkeleton } from "@/components/skeleton/BlogSkeleton";
import HallOfFamePage from "@/pages/leaderboard/HallOfFame";

const ContactPage = LazyLoad("./pages/contact");
const TeamPage = LazyLoad("./pages/about/team");
const StoryPage = LazyLoad("./pages/about/story");
const TestimonialsPage = LazyLoad("./pages/testimonials");
const CommunityPage = LazyLoad("./pages/community");
const LeaderboardPage = LazyLoad("./pages/leaderboard");
const PricingPage = LazyLoad("./pages/pricing");
const PaymentResult = LazyLoad("./pages/payment/PaymentResult");
const BlogPage = LazyLoad("./pages/blog", BlogPageSkeleton);
const BlogPostPage = LazyLoad("./pages/blog/[slug]");

export const publicRoutes: RouteObject[] = [
  { index: true, element: <Navigate to={Paths.PUBLIC.ROOT} /> },
  { path: Paths.PUBLIC.CONTACT, element: <ContactPage /> },
  {
    path: Paths.PUBLIC.ABOUT.ROOT,
    children: [
      { index: true, element: <Navigate to={Paths.PUBLIC.ABOUT.TEAM} /> },
      { path: Paths.PUBLIC.ABOUT.TEAM, element: <TeamPage /> },
      { path: Paths.PUBLIC.ABOUT.STORY, element: <StoryPage /> },
    ],
  },
  {
    path: Paths.PUBLIC.BLOG.ROOT,
    children: [
      { index: true, element: <Navigate to={Paths.PUBLIC.BLOG.ALL} /> },
      { path: Paths.PUBLIC.BLOG.ALL, element: <BlogPage /> },
      { path: Paths.PUBLIC.BLOG.DETAIL_PATH, element: <BlogPostPage /> },
    ],
  },
  { path: Paths.PUBLIC.PRICING, element: <PricingPage /> },
  { path: Paths.PUBLIC.TESTIMONIALS, element: <TestimonialsPage /> },
  { path: Paths.PUBLIC.COMMUNITY, element: <CommunityPage /> },
  {
    path: Paths.PUBLIC.LEADERBOARD.ROOT,
    children: [
      { path: Paths.PUBLIC.LEADERBOARD.RANKINGS, element: <LeaderboardPage /> },
      { path: "hall-of-fame", element: <HallOfFamePage /> },
    ],
  },
  { path: Paths.PUBLIC.PAYMENT, element: <PaymentResult /> },
];
