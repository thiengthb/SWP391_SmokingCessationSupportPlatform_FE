export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  saved?: number;
  duration: string;
  highlighted?: boolean;
}

export interface ProgramFeature {
  title: string;
  description: string;
  free: boolean;
  paid: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}
