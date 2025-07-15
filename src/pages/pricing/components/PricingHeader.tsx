import { Badge } from "@/components/ui/badge";
import { useTranslate } from "@/hooks/useTranslate";

export function PricingHeader() {
  const { tPricing } = useTranslate();
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <Badge className="mb-4">{tPricing("pricing.header.badge")}</Badge>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        {tPricing("pricing.header.title")}
      </h1>
      <p className="text-xl text-muted-foreground">
        {tPricing("pricing.header.description")}
      </p>
    </div>
  );
}
