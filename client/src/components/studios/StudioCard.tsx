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
    setFavorite(nextState); // optimistic update

    try {
      const res = await toggleWishlistApi(studio._id);
      if (res.success && res.isWishlisted !== undefined) {
        setFavorite(res.isWishlisted);
        toast.success(res.message || (res.isWishlisted ? "Saved to wishlist" : "Removed from wishlist"));
      } else {
        setFavorite(!nextState); // revert on error
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
    <div className="group relative flex flex-col h-full rounded-2xl bg-[#24272B] border border-[#32363C] hover:border-[#E7A65A]/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-black/40 overflow-hidden">
      {/* Studio Image & Badges */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-[#17191C]"
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
          <Badge
            variant="primary"
            className="backdrop-blur-md bg-[#17191C]/80 border-white/10 text-xs font-semibold px-3 py-1 text-[#E7A65A]"
          >
            {studio.category}
          </Badge>
        </div>

        {/* Wishlist Button (Challenge Feature) */}
        <button
          onClick={toggleFavorite}
          aria-label={favorite ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-[#17191C]/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#F5F0E8] hover:text-red-400 hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              favorite ? "fill-red-500 text-red-500" : "text-[#F5F0E8]"
            }`}
          />
        </button>

        {/* Capacity Indicator (bottom left of image) */}
        <div className="absolute bottom-3 left-3.5 z-10 flex items-center gap-1.5 text-xs text-[#F5F0E8] font-medium bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md">
          <Users className="w-3.5 h-3.5 text-[#E7A65A]" />
          <span>Up to {studio.maxCapacity} creators</span>
        </div>

        {/* Rating Badge (bottom right of image) */}
        <div className="absolute bottom-3 right-3.5 z-10 flex items-center gap-1 text-xs font-semibold text-[#F5F0E8] bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
          <Star className="w-3.5 h-3.5 fill-[#E7A65A] text-[#E7A65A]" />
          <span>{studio.rating.toFixed(1)}</span>
          {studio.reviewsCount ? (
            <span className="text-[#858A90]">({studio.reviewsCount})</span>
          ) : null}
        </div>
      </div>

      {/* Studio Info Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#858A90] mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#E7A65A] shrink-0" />
            <span className="truncate">{studio.location}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-[#F5F0E8] group-hover:text-[#E7A65A] transition-colors line-clamp-1 mb-2">
            {studio.title}
          </h3>

          {/* Amenities preview tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {studio.amenities.slice(0, 2).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded bg-[#17191C]/70 text-[#858A90] border border-white/5 truncate max-w-[150px]"
              >
                {amenity}
              </span>
            ))}
            {studio.amenities.length > 2 && (
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#17191C]/70 text-[#858A90] border border-white/5">
                +{studio.amenities.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Price & View Details Action */}
        <div className="pt-4 border-t border-[#32363C] flex items-center justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#E7A65A]">
                ${studio.hourlyRate}
              </span>
              <span className="text-xs text-[#858A90] font-normal">/ hr</span>
            </div>
            <span className="text-[10px] text-[#858A90] block">
              ${studio.securityDeposit} deposit
            </span>
          </div>

          <Link href={`/studios/${studio._id}`}>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 group-hover:bg-[#E7A65A] group-hover:text-[#17191C] group-hover:border-[#E7A65A] transition-all"
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

