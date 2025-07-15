import { PricingHeader } from "@/pages/pricing/components/PricingHeader";
import { PricingCards } from "@/pages/pricing/components/PricingCards";
import { FeatureComparison } from "@/pages/pricing/components/FeatureComparison";
import { BenefitCards } from "@/pages/pricing/components/BenefitCards";
import { Testimonials } from "@/pages/pricing/components/Testimonials";
import { FAQ } from "@/pages/pricing/components/FAQ";
import { PricingCTA } from "@/pages/pricing/components/PricingCTA";
import { faqs, testimonials, programFeatures } from "@/data/pricing.data";
import { useEffect, useState } from "react";
import { publicApi } from "@/lib/axios";
import type { Membership } from "@/types/models/membership";
import { useTranslate } from "@/hooks/useTranslate";

export default function PricingPage() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  useEffect(() => {
    const fetcMembershipData = async () => {
      try {
        const response = await publicApi.get("/v1/memberships");
        const data: Membership[] = response.data.result;
        setMemberships(data);
        console.log("Fetched membership data:", data);
      } catch (error) {
        console.error("Failed to fetch membership data:", error);
      }
    };
    fetcMembershipData();
  }, []);

  return (
    <div id="top" className="py-10 px-4 md:px-6 w-full max-w-7xl mx-auto">
      <PricingHeader />

      <PricingCards plans={memberships} />

      <FeatureComparison features={programFeatures} />

      <BenefitCards />

      <Testimonials testimonials={testimonials} />

      <FAQ faqs={faqs} />

      <PricingCTA />
    </div>
  );
}
