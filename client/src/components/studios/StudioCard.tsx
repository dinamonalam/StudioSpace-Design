"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Users, Heart, ArrowUpRight } from "lucide-react";
import { Studio } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { toggleWishlistApi } from "@/services/studioService";

interface StudioCardProps {
  studio: Studio;
  isWishlisted?: boolean;
}

export function StudioCard({ studio, isWishlisted = false }: StudioCardProps) {
  const { user } = useAuth();
  const [favorite, setFavorite] = useState(isWishlisted);
  const [isToggling, setIsToggling] = useState(false);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.info("Please log in to save workspaces to your wishlist.");
      return;
    }

    if (isToggling) return;
    setIsToggling(true);

    const nextState = !favorite;
    setFavorite(nextState);

    try {
      const res = await toggleWishlistApi(studio._id);
      if (res.success && res.isWishlisted !== undefined) {
        setFavorite(res.isWishlisted);
        toast.success(res.message || (res.isWishlisted ? "Saved to wishlist" : "Removed from wishlist"));
      } else {
        setFavorite(!nextState);
        toast.error("Failed to update wishlist.");
      }
    } catch {
      setFavorite(!nextState);
      toast.error("Failed to update wishlist.");
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="group relative flex flex-col h-full rounded-2xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/12 dark:border-white/10 hover:border-[#C5A66A] transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden">
      {/* Studio Image & Badges */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-[#F4F0E5] dark:bg-[#123C32]"
        style={{ position: "relative" }}
      >
        <Image
          src={studio.imageUrl}
          alt={studio.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="backdrop-blur-md bg-[#123C32]/85 text-[#C5A66A] text-xs font-semibold px-3 py-1 rounded-full border border-white/10">
            {studio.category}
          </span>
        </div>

        {/* Wishlist Button (Challenge Feature) */}
        <button
          onClick={toggleFavorite}
          aria-label={favorite ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:text-red-400 hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              favorite ? "fill-red-500 text-red-500" : "text-white"
            }`}
          />
        </button>

        {/* Capacity Indicator */}
        <div className="absolute bottom-3 left-3.5 z-10 flex items-center gap-1.5 text-xs text-white font-medium bg-black/55 backdrop-blur-sm px-2.5 py-1 rounded-md">
          <Users className="w-3.5 h-3.5 text-[#C5A66A]" />
          <span>Up to {studio.maxCapacity} guests</span>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3.5 z-10 flex items-center gap-1 text-xs font-semibold text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
          <Star className="w-3.5 h-3.5 fill-[#C5A66A] text-[#C5A66A]" />
          <span>{studio.rating.toFixed(1)}</span>
          {studio.reviewsCount ? (
            <span className="text-white/70">({studio.reviewsCount})</span>
          ) : null}
        </div>
      </div>

      {/* Studio Info Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#123C32]/70 dark:text-[#F4F0E5]/70 mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#C5A66A] shrink-0" />
            <span className="truncate">{studio.location}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#123C32] dark:text-[#F4F0E5] group-hover:text-[#C5A66A] transition-colors line-clamp-1 mb-2">
            {studio.title}
          </h3>

          {/* Amenities preview tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {studio.amenities.slice(0, 2).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#F4F0E5] dark:bg-[#123C32] text-[#123C32]/80 dark:text-[#F4F0E5]/80 border border-[#123C32]/10 dark:border-white/5 truncate max-w-[150px]"
              >
                {amenity}
              </span>
            ))}
            {studio.amenities.length > 2 && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F4F0E5] dark:bg-[#123C32] text-[#123C32]/70 dark:text-[#F4F0E5]/70 border border-[#123C32]/10 dark:border-white/5">
                +{studio.amenities.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Price & View Details Action */}
        <div className="pt-4 border-t border-[#123C32]/10 dark:border-white/10 flex items-center justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-xl font-bold text-[#C5A66A]">
                ${studio.hourlyRate}
              </span>
              <span className="text-xs text-[#123C32]/60 dark:text-[#F4F0E5]/60 font-sans">
                / hr
              </span>
            </div>
            <span className="text-[10px] text-[#123C32]/50 dark:text-[#F4F0E5]/50 block">
              +${studio.securityDeposit} deposit
            </span>
          </div>

          <Link href={`/studios/${studio._id}`}>
            <Button
              variant="secondary"
              size="sm"
              className="gap-1.5 text-xs font-semibold"
            >
              <span>View Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
