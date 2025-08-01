import { Card } from "@/components/ui/card";
import type { Feature } from "../data";
import { useTranslate } from "@/hooks/useTranslate";

interface FeaturesSectionProps {
  features: Feature[];
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  const { tLandingpage } = useTranslate();

  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            {tLandingpage("landingPage.paragraph1")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {tLandingpage("landingPage.paragraph2")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Card
              key={i}
              className="p-6 border-2 hover:border-primary transition-colors"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{tLandingpage(feature.title)}</h3>
              <p className="text-muted-foreground">{tLandingpage(feature.description)}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
