// import { PricingHeader } from "@/pages/pricing/components/PricingHeader";
import { PricingCards } from "@/pages/pricing/components/PricingCards";
import { FeatureComparison } from "@/pages/pricing/components/FeatureComparison";
import { BenefitCards } from "@/pages/pricing/components/BenefitCards";
import { FAQ } from "@/pages/pricing/components/FAQ";
import { PricingCTA } from "@/pages/pricing/components/PricingCTA";
import { faqs, programFeatures } from "@/data/pricing.data";
import { useEffect, useState } from "react";
import { publicApi } from "@/lib/axios";
import type { Membership } from "@/types/models/membership";
import { useAuth } from "@/contexts/AuthContext";
import { useFTND } from "@/contexts/FTNDContext";

export default function PricingPage() {
  const { auth } = useAuth();
  const { healthData } = useFTND();
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [recommendedPlan, setRecommendedPlan] = useState<string | null>(null);

  // Function to recommend membership based on FTND level
  const getRecommendedMembership = (
    ftndLevel: number,
    memberships: Membership[]
  ): string | null => {
    if (memberships.length === 0) return null;

    // Sort memberships by price to ensure consistent ordering
    const sortedMemberships = [...memberships].sort(
      (a, b) => a.price - b.price
    );

    // FTND scoring: 0-2 (very low), 3-4 (low), 5-6 (moderate), 7-8 (high), 9-10 (very high)
    if (ftndLevel >= 0 && ftndLevel <= 2) {
      // Very low addiction - basic plan might be sufficient
      return (
        sortedMemberships.find((m) => m.price === 0)?.name ||
        sortedMemberships[0]?.name ||
        null
      );
    } else if (ftndLevel >= 3 && ftndLevel <= 4) {
      // Low addiction - recommend first paid plan
      const paidPlans = sortedMemberships.filter((m) => m.price > 0);
      return paidPlans[0]?.name || sortedMemberships[1]?.name || null;
    } else if (ftndLevel >= 5 && ftndLevel <= 6) {
      // Moderate addiction - recommend middle-tier plan
      const paidPlans = sortedMemberships.filter((m) => m.price > 0);
      return paidPlans[1]?.name || paidPlans[0]?.name || null;
    } else if (ftndLevel >= 7 && ftndLevel <= 8) {
      // High addiction - recommend premium plan
      const paidPlans = sortedMemberships.filter((m) => m.price > 0);
      return paidPlans[paidPlans.length - 1]?.name || null;
    } else if (ftndLevel >= 9 && ftndLevel <= 10) {
      // Very high addiction - strongly recommend highest tier
      const premiumPlan = sortedMemberships.filter((m) => m.price > 0).pop();
      return premiumPlan?.name || null;
    }

    return null;
  };

  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        const response = await publicApi.get("/v1/memberships");
        const data: Membership[] = response.data.result;
        setMemberships(data);
        console.log("Fetched membership data:", data);

        // Get user's FTND level from context and recommend plan
        if (auth?.accessToken && healthData?.ftndLevel !== undefined) {
          const recommended = getRecommendedMembership(
            healthData.ftndLevel,
            data
          );
          setRecommendedPlan(recommended);

          // Mark recommended plan as highlighted
          const updatedData = data.map((membership) => ({
            ...membership,
            highlighted: membership.name === recommended,
          }));
          setMemberships(updatedData);
        }
      } catch (error) {
        console.error("Failed to fetch membership data:", error);
      }
    };
    fetchMembershipData();
  }, [auth, healthData]);

  return (
    <div id="top" className="py-10 px-4 md:px-6 w-full max-w-7xl mx-auto">
      {/* Recommendation Banner */}
      {recommendedPlan &&
        auth?.accessToken &&
        healthData?.ftndLevel !== undefined && (
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                🎯 Gói được đề xuất cho bạn
              </h3>
              <p className="text-blue-700">
                Dựa trên mức độ phụ thuộc nicotine của bạn (FTND:{" "}
                {healthData.ftndLevel}), chúng tôi đề xuất gói{" "}
                <strong>{recommendedPlan}</strong> để đạt hiệu quả tốt nhất
                trong hành trình cai thuốc.
              </p>
            </div>
          </div>
        )}

      <PricingCards plans={memberships} />

      <FeatureComparison features={programFeatures} />

      <BenefitCards />

      <FAQ faqs={faqs} />

      <PricingCTA />
    </div>
  );
}
