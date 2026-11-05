import React from "react";
import { Loader2, BookOpen } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({
  message = "Loading from library...",
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  const spinnerSizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const containerSizes = {
    sm: "py-6",
    md: "py-16 sm:py-24",
    lg: "py-24 sm:py-36",
  };

  return (
    <div
      className={`w-full flex flex-col items-center justify-center text-center px-4 ${containerSizes[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Glow Ring */}
        <div className="absolute -inset-3 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 blur-md animate-pulse" />

        {/* Rotating Circular Spinner */}
        <Loader2
          className={`${spinnerSizes[size]} text-emerald-700 dark:text-emerald-400 animate-spin`}
          strokeWidth={2.5}
        />

        {/* Center Book Accent for medium and large sizes */}
        {size !== "sm" && (
          <div className="absolute">
            <BookOpen className="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-300 opacity-60" />
          </div>
        )}
      </div>

      {message && (
        <p className="mt-4 font-serif text-sm sm:text-base font-medium text-foreground tracking-tight">
          {message}
        </p>
      )}

      <p className="text-xs text-muted-foreground mt-1 font-mono">
        Please wait a moment...
      </p>
    </div>
  );
}
