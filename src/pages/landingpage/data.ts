import { Shield, Activity, Users, Heart, Clock, Star } from "lucide-react";
import type { Feature } from "./types";

export const features: Feature[] = [
  {
    icon: Shield,
    title: "Evidence-Based Methods",
    description: "Scientifically proven techniques to help you quit",
  },
  {
    icon: Activity,
    title: "Progress Tracking",
    description: "Monitor your health improvements in real-time",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with others on the same journey",
  },
  {
    icon: Heart,
    title: "Health Improvement",
    description: "Experience better health and wellness",
  },
  {
    icon: Clock,
    title: "Time-Efficient",
    description: "Quick and easy methods to track your progress",
  },
  {
    icon: Star,
    title: "Proven Success",
    description: "Join the ranks of our successful quitters",
  },
];

export const successItems = [
  "Over 100,000 successful quitters",
  "90% success rate after 3 months",
  "Average savings of $2,000 per year",
  "Improved health within weeks",
];

export const testimonials = [
  { text: "Great service!", author: "Alice", rating: 5, role: "Customer", date: "2023-10-01" },
  { text: "Loved the experience.", author: "Bob", rating: 4, role: "User", date: "2023-09-15" },
  { text: "Highly recommend.", author: "Charlie", rating: 5, role: "Client", date: "2023-08-20" },
];
