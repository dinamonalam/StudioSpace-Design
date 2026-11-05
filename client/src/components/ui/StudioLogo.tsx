import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface StudioLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function StudioLogo({ className, iconOnly = false, size = "md" }: StudioLogoProps) {
  const sizeClasses = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11",
  };

  const textClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 group transition-transform duration-200 active:scale-95 focus:outline-none",
        className
      )}
      aria-label="StudioSpace Home"
    >
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl bg-[#123C32] dark:bg-[#C5A66A] p-2 shadow-sm transition-all duration-300 group-hover:scale-105",
          sizeClasses[size]
        )}
      >
        {/* Custom Aperture / Spotlight SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#C5A66A] dark:text-[#123C32]"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="1.8"
            className="opacity-90"
          />
          <path d="m14.31 8 5.74 9.94" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9.69 8h11.48" stroke="currentColor" strokeWidth="1.8" />
          <path d="m7.38 12 5.74-9.94" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9.69 16 3.95 6.06" stroke="currentColor" strokeWidth="1.8" />
          <path d="M14.31 16H2.83" stroke="currentColor" strokeWidth="1.8" />
          <path d="m16.62 12-5.74 9.94" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-serif font-bold tracking-tight leading-none text-[#123C32] dark:text-[#F4F0E5]",
              textClasses[size]
            )}
          >
            Studio<span className="text-[#C5A66A]">Space</span>
          </span>
          <span className="text-[9px] uppercase tracking-widest text-[#123C32]/60 dark:text-[#F4F0E5]/60 font-semibold font-sans mt-0.5">
            Creative Marketplace
          </span>
        </div>
      )}
    </Link>
  );
}
