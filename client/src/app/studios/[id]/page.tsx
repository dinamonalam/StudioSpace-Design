"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FEATURED_STUDIOS } from "@/data/mockStudios";
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
  Mail,
  Share2,
  Heart,
} from "lucide-react";
import { toast } from "sonner";

export default function StudioDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const studio =
    FEATURED_STUDIOS.find((s) => s._id === id) || FEATURED_STUDIOS[0];

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("14:00");
  const [isFavorite, setIsFavorite] = useState(false);

  // Calculate hours and total
  const calculateTotal = () => {
    const startHour = parseInt(startTime.split(":")[0], 10);
    const endHour = parseInt(endTime.split(":")[0], 10);
    const hours = Math.max(1, endHour - startHour);
    const subtotal = hours * studio.hourlyRate;
    const total = subtotal + studio.securityDeposit;
    return { hours, subtotal, total };
  };

  const { hours, subtotal, total } = calculateTotal();

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate) {
      toast.error("Please select a valid booking date.");
      return;
    }
    toast.success(
      `Reservation requested for ${studio.title} on ${bookingDate} (${hours} hrs)! Status: Pending`
    );
  };

  return (
    <div className="min-h-screen bg-[#17191C] text-[#F5F0E8] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#858A90] hover:text-[#E7A65A] transition-colors"
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
              <div className="flex items-center gap-1 text-xs font-semibold text-[#F5F0E8]">
                <Star className="w-3.5 h-3.5 fill-[#E7A65A] text-[#E7A65A]" />
                <span>{studio.rating.toFixed(2)}</span>
                <span className="text-[#858A90]">({studio.reviewsCount || 24} reviews)</span>
              </div>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F0E8]">
              {studio.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-[#858A90] mt-2">
              <MapPin className="w-4 h-4 text-[#E7A65A]" />
              <span>{studio.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsFavorite(!isFavorite);
                toast.success(
                  isFavorite
                    ? `Removed from wishlist.`
                    : `Saved to wishlist!`
                );
              }}
              className="p-2.5 rounded-xl border border-[#32363C] bg-[#24272B] text-[#F5F0E8] hover:text-red-400 hover:border-red-500/40 transition-colors"
              aria-label="Wishlist studio"
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
              />
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Studio link copied to clipboard!");
              }}
              className="p-2.5 rounded-xl border border-[#32363C] bg-[#24272B] text-[#F5F0E8] hover:text-[#E7A65A] hover:border-[#E7A65A]/40 transition-colors"
              aria-label="Share studio"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Gallery Visual Hero */}
        <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full rounded-3xl overflow-hidden mb-12 border border-[#32363C] shadow-2xl" style={{ position: "relative" }}>
          <Image
            src={studio.imageUrl}
            alt={studio.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs">
            <Users className="w-4 h-4 text-[#E7A65A]" />
            <span>Max Capacity: Up to {studio.maxCapacity} creators & crew</span>
          </div>
        </div>

        {/* Content Layout: Left Specs vs Right Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Details & Amenities */}
          <div className="lg:col-span-7 space-y-10">
            {/* Overview */}
            <div className="p-8 rounded-3xl bg-[#24272B] border border-[#32363C]">
              <h2 className="font-serif text-2xl font-bold text-[#F5F0E8] mb-4">
                Workspace Overview
              </h2>
              <p className="text-sm sm:text-base text-[#858A90] leading-relaxed">
                {studio.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="p-8 rounded-3xl bg-[#24272B] border border-[#32363C]">
              <h2 className="font-serif text-2xl font-bold text-[#F5F0E8] mb-6">
                Included Production Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {studio.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#17191C]/60 border border-white/5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#E7A65A] shrink-0" />
                    <span className="text-xs text-[#F5F0E8] font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Details */}
            <div className="p-8 rounded-3xl bg-[#24272B] border border-[#32363C] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#E7A65A]/20 border border-[#E7A65A]/40 flex items-center justify-center font-bold text-lg text-[#E7A65A]">
                  {studio.ownerName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#858A90] tracking-wider block">
                    Verified Host
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#F5F0E8]">
                    {studio.ownerName}
                  </h3>
                  <p className="text-xs text-[#858A90]">{studio.ownerEmail}</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4" />
                <span>Identity Verified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl bg-[#24272B] border border-[#32363C] p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#32363C] pb-4">
                <div>
                  <span className="text-3xl font-bold text-[#E7A65A]">
                    ${studio.hourlyRate}
                  </span>
                  <span className="text-sm text-[#858A90]"> / hour</span>
                </div>
                <span className="text-xs text-[#858A90]">
                  ${studio.securityDeposit} refundable deposit
                </span>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#858A90] uppercase tracking-wider mb-2">
                    Production Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                      className="w-full bg-[#17191C] border border-[#32363C] rounded-xl px-4 py-3 text-sm text-[#F5F0E8] focus:outline-none focus:border-[#E7A65A]/60 [color-scheme:dark] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Time Slots */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#858A90] uppercase tracking-wider mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full bg-[#17191C] border border-[#32363C] rounded-xl px-3 py-3 text-sm text-[#F5F0E8] focus:outline-none focus:border-[#E7A65A]/60 [color-scheme:dark] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#858A90] uppercase tracking-wider mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full bg-[#17191C] border border-[#32363C] rounded-xl px-3 py-3 text-sm text-[#F5F0E8] focus:outline-none focus:border-[#E7A65A]/60 [color-scheme:dark] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 border-t border-[#32363C] space-y-2 text-xs">
                  <div className="flex justify-between text-[#858A90]">
                    <span>${studio.hourlyRate} × {hours} hours</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#858A90]">
                    <span>Refundable Security Deposit</span>
                    <span>${studio.securityDeposit}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#F5F0E8] pt-2 border-t border-[#32363C]">
                    <span>Total Estimated Due</span>
                    <span className="text-[#E7A65A]">${total}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full font-bold shadow-xl"
                >
                  Request Studio Reservation
                </Button>
              </form>

              <div className="flex items-center justify-center gap-2 text-xs text-[#858A90] pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Double-booking prevention active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

