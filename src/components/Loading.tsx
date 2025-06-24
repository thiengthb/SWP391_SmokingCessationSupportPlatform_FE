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
  size = 24,
  className,
  text = "Loading...",
  fullscreen = false,
}: LoadingProps) {
  const containerClass = cn(
    "w-full h-full flex flex-col items-center justify-center gap-2",
    fullscreen && "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
    className
  );

  return (
    <div className={containerClass}>
      <Loader2 className="animate-spin text-primary" size={size} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}

export default Loading;
