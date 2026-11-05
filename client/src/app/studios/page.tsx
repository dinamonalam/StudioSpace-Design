"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Studio } from "@/types";
import { StudioCard } from "@/components/studios/StudioCard";
import { getStudios, getWishlistIds } from "@/services/studioService";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Filter,
  DollarSign,
  Loader2,
  X,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

function StudiosContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialLocation = searchParams.get("location") || "";

  const { user } = useAuth();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialLocation);
  const [sortBy, setSortBy] = useState("rating");
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(300);
  const [selectedAmenity, setSelectedAmenity] = useState<string>("All");

  const categories = [
    "All",
    "Photo Studio",
    "Film Stage",
    "Podcast Room",
    "Music Suite",
    "Art Workshop",
  ];

  const popularAmenities = [
    "All",
    "Corner Infinity Cyc Wall",
    "Motorized Lighting Grid",
    "Acoustic Soundproofing (NC-20)",
    "4K Cinema Cameras",
    "Dolby Atmos Monitoring",
    "High-Speed Fiber WiFi",
    "Hair & Makeup Vanity",
  ];

  // Fetch live studios from backend and wishlist
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [studioData, userWishlists] = await Promise.all([
          getStudios(),
          user ? getWishlistIds() : Promise.resolve([]),
        ]);
        setStudios(studioData);
        setWishlistIds(userWishlists);
      } catch (err) {
        console.error("Failed to load studios:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  // Sync category from URL param if changed externally
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && cat !== selectedCategory) {
      setSelectedCategory(cat);
    }
  }, [searchParams, selectedCategory]);

  // Client-side filtering & sorting
  const filteredStudios = useMemo(() => {
    return studios
      .filter((studio) => {
        // Category filter
        const matchesCategory =
          selectedCategory === "All" || studio.category === selectedCategory;

        // Search term (title or location)
        const term = searchTerm.toLowerCase().trim();
        const matchesSearch =
          !term ||
          studio.title.toLowerCase().includes(term) ||
          studio.location.toLowerCase().includes(term) ||
          studio.description.toLowerCase().includes(term);

        // Price filter
        const matchesPrice = studio.hourlyRate <= maxPriceFilter;

        // Amenity filter
        const matchesAmenity =
          selectedAmenity === "All" ||
          studio.amenities.includes(selectedAmenity);

        return matchesCategory && matchesSearch && matchesPrice && matchesAmenity;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.hourlyRate - b.hourlyRate;
        if (sortBy === "price-high") return b.hourlyRate - a.hourlyRate;
        if (sortBy === "newest") {
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        }
        return b.rating - a.rating; // default: top rated
      });
  }, [studios, selectedCategory, searchTerm, maxPriceFilter, selectedAmenity, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchTerm("");
    setSortBy("rating");
    setMaxPriceFilter(300);
    setSelectedAmenity("All");
  };

  return (
    <div className="min-h-screen bg-[#F4F0E5] dark:bg-[#123C32] text-[#123C32] dark:text-[#F4F0E5] py-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A66A]/15 border border-[#C5A66A]/30 text-xs font-semibold text-[#123C32] dark:text-[#C5A66A] mb-3">
            <Compass className="w-3.5 h-3.5 text-[#C5A66A]" />
            <span>Creative Marketplace Directory</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#123C32] dark:text-[#F4F0E5] leading-tight">
            Explore All Production Studios
          </h1>
          <p className="text-sm sm:text-base text-[#123C32]/75 dark:text-[#F4F0E5]/75 mt-2 max-w-2xl">
            Discover verified photography cyc walls, cinema sound stages, podcast lounges, and sound suites with transparent hourly rates.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white dark:bg-[#1A4D41] border border-[#123C32]/10 dark:border-white/10 rounded-2xl p-5 mb-8 space-y-4 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
              <input
                type="text"
                placeholder="Search studio name, city, district..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 rounded-xl pl-10 pr-9 py-2.5 text-xs text-[#123C32] dark:text-[#F4F0E5] placeholder:text-[#123C32]/45 dark:placeholder:text-[#F4F0E5]/45 focus:outline-none focus:border-[#C5A66A] transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#123C32]/60 dark:text-[#F4F0E5]/60 hover:text-[#123C32] dark:hover:text-[#F4F0E5]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Sliders & Selectors */}
            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-start lg:justify-end">
              {/* Hourly Price Range */}
              <div className="flex items-center gap-2 bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 rounded-xl px-3 py-2 text-xs text-[#123C32]/80 dark:text-[#F4F0E5]/80">
                <span>Max:</span>
                <span className="font-bold text-[#123C32] dark:text-[#C5A66A]">${maxPriceFilter}/hr</span>
                <input
                  type="range"
                  min="40"
                  max="300"
                  step="10"
                  value={maxPriceFilter}
                  onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                  className="w-20 accent-[#123C32] dark:accent-[#C5A66A] cursor-pointer"
                />
              </div>

              {/* Amenity Filter */}
              <div className="flex items-center gap-1.5 bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 rounded-xl px-3 py-2 text-xs">
                <span className="text-[#123C32]/70 dark:text-[#F4F0E5]/70">Gear:</span>
                <select
                  value={selectedAmenity}
                  onChange={(e) => setSelectedAmenity(e.target.value)}
                  className="bg-transparent text-[#123C32] dark:text-[#F4F0E5] font-medium focus:outline-none cursor-pointer max-w-[130px] truncate"
                >
                  {popularAmenities.map((amenity) => (
                    <option key={amenity} value={amenity} className="bg-white dark:bg-[#1A4D41] text-[#123C32] dark:text-[#F4F0E5]">
                      {amenity}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 rounded-xl px-3 py-2 text-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
                <span className="text-[#123C32]/70 dark:text-[#F4F0E5]/70">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort studios"
                  className="bg-transparent text-[#123C32] dark:text-[#F4F0E5] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="rating" className="bg-white dark:bg-[#1A4D41] text-[#123C32] dark:text-[#F4F0E5]">Top Rated</option>
                  <option value="price-low" className="bg-white dark:bg-[#1A4D41] text-[#123C32] dark:text-[#F4F0E5]">Price: Low to High</option>
                  <option value="price-high" className="bg-white dark:bg-[#1A4D41] text-[#123C32] dark:text-[#F4F0E5]">Price: High to Low</option>
                  <option value="newest" className="bg-white dark:bg-[#1A4D41] text-[#123C32] dark:text-[#F4F0E5]">Newest Spaces</option>
                </select>
              </div>

              {(selectedCategory !== "All" || searchTerm || maxPriceFilter < 300 || selectedAmenity !== "All") && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#C5A66A] hover:underline flex items-center gap-1 font-semibold"
                >
                  <X className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#123C32] dark:bg-[#C5A66A] text-[#F4F0E5] dark:text-[#123C32] shadow-sm"
                    : "bg-[#F4F0E5]/70 dark:bg-[#123C32]/60 text-[#123C32]/70 dark:text-[#F4F0E5]/70 hover:text-[#123C32] dark:hover:text-[#F4F0E5] border border-[#123C32]/10 dark:border-white/10"
                }`}
              >
                {cat === "All" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Active Status */}
        <div className="flex items-center justify-between text-xs text-[#123C32]/70 dark:text-[#F4F0E5]/70 mb-6 px-1">
          <span>
            Showing <strong className="text-[#123C32] dark:text-[#F4F0E5]">{filteredStudios.length}</strong> creative studio spaces
          </span>
          {selectedCategory !== "All" && (
            <span className="text-[#C5A66A] font-semibold">Filtered by: {selectedCategory}</span>
          )}
        </div>

        {/* Studios Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="rounded-2xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/10 dark:border-white/10 p-4 space-y-4 animate-pulse shadow-sm"
              >
                <div className="aspect-[16/10] bg-[#123C32]/10 dark:bg-white/10 rounded-xl" />
                <div className="h-5 bg-[#123C32]/10 dark:bg-white/10 rounded w-3/4" />
                <div className="h-4 bg-[#123C32]/10 dark:bg-white/10 rounded w-1/2" />
                <div className="h-10 bg-[#123C32]/10 dark:bg-white/10 rounded" />
              </div>
            ))}
          </div>
        ) : filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudios.map((studio) => (
              <StudioCard
                key={studio._id}
                studio={studio}
                isWishlisted={wishlistIds.includes(studio._id)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-4 rounded-3xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/10 dark:border-white/10 shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#C5A66A]/10 border border-[#C5A66A]/30 flex items-center justify-center text-[#C5A66A]">
              <Search className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#123C32] dark:text-[#F4F0E5] mb-2">
              No Workspaces Match Your Search
            </h2>
            <p className="text-sm text-[#123C32]/75 dark:text-[#F4F0E5]/75 max-w-md mx-auto mb-6">
              We couldn&apos;t find any studios matching your current filters. Try adjusting your hourly rate, equipment choices, or search keywords.
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={resetFilters}
              className="font-medium"
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
        <div className="min-h-screen bg-[#F4F0E5] dark:bg-[#123C32] flex items-center justify-center text-[#C5A66A]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <StudiosContent />
    </Suspense>
  );
}
