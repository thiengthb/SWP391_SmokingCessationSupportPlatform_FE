import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { stats, features } from "../../data/about-us.info";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleGetStarted = () => {
    navigate("/auth/register");
  };
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container px-4 mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            {t("aboutus.badge")}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t("aboutus.title")}{" "}
            <span className="text-primary">{t("aboutus.highlight")}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("aboutus.description")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {t("aboutus.mission.title")}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t("aboutus.mission.description")}
              </p>
              <Button className="gap-2" onClick={handleGetStarted}>
                {t("aboutus.mission.cta")} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <Card key={i} className="p-6">
                  <feature.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{t(feature.title)}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t(feature.description)}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 sm:px-10 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">
            {t("aboutus.journey.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                key: "step1",
              },
              {
                step: "02",
                key: "step2",
              },
              {
                step: "03",
                key: "step3",
              },
            ].map((item) => (
              <div key={item.step} className="text-left">
                <div className="text-primary font-bold mb-2">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">
                  {t(`aboutus.journey.${item.key}.title`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`aboutus.journey.${item.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
