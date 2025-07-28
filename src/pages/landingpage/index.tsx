import { useNavigate } from "react-router-dom";
import { HeroSection } from "./components/HeroSection";
import { features } from "./data";
import { FeaturesSection } from "./components/FeaturesSection";
import { CTASection } from "./components/CTASection";
import { PlanDemoSection } from "./components/PlanDemoSection";
import { RecordDemoSection } from "./components/RecordDemoSection";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { PricingPreviewSection } from "./components/PricingPreviewSection";

interface SectionProps {
  className?: string;
}

export default function LandingPage({ className }: SectionProps) {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth/register");
  };

  const handleLearnMore = () => {
    navigate("/about");
  };

  const handleViewPricing = () => {
    navigate("/pricing");
  };

  const handleTryDemo = () => {
    document.getElementById("demo-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className={`flex flex-col min-h-screen ${className}`}>
      {/* Hero Section */}
      <HeroSection
        onGetStarted={handleGetStarted}
        onLearnMore={handleLearnMore}
        onTryDemo={handleTryDemo}
      />

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <FeaturesSection features={features} />
      </motion.section>

      {/* Interactive Demo Sections */}
      <motion.section
        id="demo-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
            >
              Trải nghiệm nền tảng của chúng tôi
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Xem việc tạo kế hoạch cai thuốc và theo dõi tiến trình của bạn dễ
              dàng như thế nào
            </motion.p>
          </div>

          <PlanDemoSection onGetStarted={handleGetStarted} />
        </div>
      </motion.section>

      {/* Record Demo Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <RecordDemoSection onGetStarted={handleGetStarted} />
      </motion.section>

      {/* Pricing Preview Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <PricingPreviewSection onViewPricing={handleViewPricing} />
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <CTASection onGetStarted={handleGetStarted} />
      </motion.section>
    </main>
  );
}
