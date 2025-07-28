import { useNavigate } from "react-router-dom";
import { HeroSection } from "./components/HeroSection";
import { features } from "./data";
import { FeaturesSection } from "./components/FeaturesSection";
import { CTASection } from "./components/CTASection";
import { PlanDemoSection } from "./components/PlanDemoSection";
import { RecordDemoSection } from "./components/RecordDemoSection";
import { useTranslation } from "react-i18next";

interface SectionProps {
  className?: string;
}

export default function LandingPage({ className }: SectionProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth/register");
  };

  const handleLearnMore = () => {
    navigate("/about");
  };

  // const handleReadStories = () => {
  //   navigate("/testimonials");
  // };

  const handleTryDemo = () => {
    // Scroll to demo section or show demo modal
    document.getElementById("demo-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className={`flex flex-col min-h-screen ${className}`}>
      <HeroSection
        onGetStarted={handleGetStarted}
        onLearnMore={handleLearnMore}
        onTryDemo={handleTryDemo}
      />

      <FeaturesSection features={features} />

      {/* Interactive Demo Sections */}
      <section
        id="demo-section"
        className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("Experience Our Platform")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t(
                "See how easy it is to create your quit plan and track your progress"
              )}
            </p>
          </div>

          <PlanDemoSection onGetStarted={handleGetStarted} />
        </div>
      </section>

      <RecordDemoSection onGetStarted={handleGetStarted} />

      {/* <InteractiveStatsSection />

      <SuccessStoriesSection
        items={successItems.map((key) => t(key))}
        testimonials={testimonials}
        onReadMore={handleReadStories}
      /> */}

      <CTASection onGetStarted={handleGetStarted} />
    </main>
  );
}
