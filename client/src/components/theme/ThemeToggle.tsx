"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={cn(
          "w-9 h-9 rounded-xl border border-white/10 bg-[#24272B]/60 p-2 text-[#858A90] opacity-70",
          className
        )}
      >
        <span className="w-5 h-5 block" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E7A65A]/50",
        isDark
          ? "border-white/10 bg-[#24272B] text-[#F5F0E8] hover:border-[#E7A65A]/40 hover:text-[#E7A65A]"
          : "border-black/10 bg-white text-[#17191C] hover:border-[#E7A65A] hover:text-[#E7A65A] shadow-sm",
        className
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}

