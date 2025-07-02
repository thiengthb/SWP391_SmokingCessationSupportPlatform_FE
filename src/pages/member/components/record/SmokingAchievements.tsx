import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SmokingAchievementsProps {
  quitDate: Date | null;
  cigarettesAvoided: number;
  savings: number;
  statsData: { name: string; value: number }[];
}

export function SmokingAchievements({
  quitDate,
  cigarettesAvoided,
  savings,
  statsData,
}: SmokingAchievementsProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Your Achievements</CardTitle>
        <CardDescription>
          See the positive impact of your decision
        </CardDescription>
      </CardHeader>
      <CardContent>
        {quitDate ? (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-500">Cigarettes Avoided</p>
                <p className="text-2xl font-bold">{cigarettesAvoided}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-500">Money Saved</p>
                <p className="text-2xl font-bold">${savings.toFixed(2)}</p>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4C51BF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <p>Set a quit date to see your stats</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default SmokingAchievements;
