import { useNavigate } from "react-router-dom";
import { HeroSection } from "./components/HeroSection";
import { features, successItems, testimonials } from "./data";
import { FeaturesSection } from "./components/FeaturesSection";
import { SuccessStoriesSection } from "./components/SuccessStoriesSection";
import { CTASection } from "./components/CTASection";
import LandingPageSkeleton from "@/components/skeleton/landing/LandingPageSkeleton";
import { useEffect, useState } from "react";
import { useTranslate } from "@/hooks/useTranslate";

interface SectionProps {
  className?: string;
}

export default function LandingPage({ className }: SectionProps) {
  const { tLandingpage } = useTranslate();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleGetStarted = () => {
    navigate("/auth/register");
  };

  const handleLearnMore = () => {
    navigate("/about-us");
  };

  const handleReadStories = () => {
    navigate("/testimonials");
  };
  if (loading) return <LandingPageSkeleton />;
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
