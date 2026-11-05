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
        "inline-flex items-center gap-3 group transition-transform duration-200 active:scale-95 focus:outline-none",
        className
      )}
      aria-label="StudioSpace Home"
    >
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#E7A65A] via-[#D49547] to-[#8C581E] p-2 shadow-md shadow-[#E7A65A]/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#E7A65A]/30 group-hover:scale-105",
          sizeClasses[size]
        )}
      >
        {/* Custom Aperture / Spotlight SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#17191C]"
        >
          {/* Spotlight Lens Ring */}
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="1.8"
            className="opacity-90"
          />
          {/* Inner Aperture Blades */}
          <path
            d="M12 2C8 6 6 10 6 12L12 8L18 12C18 10 16 6 12 2Z"
            fill="currentColor"
            fillOpacity="0.85"
          />
          <path
            d="M22 12C18 16 14 18 12 18L16 12L12 6C14 6 18 8 22 12Z"
            fill="currentColor"
            fillOpacity="0.85"
          />
          <path
            d="M12 22C16 18 18 14 18 12L12 16L6 12C6 14 8 18 12 22Z"
            fill="currentColor"
            fillOpacity="0.85"
          />
          <path
            d="M2 12C6 8 10 6 12 6L8 12L12 18C10 18 6 16 2 12Z"
            fill="currentColor"
            fillOpacity="0.85"
          />
          {/* Spotlight Core Beam center */}
          <circle cx="12" cy="12" r="2.4" fill="currentColor" />
        </svg>
      </div>

      {!iconOnly && (
        <span
          className={cn(
            "font-serif font-bold tracking-tight text-[#F5F0E8] dark:text-[#F5F0E8] transition-colors group-hover:text-[#E7A65A]",
            textClasses[size]
          )}
        >
          Studio<span className="text-[#E7A65A]">Space</span>
        </span>
      )}
    </Link>
  );
}

