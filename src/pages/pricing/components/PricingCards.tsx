import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useApi from "@/hooks/useApi";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { Membership } from "@/types/models/Membership";
import { useEffect, useState } from "react";

interface PricingCardsProps {
  plans: Membership[];
}

export function PricingCards({ plans }: PricingCardsProps) {
  const apiWithInterceptor = useApi();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [basePlan, setBasePlan] = useState<Membership>();

  useEffect(() => {
    if (plans.length > 0) {
      const sortedPlans = [...plans].sort((a, b) => a.price - b.price);
      for (let i = 0; i < sortedPlans.length; i++) {
        if (sortedPlans[i].price > 0) {
          setBasePlan(sortedPlans[i]);
          break;
        }
      }
    }
  }, [plans]);

  const handleSelectPlan = async (membershipName: string) => {
    if (!auth.accessToken || !auth.currentAcc) {
      navigate("/auth/login");
      toast.error("Bạn cần đăng nhập để chọn gói thành viên.");
      return;
    }
    const response = await apiWithInterceptor.post(
      "/v1/stripe-payment/checkout",
      {
        membershipName,
      }
    );
    const { sessionUrl } = response.data.result;
    window.location.href = `${sessionUrl}`;
  };

  const formatDurationDisplay = (duration: number) => {
    if (duration <= 0) return "Không giới hạn";

    if (duration / 365 >= 1) {
      return `${Math.floor(duration / 365)} năm`;
    } else if (duration / 30 >= 1) {
      return `${Math.floor(duration / 30)} tháng`;
    } else if (duration / 7 >= 1) {
      return `${Math.floor(duration / 7)} tuần`;
    }
    return `${duration} ngày`;
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
      {Array.isArray(plans) &&
        plans.map((plan) => {
          return (
            <Card
              key={plan.id}
              className={`relative ${
                plan.highlighted
                  ? "border-primary/50 shadow-md"
                  : "border-border/60"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 transform translate-y-[-10px] translate-x-[10px]">
                  <Badge className="bg-primary text-primary-foreground">
                    Phổ biến nhất
                  </Badge>
                </div>
              )}

              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>

                <div className="mt-4">
                  <>
                    {plan.price === 0 ? (
                      <div className="flex flex-col items-start">
                        <span className="text-3xl font-bold">Miễn phí</span>
                        <span className="text-muted-foreground ml-1">
                          {formatDurationDisplay(plan.durationDays)}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">
                          {formatPrice(plan.price)}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          /{formatDurationDisplay(plan.durationDays)}
                        </span>
                      </div>
                    )}
                  </>

                  {plan.price >= 0 && calculateSaving(plan) > 0 && (
                    <Badge
                      variant="outline"
                      className="mt-2 bg-green-50 text-green-700 border-green-200"
                    >
                      {Math.floor(calculateSaving(plan))}% tiết kiệm so với{" "}
                      <span className="font-semibold">{basePlan?.name}</span>
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={
                    plan.price === 0
                      ? "outline"
                      : plan.highlighted
                      ? "default"
                      : "secondary"
                  }
                  onClick={() => handleSelectPlan(plan.name)}
                >
                  {plan.price === 0
                    ? "Bắt đầu miễn phí"
                    : `Chọn gói ${plan.name.toLowerCase()}`}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
    </div>
  );
}
