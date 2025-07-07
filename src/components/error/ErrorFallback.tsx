import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorFallbackProps {
  /** Error object or error message */
  error?: Error | string;
  /** Optional retry function */
  onRetry?: () => void;
  /** Optional navigate to home function */
  onGoHome?: () => void;
  /** Optional custom className */
  className?: string;
  /** Optional custom title */
  title?: string;
  /** Optional custom message */
  message?: string;
  /** Show detailed error info (default: false) */
  showDetails?: boolean;
  /** Fullscreen overlay (default: true) */
  fullscreen?: boolean;
}

export function ErrorFallback({
  error,
  onRetry,
  onGoHome,
  className,
  title = "Something went wrong",
  message = "We're sorry, but something unexpected happened. Please try again.",
  showDetails = false,
  fullscreen = true,
}: ErrorFallbackProps) {
  const containerClass = cn(
    "flex flex-col items-center justify-center gap-6 p-8",
    fullscreen
      ? "fixed inset-0 bg-background/95 backdrop-blur-sm z-50"
      : "w-full h-full min-h-[400px]",
    className
  );

  const errorMessage = typeof error === "string" ? error : error?.message;

  return (
    <div className={containerClass}>
      <div className="relative">
        <div className="absolute -inset-2 rounded-full bg-destructive/10 blur-md animate-pulse"></div>
        <div className="relative bg-destructive/5 p-4 rounded-full">
          <AlertTriangle
            className="text-destructive"
            size={48}
            strokeWidth={2}
          />
        </div>
      </div>

      <div className="text-center space-y-3 max-w-md">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <p className="text-muted-foreground leading-relaxed">{message}</p>

        {showDetails && errorMessage && (
          <details className="mt-4 p-3 bg-muted/50 rounded-lg text-left">
            <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
              Error Details
            </summary>
            <pre className="mt-2 text-xs text-destructive font-mono whitespace-pre-wrap break-all">
              {errorMessage}
            </pre>
          </details>
        )}
      </div>

      <div className="flex gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        )}

        {onGoHome && (
          <button
            onClick={onGoHome}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
          >
            <Home size={16} />
            Go Home
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorFallback;
