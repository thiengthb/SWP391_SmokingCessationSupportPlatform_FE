import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import type { CTASectionProps } from "../types";
import { useTranslation } from "react-i18next";

export function CTASection({ onGetStarted }: CTASectionProps) {
  const {t} = useTranslation();
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container px-4 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{t("page.landingPage.text1")}</h2>
        <p className="mb-8 text-primary-foreground/80 max-w-2xl mx-auto">
          {t("page.landingPage.text2")}
        </p>
        <Button size="lg" variant="secondary" className="gap-2" onClick={onGetStarted}>
          {t("page.landingPage.buttonStartNow")} <Zap className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
