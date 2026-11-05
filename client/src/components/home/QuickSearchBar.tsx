"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Layers, ArrowRight } from "lucide-react";
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
      params.set("location", location.trim());
    }
    if (date) {
      params.set("date", date);
    }
    router.push(`/studios?${params.toString()}`);
  };

  return (
    <div className="relative -mt-10 md:-mt-14 z-30 max-w-6xl mx-auto px-4 sm:px-6">
      <form
        onSubmit={handleSearch}
        className="bg-[#24272B] border border-[#32363C] rounded-2xl p-4 md:p-5 shadow-2xl shadow-black/40 backdrop-blur-xl grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center"
      >
        {/* Category Selector */}
        <div className="md:col-span-4 flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#17191C]/60 border border-white/5 focus-within:border-[#E7A65A]/50 transition-colors">
          <Layers className="w-5 h-5 text-[#E7A65A] shrink-0" />
          <div className="flex-1">
            <label className="block text-[10px] uppercase font-semibold text-[#858A90] tracking-wider">
              Studio Type
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Studio Type"
              className="w-full bg-transparent text-sm text-[#F5F0E8] font-medium focus:outline-none cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-[#24272B] text-[#F5F0E8]">
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location Input */}
        <div className="md:col-span-3 flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#17191C]/60 border border-white/5 focus-within:border-[#E7A65A]/50 transition-colors">
          <MapPin className="w-5 h-5 text-[#E7A65A] shrink-0" />
          <div className="flex-1">
            <label htmlFor="search-city" className="block text-[10px] uppercase font-semibold text-[#858A90] tracking-wider">
              Location / City
            </label>
            <input
              id="search-city"
              type="text"
              placeholder="e.g. New York, LA, SoHo..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-sm text-[#F5F0E8] placeholder:text-[#858A90]/60 focus:outline-none"
            />
          </div>
        </div>

        {/* Date Selector */}
        <div className="md:col-span-3 flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#17191C]/60 border border-white/5 focus-within:border-[#E7A65A]/50 transition-colors">
          <Calendar className="w-5 h-5 text-[#E7A65A] shrink-0" />
          <div className="flex-1">
            <label htmlFor="search-date" className="block text-[10px] uppercase font-semibold text-[#858A90] tracking-wider">
              Booking Date
            </label>
            <input
              id="search-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-sm text-[#F5F0E8] focus:outline-none [color-scheme:dark] cursor-pointer"
            />
          </div>
        </div>

        {/* Search Submit CTA */}
        <div className="md:col-span-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full h-[52px] font-semibold text-sm flex items-center justify-center gap-2 group"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </form>
    </div>
  );
}

