import { Clock } from "lucide-react";
import type { HealthImprovementLevel } from "./healthImprovements";
import { motion } from "framer-motion";
import { formatDurationDisplay } from "@/utils/dateTimeUtil";

interface HealthImproveAchievementProps {
  achievement: HealthImprovementLevel;
  seconds: number;
}
const HealthImproveAchievement = ({
  achievement,
  seconds,
}: HealthImproveAchievementProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <div className="bg-green-100 p-2 rounded-full">
          <Clock className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-medium text-green-800">{achievement.title}</h3>
          <p className="text-sm text-green-700 mt-1">
            {achievement.description}
          </p>
          <p className="text-xs text-green-600 mt-2">
            {formatDurationDisplay(seconds)} không hút thuốc. Hãy tiếp tục cố
            gắng!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HealthImproveAchievement;
