"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Studio } from "@/types";
import { getStudioById, toggleWishlistApi, getWishlistIds } from "@/services/studioService";
import { createBooking } from "@/services/bookingService";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Star,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Heart,
  Loader2,
  DollarSign,
  Sparkles,
  Info,
} from "lucide-react";
import { toast } from "sonner";

export default function StudioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { user } = useAuth();

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Booking Calculator State
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split("T")[0];

  const [bookingDate, setBookingDate] = useState(defaultDateStr);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("14:00");
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    async function loadStudio() {
      if (!id) return;
      try {
        setLoading(true);
        const [studioData, wishlists] = await Promise.all([
          getStudioById(id),
          user ? getWishlistIds() : Promise.resolve([]),
        ]);

        if (studioData) {
          setStudio(studioData);
          setIsWishlisted(wishlists.includes(studioData._id));
        } else {
          toast.error("Studio workspace not found.");
          router.push("/studios");
        }
      } catch (err) {
        console.error("Failed to load studio details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStudio();
  }, [id, user, router]);

  // Gallery images (cover image + curated complementary studio views)
  const galleryImages = studio
    ? [
        studio.imageUrl,
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop",
      ]
    : [];

  // Calculate reservation hours and price breakdown
  const calculateTotal = () => {
    if (!studio) return { hours: 4, subtotal: 380, total: 380 };
    const startHour = parseInt(startTime.split(":")[0], 10);
    const endHour = parseInt(endTime.split(":")[0], 10);
    const hours = Math.max(1, endHour - startHour);
    const subtotal = hours * studio.hourlyRate;
    const total = subtotal + (studio.securityDeposit || 0);
    return { hours, subtotal, total };
  };

  const { hours, subtotal, total } = calculateTotal();

  const handleToggleWishlist = async () => {
    if (!user) {
      toast.info("Please log in to save workspaces to your wishlist.");
      return;
    }
    if (!studio) return;

    const nextState = !isWishlisted;
    setIsWishlisted(nextState);

    try {
      const res = await toggleWishlistApi(studio._id);
      if (res.success && res.isWishlisted !== undefined) {
        setIsWishlisted(res.isWishlisted);
        toast.success(res.message || (res.isWishlisted ? "Saved to wishlist" : "Removed from wishlist"));
      } else {
        setIsWishlisted(!nextState);
        toast.error("Failed to update wishlist.");
      }
    } catch {
      setIsWishlisted(!nextState);
      toast.error("Failed to update wishlist.");
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Studio link copied to clipboard!");
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studio) return;

    if (!user) {
      toast.info("Please log in to book this creative workspace.");
      router.push(`/login?redirect=${encodeURIComponent(`/studios/${id}`)}`);
      return;
    }

    if (!bookingDate) {
      toast.error("Please select a reservation date.");
      return;
    }

    const startHour = parseInt(startTime.split(":")[0], 10);
    const endHour = parseInt(endTime.split(":")[0], 10);
    if (endHour <= startHour) {
      toast.error("End time must be after start time.");
      return;
    }

    setIsBooking(true);
    try {
      const res = await createBooking({
        studioId: studio._id,
        studioTitle: studio.title,
        hostEmail: studio.ownerEmail,
        bookingDate,
        startTime,
        endTime,
        hourlyRate: studio.hourlyRate,
        totalPrice: total,
      });

      if (res.success) {
        toast.success(
          `Reservation confirmed for "${studio.title}" on ${bookingDate} (${hours} hrs)!`
        );
        router.push("/my-bookings");
      } else {
        toast.error(res.error || "Failed to reserve studio.");
      }
    } catch {
      toast.error("Error creating reservation.");
    } finally {
      setIsBooking(false);
    }
  };

  if (loading || !studio) {
    return (
      <div className="min-h-screen bg-[#F4F0E5] dark:bg-[#123C32] flex flex-col items-center justify-center text-[#123C32] dark:text-[#F4F0E5]">
        <Loader2 className="w-8 h-8 text-[#C5A66A] animate-spin mb-3" />
        <p className="text-xs text-[#123C32]/70 dark:text-[#F4F0E5]/70 uppercase tracking-widest font-semibold">
          Loading Workspace Specifications...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F0E5] dark:bg-[#123C32] text-[#123C32] dark:text-[#F4F0E5] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 hover:text-[#C5A66A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Studios</span>
          </Link>
        </div>

        {/* Title & Actions Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="primary" className="text-xs px-3 py-1 font-semibold">
                {studio.category}
              </Badge>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#123C32] dark:text-[#F4F0E5]">
                <Star className="w-3.5 h-3.5 fill-[#C5A66A] text-[#C5A66A]" />
                <span>{studio.rating.toFixed(2)}</span>
                <span className="text-[#123C32]/60 dark:text-[#F4F0E5]/60">({studio.reviewsCount || 24} reviews)</span>
              </div>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#123C32] dark:text-[#F4F0E5]">
              {studio.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-[#123C32]/70 dark:text-[#F4F0E5]/70 mt-2">
              <MapPin className="w-4 h-4 text-[#C5A66A] shrink-0" />
              <span>{studio.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleWishlist}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                isWishlisted
                  ? "bg-rose-500/10 border-rose-500/40 text-rose-500"
                  : "bg-white dark:bg-[#1A4D41] border-[#123C32]/15 dark:border-white/15 text-[#123C32] dark:text-[#F4F0E5] hover:border-[#C5A66A]"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? "fill-rose-500 text-rose-500" : "text-[#123C32]/60 dark:text-[#F4F0E5]/60"
                }`}
              />
              <span>{isWishlisted ? "Saved" : "Save to Wishlist"}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/15 dark:border-white/15 text-xs font-semibold text-[#123C32] dark:text-[#F4F0E5] hover:border-[#C5A66A] transition-all"
            >
              <Share2 className="w-4 h-4 text-[#123C32]/60 dark:text-[#F4F0E5]/60" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Photography Gallery Section */}
        <div className="mb-12 space-y-4">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden border border-[#123C32]/10 dark:border-white/10 bg-white/50 shadow-md">
            <Image
              src={galleryImages[activeImageIndex]}
              alt={studio.title}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-opacity duration-300"
              unoptimized
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-[#123C32]/80 backdrop-blur-md text-xs font-semibold text-[#F4F0E5] border border-white/10">
                Studio View {activeImageIndex + 1} of {galleryImages.length}
              </span>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? "border-[#C5A66A] scale-[1.02] shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="25vw"
                  className="object-cover"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Content Grid: Specs on Left, Booking Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Column: Specs, Amenities, Overview, Host Info */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/10 dark:border-white/10 shadow-sm">
              <div>
                <span className="text-xs uppercase text-[#123C32]/60 dark:text-[#F4F0E5]/60 font-semibold block mb-1">
                  Hourly Rate
                </span>
                <span className="font-serif text-2xl font-bold text-[#123C32] dark:text-[#C5A66A]">
                  ${studio.hourlyRate}
                  <span className="text-xs font-sans text-[#123C32]/60 dark:text-[#F4F0E5]/60"> / hr</span>
                </span>
              </div>
              <div>
                <span className="text-xs uppercase text-[#123C32]/60 dark:text-[#F4F0E5]/60 font-semibold block mb-1">
                  Max Capacity
                </span>
                <span className="font-serif text-2xl font-bold text-[#123C32] dark:text-[#F4F0E5] flex items-center gap-1.5">
                  <Users className="w-5 h-5 text-[#C5A66A]" />
                  <span>{studio.maxCapacity}</span>
                </span>
              </div>
              <div>
                <span className="text-xs uppercase text-[#123C32]/60 dark:text-[#F4F0E5]/60 font-semibold block mb-1">
                  Deposit
                </span>
                <span className="font-serif text-2xl font-bold text-[#123C32] dark:text-[#F4F0E5]">
                  ${studio.securityDeposit || 0}
                </span>
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#123C32] dark:text-[#F4F0E5]">
                About This Workspace
              </h2>
              <p className="text-sm leading-relaxed text-[#123C32]/75 dark:text-[#F4F0E5]/75 whitespace-pre-line">
                {studio.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#123C32] dark:text-[#F4F0E5]">
                Production Equipment & Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {studio.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/10 dark:border-white/10 text-xs font-medium text-[#123C32] dark:text-[#F4F0E5] shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C5A66A] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Identity Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/10 dark:border-white/10 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#123C32]/10 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-[#C5A66A]/20 border border-[#C5A66A]/40 flex items-center justify-center font-serif font-bold text-[#123C32] dark:text-[#C5A66A] text-lg">
                    {studio.ownerName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#123C32] dark:text-[#F4F0E5]">
                      Hosted by {studio.ownerName}
                    </h3>
                    <p className="text-xs text-[#123C32]/60 dark:text-[#F4F0E5]/60">
                      Verified StudioSpace Facility Partner
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Host</span>
                </div>
              </div>

              <p className="text-xs text-[#123C32]/70 dark:text-[#F4F0E5]/70 leading-relaxed">
                Direct on-site support and gear checkout available during all booked production slots. Contact verified at {studio.ownerEmail}.
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card & Price Calculator */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/10 dark:border-white/10 shadow-lg space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#123C32]/10 dark:border-white/10 pb-4">
                <div>
                  <span className="font-serif text-3xl font-bold text-[#123C32] dark:text-[#C5A66A]">
                    ${studio.hourlyRate}
                  </span>
                  <span className="text-xs text-[#123C32]/60 dark:text-[#F4F0E5]/60 ml-1">/ hour</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#123C32] dark:text-[#F4F0E5] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#C5A66A] text-[#C5A66A]" />
                  <span>{studio.rating.toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Date Picker */}
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 tracking-wider mb-2">
                    Booking Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 text-xs text-[#123C32] dark:text-[#F4F0E5] focus:outline-none focus:border-[#C5A66A] transition-colors cursor-pointer"
                    />
                  </div>
                </div>

                {/* Time Slot Selectors */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 tracking-wider mb-2">
                      Start Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-3.5 h-3.5 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
                      <select
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full pl-9 pr-2 py-2.5 rounded-xl bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 text-xs text-[#123C32] dark:text-[#F4F0E5] focus:outline-none focus:border-[#C5A66A] transition-colors cursor-pointer"
                      >
                        <option value="08:00">08:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="18:00">06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 tracking-wider mb-2">
                      End Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-3.5 h-3.5 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
                      <select
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full pl-9 pr-2 py-2.5 rounded-xl bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 text-xs text-[#123C32] dark:text-[#F4F0E5] focus:outline-none focus:border-[#C5A66A] transition-colors cursor-pointer"
                      >
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="18:00">06:00 PM</option>
                        <option value="20:00">08:00 PM</option>
                        <option value="22:00">10:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Price Calculation Breakdown */}
                <div className="p-4 rounded-xl bg-[#F4F0E5]/70 dark:bg-[#123C32]/60 border border-[#123C32]/10 dark:border-white/10 space-y-2.5 text-xs">
                  <div className="flex justify-between text-[#123C32]/70 dark:text-[#F4F0E5]/70">
                    <span>${studio.hourlyRate} x {hours} shoot hours</span>
                    <span className="text-[#123C32] dark:text-[#F4F0E5] font-semibold">${subtotal}</span>
                  </div>

                  <div className="flex justify-between text-[#123C32]/70 dark:text-[#F4F0E5]/70">
                    <span>Refundable Security Deposit</span>
                    <span className="text-[#123C32] dark:text-[#F4F0E5] font-semibold">${studio.securityDeposit || 0}</span>
                  </div>

                  <div className="border-t border-[#123C32]/10 dark:border-white/10 pt-2 flex justify-between font-bold text-sm text-[#123C32] dark:text-[#F4F0E5]">
                    <span>Estimated Total</span>
                    <span className="text-[#C5A66A]">${total}</span>
                  </div>
                </div>

                {/* Action CTA */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isBooking}
                  className="w-full gap-2 font-semibold shadow-sm"
                >
                  {isBooking ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Checking Availability...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Book Workspace Now</span>
                    </>
                  )}
                </Button>
              </form>

              <div className="flex items-center gap-2 text-[11px] text-[#123C32]/60 dark:text-[#F4F0E5]/60 justify-center text-center">
                <Info className="w-3.5 h-3.5 text-[#C5A66A] shrink-0" />
                <span>You will not be billed until the host confirms availability</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
