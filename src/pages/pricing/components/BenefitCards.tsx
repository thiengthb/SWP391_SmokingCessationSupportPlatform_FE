import { Calendar, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslate } from "@/hooks/useTranslate";

export function BenefitCards() {
  const { tPricing } = useTranslate();
  const benefits = [
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "pricing.benefit.1.title",
      description: "pricing.benefit.1.description",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "pricing.benefit.2.title",
      description: "pricing.benefit.2.description",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      title: ".pricing.benefit.3.title",
      description: "pricing.benefit.3.description",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "pricing.benefit.4.title",
      description: "pricing.benefit.4.description",
    },
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">{tPricing("pricing.benefit.title")}</h2>
        <p className="text-muted-foreground">
          {tPricing("pricing.benefit.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{tPricing(benefit.title)}</h3>
              <p className="text-muted-foreground">{tPricing(benefit.description)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
