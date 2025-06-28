import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { HeroSectionProps } from "../types";
import { useTranslation } from "react-i18next";

export function HeroSection({ onGetStarted, onLearnMore }: HeroSectionProps) {
  const {t} = useTranslation();
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container px-4 mx-auto relative">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Badge className="mb-4" variant="secondary">
            {t("page.landingPage.title")}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {t("page.landingPage.description")}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            {t("page.landingPage.paragraph")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="gap-2" onClick={onGetStarted}>
              {t("page.landingPage.buttonStart")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={onLearnMore}>
              {t("page.landingPage.buttonLearnMore")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
