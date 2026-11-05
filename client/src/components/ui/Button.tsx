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
      "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E7A65A]/40 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer";

    const variantStyles = {
      primary:
        "bg-[#E7A65A] text-[#17191C] hover:bg-[#D49547] font-semibold shadow-md shadow-[#E7A65A]/15 hover:shadow-lg hover:shadow-[#E7A65A]/25",
      secondary:
        "bg-[#24272B] text-[#F5F0E8] hover:bg-[#2C3136] border border-[#32363C] hover:border-white/20",
      outline:
        "bg-transparent text-[#F5F0E8] border border-[#E7A65A]/60 hover:bg-[#E7A65A]/10 hover:border-[#E7A65A] text-[#E7A65A]",
      ghost:
        "bg-transparent text-[#858A90] hover:text-[#F5F0E8] hover:bg-white/5",
      danger:
        "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50",
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

