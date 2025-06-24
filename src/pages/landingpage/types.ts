import type { ElementType } from "react";

export interface Feature {
  icon: ElementType;
  title: string;
  description: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  avatar?: string;
  rating: number;
  date: string;
  verified?: boolean;
  highlight?: string;
  tags?: string[];
}

export interface SectionProps {
  className?: string;
}

export interface SuccessStoriesSectionProps {
  items: string[];
  testimonials: Testimonial[];
  onReadMore: () => void;
}

export interface HeroSectionProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

export interface FeaturesSectionProps {
  features: Feature[];
}

export interface CTASectionProps {
  onGetStarted: () => void;
}

export interface HomePageProps extends SectionProps {
  className?: string;
}