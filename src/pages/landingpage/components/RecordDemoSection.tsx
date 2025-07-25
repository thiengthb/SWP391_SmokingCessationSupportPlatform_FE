import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Smile, TrendingUp, Award, Plus } from "lucide-react";

interface RecordDemoSectionProps {
  onGetStarted: () => void;
}

export function RecordDemoSection({ onGetStarted }: RecordDemoSectionProps) {
  const [daysQuit, setDaysQuit] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const handleAddDay = () => {
    setDaysQuit((prev) => prev + 1);
    setShowProgress(true);
  };

  const getMilestone = () => {
    if (daysQuit >= 30)
      return {
        text: "1 Month Milestone!",
        color: "bg-purple-500",
        icon: Award,
      };
    if (daysQuit >= 7)
      return { text: "1 Week Strong!", color: "bg-blue-500", icon: TrendingUp };
    if (daysQuit >= 3)
      return { text: "3 Days Clean!", color: "bg-green-500", icon: Heart };
    if (daysQuit >= 1)
      return { text: "First Day Done!", color: "bg-yellow-500", icon: Smile };
    return null;
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Track Your Progress Daily</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See how our daily tracking keeps you motivated with real-time
            progress and achievements.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Demo Tracker */}
            <div className="space-y-6">
              <Card className="border-2 border-dashed border-green-300 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Demo: Daily Progress Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-green-600 mb-2">
                      {daysQuit}
                    </div>
                    <p className="text-gray-600">Days Smoke-Free</p>
                  </div>

                  <Button
                    onClick={handleAddDay}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Mark Another Day Smoke-Free
                  </Button>

                  {showProgress && (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">
                            Progress to 30 days
                          </span>
                          <span className="text-sm text-gray-500">
                            {Math.min(daysQuit, 30)}/30
                          </span>
                        </div>
                        <Progress
                          value={(daysQuit / 30) * 100}
                          className="h-3"
                        />
                      </div>

                      {getMilestone() && (
                        <Card
                          className={`${
                            getMilestone()?.color
                          } text-white border-none`}
                        >
                          <CardContent className="p-4 flex items-center gap-3">
                            {getMilestone()?.icon && (
                              <div>
                                {(() => {
                                  const IconComponent = getMilestone()!.icon;
                                  return <IconComponent className="h-6 w-6" />;
                                })()}
                              </div>
                            )}
                            <div>
                              <div className="font-semibold">
                                {getMilestone()?.text}
                              </div>
                              <div className="text-sm opacity-90">
                                Keep up the amazing work!
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Benefits Display */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Real-time Health Benefits</h3>

              <div className="space-y-4">
                <Card
                  className={`transition-all duration-300 ${
                    daysQuit >= 1
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50"
                  }`}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Heart Rate Normalized</div>
                      <div className="text-sm text-gray-600">
                        After 20 minutes
                      </div>
                    </div>
                    <Badge variant={daysQuit >= 1 ? "default" : "secondary"}>
                      {daysQuit >= 1 ? "✓ Achieved" : "Pending"}
                    </Badge>
                  </CardContent>
                </Card>

                <Card
                  className={`transition-all duration-300 ${
                    daysQuit >= 3
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50"
                  }`}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Improved Circulation</div>
                      <div className="text-sm text-gray-600">
                        After 2-3 days
                      </div>
                    </div>
                    <Badge variant={daysQuit >= 3 ? "default" : "secondary"}>
                      {daysQuit >= 3 ? "✓ Achieved" : "In Progress"}
                    </Badge>
                  </CardContent>
                </Card>

                <Card
                  className={`transition-all duration-300 ${
                    daysQuit >= 7
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50"
                  }`}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">
                        Enhanced Taste & Smell
                      </div>
                      <div className="text-sm text-gray-600">After 1 week</div>
                    </div>
                    <Badge variant={daysQuit >= 7 ? "default" : "secondary"}>
                      {daysQuit >= 7 ? "✓ Achieved" : "Upcoming"}
                    </Badge>
                  </CardContent>
                </Card>

                <Card
                  className={`transition-all duration-300 ${
                    daysQuit >= 30
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50"
                  }`}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Lung Function Boost</div>
                      <div className="text-sm text-gray-600">After 1 month</div>
                    </div>
                    <Badge variant={daysQuit >= 30 ? "default" : "secondary"}>
                      {daysQuit >= 30 ? "✓ Achieved" : "Goal"}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              {showProgress && (
                <Button
                  onClick={onGetStarted}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                >
                  Start Tracking My Real Journey
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
