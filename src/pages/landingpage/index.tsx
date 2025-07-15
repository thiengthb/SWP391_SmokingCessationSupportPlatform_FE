import { useNavigate } from "react-router-dom";
import { HeroSection } from "./components/HeroSection";
import { features, successItems, testimonials } from "./data";
import { FeaturesSection } from "./components/FeaturesSection";
import { SuccessStoriesSection } from "./components/SuccessStoriesSection";
import { CTASection } from "./components/CTASection";

import { useTranslate } from "@/hooks/useTranslate";
import { Paths } from "@/constants/path";

interface SectionProps {
  className?: string;
}

export default function LandingPage({ className }: SectionProps) {
  const { tLandingpage } = useTranslate();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(Paths.AUTH.REGISTER);
  };

  const handleLearnMore = () => {
    navigate(Paths.PUBLIC.ABOUT.ROOT);
  };

  const handleReadStories = () => {
    navigate(Paths.PUBLIC.TESTIMONIALS);
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
