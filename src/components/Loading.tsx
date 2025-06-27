import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  /** Optional size in pixels (default: 24) */
  size?: number;
  /** Optional custom className */
  className?: string;
  /** Optional text to display */
  text?: string;
  /** Optional fullscreen overlay */
  fullscreen?: boolean;
}

export function Loading({
  size = 36,
  className,
  text = "Loading...",
  fullscreen = true,
}: LoadingProps) {
  const containerClass = cn(
    "flex flex-col items-center justify-center gap-4",
    fullscreen
      ? "fixed inset-0 bg-background/50 backdrop-blur-sm z-50"
      : "w-full h-full",
    className
  );

  return (
    <div className={containerClass}>
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-primary/20 blur-sm animate-pulse"></div>
        <Loader2
          className="relative animate-spin text-primary"
          size={size}
          strokeWidth={2.5}
        />
      </div>
      {text && (
        <p className="text-base font-medium text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

export default Loading;
