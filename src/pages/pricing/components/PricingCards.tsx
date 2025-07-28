import { ChevronRight, Crown, Star, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import useApi from "@/hooks/useApi";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Membership } from "@/types/models/membership";
import { useEffect, useState } from "react";
import { useTranslate } from "@/hooks/useTranslate";

interface PricingCardsProps {
  plans: Membership[];
}

export function PricingCards({ plans }: PricingCardsProps) {
  const { tPricing } = useTranslate();
  const apiWithInterceptor = useApi();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [basePlan, setBasePlan] = useState<Membership>();

  // Filter plans based on authentication status
  const filteredPlans = plans.filter((plan) => {
    // If user is logged in, hide free plans (price = 0)
    if (auth?.accessToken && auth?.currentAcc) {
      return plan.price > 0;
    }
    // If user is not logged in, show all plans
    return true;
  });

  useEffect(() => {
    if (filteredPlans.length > 0) {
      const sortedPlans = [...filteredPlans].sort((a, b) => a.price - b.price);
      for (let i = 0; i < sortedPlans.length; i++) {
        if (sortedPlans[i].price > 0) {
          setBasePlan(sortedPlans[i]);
          break;
        }
      }
    }
  }, [filteredPlans]);

  const handleSelectPlan = async (
    membershipName: string,
    planPrice: number
  ) => {
    // If user is not logged in, redirect to login
    if (!auth?.accessToken || !auth?.currentAcc) {
      navigate("/auth/login");
      toast.info("Vui lòng đăng nhập để chọn gói thành viên.");
      return;
    }

    // If it's a free plan, handle differently
    if (planPrice === 0) {
      toast.info("Bạn đã có quyền truy cập gói miễn phí!");
      return;
    }

    try {
      const response = await apiWithInterceptor.post(
        "/v1/payment/stripe/checkout",
        {
          membershipName,
        }
      );
      const { sessionUrl } = response.data.result;
      window.location.href = `${sessionUrl}`;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Có lỗi xảy ra khi tạo phiên thanh toán. Vui lòng thử lại.");
    }
  };

  const formatDurationDisplay = (duration: number) => {
    if (duration <= 0) return tPricing("pricing.card.duration.unlimited");

    if (duration / 365 >= 1) {
      const count = Math.floor(duration / 365);
      return tPricing(
        `pricing.card.duration.${count > 1 ? "year_plural" : "year"}`,
        { count }
      );
    } else if (duration / 30 >= 1) {
      const count = Math.floor(duration / 30);
      return tPricing(
        `pricing.card.duration.${count > 1 ? "month_plural" : "month"}`,
        { count }
      );
    } else if (duration / 7 >= 1) {
      const count = Math.floor(duration / 7);
      return tPricing(
        `pricing.card.duration.${count > 1 ? "week_plural" : "week"}`,
        { count }
      );
    }
    return tPricing(
      `pricing.card.duration.${duration > 1 ? "day_plural" : "day"}`,
      {
        count: duration,
      }
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: plans[0]?.currency || "VND",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateSaving = (plan: Membership) => {
    if (!basePlan || plan.price <= 0 || basePlan.price <= 0) return 0;
    const pricePerDayBase = basePlan.price / basePlan.durationDays;
    const pricePerDayPlan = plan.price / plan.durationDays;
    const savedAmount = pricePerDayBase - pricePerDayPlan;
    const savedPercent = (savedAmount / pricePerDayBase) * 100;
    return savedPercent > 0 ? savedPercent : 0;
  };

  const getCardVariant = (plan: Membership) => {
    if (plan.price === 0) return "free";
    if (plan.highlighted) return "premium";
    return "standard";
  };

  const getCardStyles = (variant: string) => {
    switch (variant) {
      case "free":
        return {
          cardClass:
            "border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-slate-50 to-white",
          headerClass:
            "bg-gradient-to-br from-slate-50 to-slate-100 rounded-t-lg",
          buttonClass: "bg-slate-700 hover:bg-slate-800 text-white",
          icon: <Check className="h-5 w-5" />,
        };
      case "premium":
        return {
          cardClass:
            "border-2 border-amber-200 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-orange-50",
          headerClass:
            "bg-gradient-to-br from-amber-100 to-orange-100 rounded-t-lg",
          buttonClass:
            "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-md",
          icon: <Crown className="h-5 w-5" />,
        };
      default:
        return {
          cardClass:
            "border-2 border-sky-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-sky-50 to-white",
          headerClass: "bg-gradient-to-br from-sky-50 to-sky-100 rounded-t-lg",
          buttonClass:
            "bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white",
          icon: <Zap className="h-5 w-5" />,
        };
    }
  };

  return (
    <div
      className={`grid grid-cols-1 ${
        filteredPlans.length === 1
          ? "md:grid-cols-1 max-w-md mx-auto"
          : filteredPlans.length === 2
          ? "md:grid-cols-2 max-w-4xl mx-auto"
          : filteredPlans.length === 3
          ? "md:grid-cols-3 max-w-6xl mx-auto"
          : "md:grid-cols-2 lg:grid-cols-4"
      } gap-6 mb-16`}
    >
      {Array.isArray(filteredPlans) &&
        filteredPlans.map((plan, index) => {
          const variant = getCardVariant(plan);
          const styles = getCardStyles(variant);

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card
                className={`relative ${styles.cardClass} h-full flex flex-col`}
              >
                {plan.highlighted && (
                  <>
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 shadow-md">
                        <Crown className="h-3 w-3 mr-1" />
                        Đề xuất
                      </Badge>
                    </div>
                  </>
                )}

                <CardHeader className={`${styles.headerClass} flex-grow`}>
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      {styles.icon}
                      {plan.name}
                    </CardTitle>
                    {variant === "premium" && (
                      <Star className="h-5 w-5 text-amber-500 fill-current" />
                    )}
                  </div>

                  <CardDescription className="text-gray-600 h-[2.5rem] flex items-start mb-4">
                    <span className="line-clamp-3">{plan.description}</span>
                  </CardDescription>

                  <div className="mt-auto">
                    {plan.price === 0 ? (
                      <div className="text-center py-4">
                        <span className="text-4xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                          {tPricing("pricing.card.free")}
                        </span>
                        <div className="text-sm text-gray-500 mt-2">
                          {formatDurationDisplay(plan.durationDays)}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <span
                          className={`text-4xl font-bold ${
                            variant === "premium"
                              ? "bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent"
                              : "bg-gradient-to-r from-sky-700 to-blue-700 bg-clip-text text-transparent"
                          }`}
                        >
                          {formatPrice(plan.price)}
                        </span>
                        <div className="text-sm text-gray-600 mt-2">
                          cho {formatDurationDisplay(plan.durationDays)}
                        </div>
                      </div>
                    )}

                    <div className="h-[2.5rem] flex items-center justify-center">
                      {plan.price >= 0 && calculateSaving(plan) > 0 && (
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 px-3 py-1">
                          <Star className="h-3 w-3 mr-1" />
                          Tiết kiệm {Math.floor(calculateSaving(plan))}% vs{" "}
                          {basePlan?.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardFooter className="pt-4 pb-6 mt-auto">
                  <div className="w-full space-y-3">
                    <Button
                      className={`w-full ${styles.buttonClass} font-semibold py-3 text-base transition-all duration-300 transform hover:scale-105`}
                      onClick={() => handleSelectPlan(plan.name, plan.price)}
                    >
                      {styles.icon}
                      <span className="mx-2">
                        {!auth?.accessToken || !auth?.currentAcc
                          ? plan.price === 0
                            ? "Bắt đầu miễn phí"
                            : "Đăng nhập để chọn gói"
                          : plan.price === 0
                          ? tPricing("pricing.card.startFree")
                          : `Chọn gói ${plan.name}`}
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
    </div>
  );
}
