import { Heart, Users, Shield, Target } from "lucide-react";

export const milestones = [
  {
    year: "2025",
    title: "The Beginning",
    description: "Launched the initial version of our app focused on smoking cessation",
  },
  {
    year: "2026",
    title: "Community Growth",
    description: " Expanded user base to over 10,000 active members",
  },
  {
    year: "2027",
    title: "Major Updates",
    description: "Introduced AI-powered personalized recommendations and tracking",
  },
  {
    year: "2028",
    title: "Global Impact",
    description: "Expanded to multiple languages and reached users worldwide",
  },
];

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  description: string;
}

export const teamMembers :TeamMember[] = [
  {
    name: "Tran Ngoc Thien",
    role: "Project Leader",
    image: "/team/member1.jpg",
    description: "Leading the development team with a focus on innovation and user experience, ensuring the project meets its goals",
  },
  {
    name: "Vu Anh Tuan",
    role: "Backend Developer",
    image: "/team/member2.jpg",
    description: "Expert in Springboot and MySQL, focusing on scalable backend solutions for health tech",
  },
  {
    name: "Tran Nhat Chinh",
    role: "Backend Developer",
    image: "/team/member3.jpg",
    description: "Backend developer with expertise in Springboot and database management, ensuring robust application performance",
  },
  {
    name: "Hoang Tung Lam",
    role: "Frontend Developer",
    image: "/team/member4.jpg",
    description: "Frontend developer specializing in React and responsive design, making applications user-friendly",
  }
];

export const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "90%", label: "Success Rate" },
  { value: "24/7", label: "Support" },
  { value: "5★", label: "Rating" }
];

export const features = [
  {
    icon: Heart,
    title: "Health-First Approach",
    description: "Evidence-based methods and personalized plans for successful quitting"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with others on the same journey and share experiences"
  },
  {
    icon: Shield,
    title: "Expert Guidance",
    description: "Professional coaches and medical experts to support your journey"
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set and track your goals with detailed progress analytics"
  }
];