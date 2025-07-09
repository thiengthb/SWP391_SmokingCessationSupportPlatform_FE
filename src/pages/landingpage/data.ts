import { Shield, Activity, Users, Heart, Clock, Star } from "lucide-react";
import type { Feature } from "./types";

export const features: Feature[] = [
  {
    icon: Shield,
    title: "feature.shield.title",
    description: "feature.shield.description",
  },
  {
    icon: Activity,
    title: "feature.activity.title",
    description: "feature.activity.description",
  },
  {
    icon: Users,
    title: "feature.communitySupport.title",
    description: "feature.communitySupport.description",
  },
  {
    icon: Heart,
    title: "feature.health.title",
    description: "feature.health.description",
  },
  {
    icon: Clock,
    title: "feature.timeEfficient.title",
    description: "feature.timeEfficient.description",
  },
  {
    icon: Star,
    title: "feature.success.title",
    description: "feature.success.description",
  },
];

export const successItems = [
  "landingPage.successItems.item1",
  "landingPage.successItems.item2",
  "landingPage.successItems.item3",
  "landingPage.successItems.item4",
];

export const testimonials = [
  {
    text: "testimonial.item1.text",
    author: "Alice",
    rating: 5,
    role: "testimonial.item1.role",
    date: "2023-10-01",
  },
  {
    text: "testimonial.item2.text",
    author: "Bob",
    rating: 4,
    role: "testimonial.item2.role",
    date: "2023-09-15",
  },
  {
    text: "testimonial.item3.text",
    author: "Charlie",
    rating: 5,
    role: "testimonial.item3.role",
    date: "2023-08-20",
  },
];
