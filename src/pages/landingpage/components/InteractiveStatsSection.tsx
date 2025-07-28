import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Trophy, DollarSign, Heart } from "lucide-react";

export function InteractiveStatsSection() {
  const [counters, setCounters] = useState({
    users: 0,
    successRate: 0,
    moneySaved: 0,
    daysSmokeFree: 0,
  });

  const finalValues = {
    users: 15420,
    successRate: 78,
    moneySaved: 2340000,
    daysSmokeFree: 892460,
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      setCounters((prev) => ({
        users: Math.min(
          prev.users + Math.ceil(finalValues.users / steps),
          finalValues.users
        ),
        successRate: Math.min(
          prev.successRate + Math.ceil(finalValues.successRate / steps),
          finalValues.successRate
        ),
        moneySaved: Math.min(
          prev.moneySaved + Math.ceil(finalValues.moneySaved / steps),
          finalValues.moneySaved
        ),
        daysSmokeFree: Math.min(
          prev.daysSmokeFree + Math.ceil(finalValues.daysSmokeFree / steps),
          finalValues.daysSmokeFree
        ),
      }));
    }, stepDuration);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setCounters(finalValues);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Real Impact, Real Results</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of people who have successfully quit smoking with our
            platform
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <div className="text-3xl font-bold mb-2">
                {formatNumber(counters.users)}+
              </div>
              <div className="text-sm opacity-80">Active Users</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
              <div className="text-3xl font-bold mb-2">
                {counters.successRate}%
              </div>
              <div className="text-sm opacity-80">Success Rate</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-green-300" />
              <div className="text-3xl font-bold mb-2">
                ${formatNumber(counters.moneySaved)}
              </div>
              <div className="text-sm opacity-80">Total Money Saved</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-red-300" />
              <div className="text-3xl font-bold mb-2">
                {formatNumber(counters.daysSmokeFree)}
              </div>
              <div className="text-sm opacity-80">Days Smoke-Free</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
