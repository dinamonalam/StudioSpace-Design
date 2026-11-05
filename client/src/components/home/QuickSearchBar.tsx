"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Film } from "lucide-react";
import { Button } from "@/components/ui/Button";

const CATEGORIES = [
  "All Categories",
  "Photo Studio",
  "Film Stage",
  "Podcast Room",
  "Music Suite",
  "Art Workshop",
];

export function QuickSearchBar() {
  const router = useRouter();
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (category && category !== "All Categories") {
      params.set("category", category);
    }
    if (location.trim()) {
      params.set("search", location.trim());
    }

    router.push(`/studios?${params.toString()}`);
  };

  return (
    <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14">
      <form
        onSubmit={handleSearch}
        className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/15 dark:border-white/10 shadow-2xl backdrop-blur-xl transition-all"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
          {/* 1. Category Selector */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F4F0E5] dark:bg-[#123C32] border border-[#123C32]/10 dark:border-white/10">
            <Film className="w-4 h-4 text-[#C5A66A] shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-[#123C32]/60 dark:text-[#F4F0E5]/60">
                Space Type
              </span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-[#123C32] dark:text-[#F4F0E5] focus:outline-none cursor-pointer truncate"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-white dark:bg-[#123C32] text-[#123C32] dark:text-[#F4F0E5]">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. Location Input */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F4F0E5] dark:bg-[#123C32] border border-[#123C32]/10 dark:border-white/10">
            <MapPin className="w-4 h-4 text-[#C5A66A] shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-[#123C32]/60 dark:text-[#F4F0E5]/60">
                City / District
              </span>
              <input
                type="text"
                placeholder="e.g. SoHo, Los Angeles, Chicago"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-[#123C32] dark:text-[#F4F0E5] placeholder:text-[#123C32]/40 dark:placeholder:text-[#F4F0E5]/40 focus:outline-none truncate"
              />
            </div>
          </div>

          {/* 3. Shoot Date Picker */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F4F0E5] dark:bg-[#123C32] border border-[#123C32]/10 dark:border-white/10">
            <Calendar className="w-4 h-4 text-[#C5A66A] shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-[#123C32]/60 dark:text-[#F4F0E5]/60">
                Shoot Date
              </span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-[#123C32] dark:text-[#F4F0E5] focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* 4. Action Button */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full h-full min-h-[50px] font-semibold gap-2 shadow-md shadow-[#C5A66A]/20"
          >
            <Search className="w-4 h-4" />
            <span>Search Studios</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
