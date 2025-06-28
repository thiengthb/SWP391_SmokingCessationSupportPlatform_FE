import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import type { SuccessStoriesSectionProps } from "../types";
import { useTranslation } from "react-i18next";

export function SuccessStoriesSection({ items, onReadMore }: SuccessStoriesSectionProps) {
  const { t } = useTranslation();
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">{t("page.landingPage.paragraph3")}</h2>
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
              <div className="mt-8">
                <Button className="gap-2" onClick={onReadMore}>
                  {t("page.landingPage.buttonRead")} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
