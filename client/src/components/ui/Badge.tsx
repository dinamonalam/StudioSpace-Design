import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "outline" | "success" | "warning" | "danger";
}

export function Badge({
  className,
  variant = "primary",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    primary: "bg-[#C5A66A]/20 text-[#123C32] dark:text-[#C5A66A] border border-[#C5A66A]/40 font-semibold",
    secondary: "bg-[#123C32]/10 dark:bg-[#1A4D41] text-[#123C32] dark:text-[#F4F0E5] border border-[#123C32]/15 dark:border-white/10",
    outline: "border border-[#123C32]/25 dark:border-white/20 text-[#123C32] dark:text-[#F4F0E5] bg-transparent",
    success: "bg-emerald-600/15 text-emerald-800 dark:text-emerald-400 border border-emerald-600/30",
    warning: "bg-amber-500/15 text-amber-800 dark:text-amber-400 border border-amber-500/30",
    danger: "bg-rose-500/15 text-rose-800 dark:text-rose-400 border border-rose-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
