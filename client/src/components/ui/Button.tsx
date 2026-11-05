import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A66A]/40 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer";

    const variantStyles = {
      primary:
        "bg-[#C5A66A] text-[#123C32] hover:bg-[#D5BA83] font-semibold shadow-md shadow-[#C5A66A]/20 hover:shadow-lg",
      secondary:
        "bg-[#123C32] text-[#F4F0E5] hover:bg-[#1E6652] dark:bg-[#1A4D41] dark:hover:bg-[#1E6652] border border-[#123C32]/20 dark:border-white/10",
      outline:
        "bg-transparent text-[#123C32] dark:text-[#C5A66A] border border-[#C5A66A] hover:bg-[#C5A66A]/10",
      ghost:
        "bg-transparent text-[#123C32]/75 dark:text-[#F4F0E5]/75 hover:text-[#123C32] dark:hover:text-white hover:bg-[#123C32]/5 dark:hover:bg-white/10",
      danger:
        "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 hover:bg-red-500/20",
    };

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs gap-1.5",
      md: "h-11 px-5 text-sm gap-2",
      lg: "h-12 px-7 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
