import { Heart, Users, Shield, Target } from "lucide-react";

export const milestones = [
  {
    year: "2025",
    title: "data.aboutus.milestones.0.title",
    description: "data.aboutus.milestones.0.description",
  },
  {
    year: "2026",
    title: "data.aboutus.milestones.1.title",
    description: "data.aboutus.milestones.1.description",
  },
  {
    year: "2027",
    title: "data.aboutus.milestones.2.title",
    description: "data.aboutus.milestones.2.description",
  },
  {
    year: "2028",
    title: "data.aboutus.milestones.3.title",
    description: "data.aboutus.milestones.3.description",
  },
];

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  description: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "data.aboutus.team.members.0.name",
    role: "data.aboutus.team.members.0.role",
    description: "data.aboutus.team.members.0.description",
    image: "",
  },
  {
    name: "data.aboutus.team.members.1.name",
    role: "data.aboutus.team.members.1.role",
    description: "data.aboutus.team.members.1.description",
    image: "",
  },
  {
    name: "data.aboutus.team.members.2.name",
    role: "data.aboutus.team.members.2.role",
    description: "data.aboutus.team.members.2.description",
    image: "",
  },
  {
    name: "data.aboutus.team.members.3.name",
    role: "data.aboutus.team.members.3.role",
    description: "data.aboutus.team.members.3.description",
    image: "",
  },
];

export const stats = [
  { value: "50K+", label: "data.aboutus.stats.0.label" },
  { value: "90%", label: "data.aboutus.stats.1.label" },
  { value: "24/7", label: "data.aboutus.stats.2.label" },
  { value: "5★", label: "data.aboutus.stats.3.label" },
];

export const features = [
  {
    icon: Heart,
    title: "data.aboutus.features.0.title",
    description: "data.aboutus.features.0.description",
  },
  {
    icon: Users,
    title: "data.aboutus.features.1.title",
    description: "data.aboutus.features.1.description",
  },
  {
    icon: Shield,
    title: "data.aboutus.features.2.title",
    description: "data.aboutus.features.2.description",
  },
  {
    icon: Target,
    title: "data.aboutus.features.3.title",
    description: "data.aboutus.features.3.description",
  },
];
