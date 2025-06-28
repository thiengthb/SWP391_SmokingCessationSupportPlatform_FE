import { useNavigate } from "react-router-dom";
import { HeroSection } from "./components/HeroSection";

import { features, successItems, testimonials } from "./data";
import type { HomePageProps } from "./types";
import { FeaturesSection } from "./components/FeaturesSection";
import { SuccessStoriesSection } from "./components/SuccessStoriesSection";
import { CTASection } from "./components/CTASection";
import { useTranslation } from "react-i18next";

export default function LandingPage({ className }: HomePageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth/register");
  };

  const handleLearnMore = () => {
    navigate("/about");
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
         items={successItems.map((key) => t(key))}
        testimonials={testimonials}
        onReadMore={handleReadStories}
      />
      <CTASection onGetStarted={handleGetStarted} />
    </main>
  );
}
