"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FEATURED_STUDIOS, STUDIO_CATEGORIES } from "@/data/mockStudios";
import { StudioCard } from "@/components/studios/StudioCard";
import { Search, Filter, SlidersHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

function StudiosContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialLocation = searchParams.get("location") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialLocation);
  const [sortBy, setSortBy] = useState("rating");

  const categories = ["All", "Photo Studio", "Film Stage", "Podcast Room", "Music Suite", "Art Workshop"];

  const filteredStudios = useMemo(() => {
    return FEATURED_STUDIOS.filter((studio) => {
      const matchesCategory =
        selectedCategory === "All" || studio.category === selectedCategory;
      const matchesSearch =
        studio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        studio.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.hourlyRate - b.hourlyRate;
      if (sortBy === "price-high") return b.hourlyRate - a.hourlyRate;
      return b.rating - a.rating; // default: top rated
    });
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-[#17191C] text-[#F5F0E8] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs uppercase font-semibold text-[#E7A65A] tracking-widest block mb-2">
            Creative Marketplace Directory
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5F0E8] leading-tight">
            Explore All Production Studios
          </h1>
          <p className="text-sm sm:text-base text-[#858A90] mt-2 max-w-2xl">
            Discover verified photography cyc walls, cinema sound stages, podcast lounges, and sound suites with transparent hourly rates.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#24272B] border border-[#32363C] rounded-2xl p-4 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#858A90]" />
              <input
                type="text"
                placeholder="Search studio name, city, or district..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#17191C] border border-[#32363C] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F5F0E8] placeholder:text-[#858A90] focus:outline-none focus:border-[#E7A65A]/50 transition-colors"
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <SlidersHorizontal className="w-4 h-4 text-[#858A90]" />
              <span className="text-xs text-[#858A90]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort studios"
                className="bg-[#17191C] border border-[#32363C] rounded-xl px-3 py-2 text-xs text-[#F5F0E8] font-medium focus:outline-none cursor-pointer"
              >
                <option value="rating">Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#E7A65A] text-[#17191C] font-semibold shadow-md"
                    : "bg-[#17191C] text-[#858A90] hover:text-[#F5F0E8] border border-white/5"
                }`}
              >
                {cat === "All" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#858A90]">
          <span>Showing {filteredStudios.length} creative spaces</span>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="text-[#E7A65A] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Studio Cards Grid */}
        {filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center rounded-2xl bg-[#24272B] border border-[#32363C] p-8">
            <Filter className="w-10 h-10 text-[#858A90] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl font-bold text-[#F5F0E8] mb-1">
              No creative spaces match your filter
            </h3>
            <p className="text-xs text-[#858A90] mb-6">
              Try broadening your search terms or selecting another studio category.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudiosPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#17191C] text-[#F5F0E8] flex items-center justify-center">
          <p className="text-sm text-[#858A90]">Loading studios directory...</p>
        </div>
      }
    >
      <StudiosContent />
    </Suspense>
  );
}

