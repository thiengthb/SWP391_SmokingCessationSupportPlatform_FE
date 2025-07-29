import { ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HashLink } from "react-router-hash-link";
import { useTranslate } from "@/hooks/useTranslate";

export function PricingCTA() {
  const { tPricing } = useTranslate();
  return (
    <div className="bg-muted rounded-xl p-8 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          {tPricing("pricing.cta.heading")}
        </h2>
        <p className="text-lg mb-6">
         {tPricing("pricing.cta.description")}
        </p>
        <Button size="lg">
          <HashLink smooth to="#top">
             {tPricing("pricing.cta.button")}
          </HashLink>
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
        <div className="mt-6 flex items-center justify-center gap-1 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <span>{tPricing("pricing.cta.support.note")}</span>
        </div>
      </div>
    </div>
  );
}
