import type { Testimonial } from "@/pages/landingpage/types";

export const testimonials: Testimonial[] = [
  {
    author: "John Doe",
    role: "Software Engineer",
    text: "This platform helped me quit smoking after 10 years. The community support was incredible!",
    rating: 5,
    date: "2024-02-15",
    verified: true,
    highlight: "Community support was incredible",
    tags: ["community", "long-term-smoker"],
    avatar: "/avatars/john.jpg"
  },
  {
    author: "Sarah Wilson",
    role: "Teacher",
    text: "The tracking features and daily motivation helped me stay on track. 6 months smoke-free!",
    rating: 5,
    date: "2024-03-01",
    verified: true,
    highlight: "6 months smoke-free!",
    tags: ["tracking", "motivation"],
    avatar: "/avatars/sarah.jpg"
  },
  {
    author: "Michael Chen",
    role: "Business Analyst",
    text: "After trying multiple times to quit, this platform finally helped me succeed. The personalized approach made all the difference.",
    rating: 4,
    date: "2024-02-28",
    verified: true,
    tags: ["personalized", "success-story"],
    avatar: "/avatars/michael.jpg"
  }
];
