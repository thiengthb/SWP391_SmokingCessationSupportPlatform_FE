import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { type Subscription } from "@/types/models/subscritption";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { Link } from "react-router-dom";
import { useTranslate } from "@/hooks/useTranslate";

export default function CurrentMembership() {
  const apiWithInterceptor = useApi();
  const { tProfile } = useTranslate();
  const [currentSubscription, setCurrentSubscription] =
    useState<Subscription | null>(null);

  useEffect(() => {
    const fetchCurrentSubscription = async () => {
      try {
        const response = await apiWithInterceptor.get(
          "/v1/subscriptions/my-current"
        );
        setCurrentSubscription(response.data.result);
      } catch (error) {
        console.error("Failed to fetch current subscription:", error);
      }
    };
    fetchCurrentSubscription();
  }, []);

  const calculateProgress = () => {
    if (!currentSubscription) {
      return { progressPercentage: 0, daysRemaining: 0 };
    }

    const endDate = new Date(currentSubscription.endDate);
    const currentDate = new Date();
    const timeDiff = endDate.getTime() - currentDate.getTime();
    const daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));

    return {
      progressPercentage: (daysRemaining / timeDiff) * 100,
      daysRemaining: daysRemaining,
    };
  };

  const { progressPercentage, daysRemaining } = calculateProgress();

  if (!currentSubscription) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {" "}
                {tProfile("profile.membership.empty.title")}
              </h3>
              <p className="text-muted-foreground">
                {tProfile("profile.membership.empty.description")}
              </p>
            </div>
            <Link to="/pricing" className="inline-block">
              <Button className="mt-4">
                {tProfile("profile.membership.empty.button")}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          {tProfile("profile.membership.title")}
        </CardTitle>
        <CardDescription>
          {tProfile("profile.membership.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {tProfile("profile.membership.fields.plan")}
            </p>
            <p className="font-semibold text-lg">
              {currentSubscription.membershipName}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {tProfile("profile.membership.fields.start")}
            </p>
            <p className="font-medium">
              {new Date(currentSubscription.startDate).toLocaleDateString()}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {tProfile("profile.membership.fields.end")}
            </p>
            <p className="font-medium">
              {new Date(currentSubscription.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Ngày còn lại {daysRemaining} </span>
              <span className="text-muted-foreground">
                {Math.round(progressPercentage)}
                {tProfile("profile.membership.fields.progress")}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardContent>
      <CardFooter />
    </Card>
  );
}
