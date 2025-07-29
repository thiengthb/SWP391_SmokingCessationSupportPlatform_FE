import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Target, TrendingUp, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PlanDemoSectionProps {
  onGetStarted: () => void;
}

export function PlanDemoSection({ onGetStarted }: PlanDemoSectionProps) {
  const [demoData, setDemoData] = useState({
    cigarettesPerDay: 20,
    quitDate: "",
    motivation: "",
  });
  const [showResult, setShowResult] = useState(false);

  const handleCreatePlan = () => {
    if (demoData.cigarettesPerDay && demoData.quitDate) {
      setShowResult(true);
    }
  };

  const calculateSavings = () => {
    const pricePerPack = 5; // $5 per pack
    const cigarettesPerPack = 20;
    const packsPerDay = demoData.cigarettesPerDay / cigarettesPerPack;
    const dailySavings = packsPerDay * pricePerPack;
    const monthlySavings = dailySavings * 30;
    const yearlySavings = dailySavings * 365;

    return {
      daily: dailySavings,
      monthly: monthlySavings,
      yearly: yearlySavings,
    };
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Demo Form */}
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Create Your Quit Plan</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try our interactive plan creator and see your potential savings and
            health benefits.
          </p>
        </div>

        <Card className="border-2 border-dashed border-blue-300 bg-white/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Demo: Create Your Quit Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cigarettes">Cigarettes per day</Label>
              <Input
                id="cigarettes"
                type="number"
                value={demoData.cigarettesPerDay}
                onChange={(e) =>
                  setDemoData((prev) => ({
                    ...prev,
                    cigarettesPerDay: Number(e.target.value),
                  }))
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="quit-date">Target quit date</Label>
              <Input
                id="quit-date"
                type="date"
                value={demoData.quitDate}
                onChange={(e) =>
                  setDemoData((prev) => ({
                    ...prev,
                    quitDate: e.target.value,
                  }))
                }
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="motivation">Your motivation (optional)</Label>
              <Input
                id="motivation"
                placeholder="e.g., For my health and family"
                value={demoData.motivation}
                onChange={(e) =>
                  setDemoData((prev) => ({
                    ...prev,
                    motivation: e.target.value,
                  }))
                }
                className="mt-1"
              />
            </div>

            <Button
              onClick={handleCreatePlan}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!demoData.cigarettesPerDay || !demoData.quitDate}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Create My Plan (Demo)
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Results Preview */}
      <div className="space-y-6">
        {showResult ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-6 w-6" />
              <h4 className="text-xl font-semibold">
                Your Personalized Plan Created!
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-700">
                    ${calculateSavings().monthly.toFixed(0)}
                  </div>
                  <div className="text-sm text-green-600">Monthly savings</div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-700">
                    ${calculateSavings().yearly.toFixed(0)}
                  </div>
                  <div className="text-sm text-blue-600">Yearly savings</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <h5 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Health Benefits Timeline
                </h5>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    20 minutes: Heart rate normalizes
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    24 hours: Carbon monoxide levels drop
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    1 week: Taste and smell improve
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    1 month: Lung function increases
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={onGetStarted}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
              size="lg"
            >
              Start My Real Journey Now!
            </Button>
          </div>
        ) : (
          <div className="text-center p-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed">
            <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              Fill out the form to see your personalized results
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
