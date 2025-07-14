import { useNavigate } from "react-router-dom";
import { HeroSection } from "./components/HeroSection";
import { features, successItems, testimonials } from "./data";
import { FeaturesSection } from "./components/FeaturesSection";
import { SuccessStoriesSection } from "./components/SuccessStoriesSection";
import { CTASection } from "./components/CTASection";

import { useTranslate } from "@/hooks/useTranslate";

interface SectionProps {
  className?: string;
}

export default function LandingPage({ className }: SectionProps) {
  const { tLandingpage } = useTranslate();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth/register");
  };

  const handleLearnMore = () => {
    navigate("/about-us");
  };

  const handleReadStories = () => {
    navigate("/testimonials");
  };

  return (
    <main className={`flex flex-col min-h-screen ${className}`}>
      <HeroSection
        onGetStarted={handleGetStarted}
        onLearnMore={handleLearnMore}
      />
      <FeaturesSection features={features} />
      <SuccessStoriesSection
        items={successItems.map((key) => tLandingpage(key))}
        testimonials={testimonials}
        onReadMore={handleReadStories}
      />
      <CTASection onGetStarted={handleGetStarted} />
    </main>
  );
}
