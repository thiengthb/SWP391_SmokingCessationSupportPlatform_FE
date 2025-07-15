import { Calendar, Clock, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDateTime, formatTime, getNowDate } from "@/utils/datetime.util";
import { Separator } from "@radix-ui/react-separator";

interface DisplayClockProps {
  seconds: number;
  lastResetTime: Date | null;
}

const DisplayClock = ({ seconds, lastResetTime }: DisplayClockProps) => {
  return (
    <div className="bg-muted/50 rounded-xl w-full p-6 flex flex-col items-center border border-border/50 shadow-inner">
      <p className="text-muted-foreground mb-2 flex items-center gap-1">
        <Clock className="h-4 w-4" />
        Thời gian không hút thuốc
      </p>

      <motion.div
        key={Math.floor(seconds / 10)}
        initial={{ opacity: 0.5, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-5xl font-bold font-mono tabular-nums bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent"
      >
        {formatTime(seconds)}
      </motion.div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between w-full text-sm">
        <div className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>{getNowDate()}</span>
        </div>

        <AnimatePresence>
          {lastResetTime && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-muted-foreground flex items-center gap-1"
            >
              <History className="h-3 w-3" />
              <span>Bắt đầu: {formatDateTime(lastResetTime)}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DisplayClock;
