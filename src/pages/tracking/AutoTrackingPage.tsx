import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { differenceInSeconds } from "date-fns";
import { toast } from "sonner";
import { getHealthImprovementLevel } from "../../data/healthImprove.data";
import HealthImproveAchievement from "./components/counter/HealthImproveAchievement";
import ResetButton from "./components/counter/ResetButton";
import DisplayClock from "./components/counter/DisplayClock";
import { useCounterSwr } from "@/hooks/swr/useCounterSwr";
import counterService from "@/services/api/counter.service";

export default function AutoTrackingPage() {
  const [seconds, setSeconds] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [counterStartTime, setCounterStartTime] = useState<Date | null>(null);
  const [lastResetTime, setLastResetTime] = useState<Date | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonAnimating, setButtonAnimating] = useState(false);

  const { counter, isLoading } = useCounterSwr();

  useEffect(() => {
    if (counter && counter.lastCounterReset) {
      const resetDate = new Date(counter.lastCounterReset);
      setLastResetTime(resetDate);
      setCounterStartTime(resetDate);

      const now = new Date();
      const elapsedSeconds = Math.floor(differenceInSeconds(now, resetDate));
      setSeconds(elapsedSeconds);
    }
  }, []);

  useEffect(() => {
    if (!counterStartTime) return;

    const timer = setInterval(() => {
      const now = new Date();
      const elapsedSeconds = Math.floor(
        differenceInSeconds(now, counterStartTime)
      );
      setSeconds(elapsedSeconds);
    }, 1000);

    return () => clearInterval(timer);
  }, [counterStartTime]);

  const handleReset = async () => {
    if (buttonAnimating) return;

    try {
      setButtonAnimating(true);
      setIsResetting(true);
      await counterService.start();

      const now = new Date();
      setCounterStartTime(now);
      setLastResetTime(now);
      setSeconds(0);

      toast.success("Bộ đếm đã được đặt lại", {
        description: "Thời gian đã được đặt về 00:00:00",
        position: "top-center",
      });
    } catch (error) {
      console.error("Failed to reset counter:", error);
      toast.error("Không thể đặt lại bộ đếm", {
        description: "Đã xảy ra lỗi khi kết nối với máy chủ.",
      });
    } finally {
      setTimeout(() => {
        setIsResetting(false);
      }, 500);

      setTimeout(() => {
        setButtonAnimating(false);
      }, 1000);
    }

    if (buttonRef.current) {
      buttonRef.current.classList.add("ring-4", "ring-primary/30");
      setTimeout(() => {
        buttonRef.current?.classList.remove("ring-4", "ring-primary/30");
      }, 300);
    }
  };

  const achievement = getHealthImprovementLevel(seconds);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted/50 p-4">
      <Card className="w-full max-w-md p-8 flex flex-col items-center justify-center space-y-10 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
          <div
            className="absolute top-10 left-10 w-20 h-20 rounded-full border-4 border-dashed border-primary animate-spin-slow"
            style={{ animationDuration: "30s" }}
          ></div>
          <div
            className="absolute bottom-10 right-10 w-24 h-24 rounded-full border-4 border-dashed border-primary animate-spin-slow"
            style={{ animationDuration: "20s" }}
          ></div>
        </div>

        <div className="w-full text-center space-y-1">
          <h1 className="text-2xl font-bold">Thời Gian Không Hút Thuốc</h1>
          <p className="text-sm text-muted-foreground">
            Theo dõi thời gian bạn đã kiên trì không hút thuốc
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <>
            <ResetButton
              isResetting={isResetting}
              seconds={seconds}
              buttonRef={buttonRef}
              handleReset={handleReset}
            />

            <DisplayClock seconds={seconds} lastResetTime={lastResetTime} />

            {achievement && (
              <HealthImproveAchievement
                achievement={achievement}
                seconds={seconds}
              />
            )}
          </>
        )}
      </Card>
    </div>
  );
}
