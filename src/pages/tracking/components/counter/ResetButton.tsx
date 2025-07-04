import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface ResetButtonProps {
  isResetting: boolean;
  seconds: number;
  buttonRef: React.RefObject<HTMLButtonElement>;
  handleReset: () => void;
}
const ResetButton = ({
  isResetting,
  seconds,
  buttonRef,
  handleReset,
}: ResetButtonProps) => {
  const pulseAnimation = {
    scale: [1, 1.02, 1],
    transition: {
      repeat: Infinity,
      repeatType: "reverse" as const,
      duration: 2,
    },
  };

  return (
    <div className="flex justify-center items-center">
      <motion.div
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isResetting ? 360 : 0,
          ...(seconds > 60 ? pulseAnimation : {}),
        }}
        className="relative"
      >
        <Button
          ref={buttonRef}
          variant="outline"
          size="lg"
          onClick={handleReset}
          className="h-36 w-36 rounded-full border-4 border-primary shadow-lg hover:shadow-primary/20 transition-all duration-300 flex flex-col items-center justify-center gap-2 bg-background"
        >
          <RefreshCw
            className={`h-10 w-10 transition-all duration-300 ${
              isResetting ? "text-primary animate-spin" : ""
            }`}
          />
          <span className="text-lg font-medium">Đặt lại</span>
        </Button>

        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-5 bg-background rounded-full shadow-inner" />
      </motion.div>
    </div>
  );
};

export default ResetButton;
