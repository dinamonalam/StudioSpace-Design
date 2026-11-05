"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Studio, Booking } from "@/types";
import { getMyStudios, getWishlistIds } from "@/services/studioService";
import { getMyBookings, downloadBookingInvoicePdf } from "@/services/bookingService";
import {
  Building2,
  Calendar,
  PlusCircle,
  TrendingUp,
  Star,
  Compass,
  ArrowRight,
  ShieldCheck,
  Heart,
  DollarSign,
  Clock,
  Download,
  UserCheck,
  Lock,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const [myStudios, myBookings, wishlists] = await Promise.all([
          getMyStudios(),
          getMyBookings(),
          getWishlistIds(),
        ]);
        setStudios(myStudios);
        setBookings(myBookings);
        setWishlistCount(wishlists.length);
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  // Compute live KPI metrics
  const activeBookings = bookings.filter(
    (b) => b.status === "Confirmed" || b.status === "Pending"
  );
  const totalProductionHours = bookings
    .filter((b) => b.status !== "Cancelled")
    .reduce((sum, b) => sum + (b.totalHours || 0), 0);
  const totalVolume = bookings
    .filter((b) => b.status !== "Cancelled")
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#17191C] text-[#F5F0E8] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7A65A]/15 border border-[#E7A65A]/30 text-xs font-semibold text-[#E7A65A] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Control Center</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F0E8]">
                Welcome back, {user?.name || "Creative Director"}
              </h1>
              <p className="text-xs sm:text-sm text-[#858A90] mt-1">
                Monitor your workspace facilities, upcoming production slots, and verified identity.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/add-studio">
                <Button variant="primary" size="md" className="gap-2 font-semibold">
                  <PlusCircle className="w-4 h-4" />
                  <span>List New Studio</span>
                </Button>
              </Link>
              <Link href="/studios">
                <Button variant="secondary" size="md" className="gap-2">
                  <Compass className="w-4 h-4" />
                  <span>Browse Workspaces</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* User Profile & Security Banner */}
          <div className="p-6 rounded-3xl bg-[#24272B] border border-[#32363C] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-[#17191C] border border-[#E7A65A]/30">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User Avatar"}
                    fill
                    sizes="64px"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-serif text-2xl font-bold text-[#E7A65A]">
                    {(user?.name || "U").charAt(0)}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-serif text-xl font-bold text-[#F5F0E8]">
                    {user?.name || "Verified Member"}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1">
                    <UserCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>
                <p className="text-xs text-[#858A90]">{user?.email}</p>
              </div>
            </div>

            {/* Security Tokens & Trust Indicators */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#858A90] border-t md:border-t-0 border-[#32363C] pt-4 md:pt-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#17191C] border border-white/5">
                <Lock className="w-3.5 h-3.5 text-[#E7A65A]" />
                <span>HTTPOnly JWT Active</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#17191C] border border-white/5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>24/7 Creator Shield</span>
              </div>
            </div>
          </div>

          {/* Overview Live KPI Cards */}
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="p-6 rounded-2xl bg-[#24272B] border border-[#32363C] space-y-3 animate-pulse"
                >
                  <div className="h-4 bg-[#32363C] rounded w-1/2" />
                  <div className="h-8 bg-[#17191C] rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Metric 1: My Listings */}
              <div className="p-6 rounded-2xl bg-[#24272B] border border-[#32363C] shadow-lg">
                <div className="flex items-center justify-between text-xs text-[#858A90] mb-2 font-medium">
                  <span>My Active Listings</span>
                  <Building2 className="w-4 h-4 text-[#E7A65A]" />
                </div>
                <div className="font-serif text-3xl font-bold text-[#F5F0E8]">
                  {studios.length}
                </div>
                <span className="text-[11px] text-emerald-400 mt-1 block">
                  {studios.length > 0 ? "Published on Marketplace" : "No studios listed yet"}
                </span>
              </div>

              {/* Metric 2: Active Reservations */}
              <div className="p-6 rounded-2xl bg-[#24272B] border border-[#32363C] shadow-lg">
                <div className="flex items-center justify-between text-xs text-[#858A90] mb-2 font-medium">
                  <span>Active Reservations</span>
                  <Calendar className="w-4 h-4 text-[#E7A65A]" />
                </div>
                <div className="font-serif text-3xl font-bold text-[#F5F0E8]">
                  {activeBookings.length}
                </div>
                <span className="text-[11px] text-[#858A90] mt-1 block">
                  {bookings.filter((b) => b.status === "Confirmed").length} Confirmed,{" "}
                  {bookings.filter((b) => b.status === "Pending").length} Pending
                </span>
              </div>

              {/* Metric 3: Total Production Hours */}
              <div className="p-6 rounded-2xl bg-[#24272B] border border-[#32363C] shadow-lg">
                <div className="flex items-center justify-between text-xs text-[#858A90] mb-2 font-medium">
                  <span>Production Hours</span>
                  <Clock className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="font-serif text-3xl font-bold text-[#F5F0E8]">
                  {totalProductionHours} hrs
                </div>
                <span className="text-[11px] text-[#858A90] mt-1 block">
                  Across all active sessions
                </span>
              </div>

              {/* Metric 4: Total Volume / Financials */}
              <div className="p-6 rounded-2xl bg-[#24272B] border border-[#32363C] shadow-lg">
                <div className="flex items-center justify-between text-xs text-[#858A90] mb-2 font-medium">
                  <span>Booking Volume</span>
                  <DollarSign className="w-4 h-4 text-[#E7A65A]" />
                </div>
                <div className="font-serif text-3xl font-bold text-[#E7A65A]">
                  ${totalVolume}
                </div>
                <span className="text-[11px] text-emerald-400 mt-1 block">
                  {wishlistCount} spaces wishlisted
                </span>
              </div>
            </div>
          )}

          {/* 2-Column Section: Recent Bookings & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left 2 Cols: Recent Reservations Activity */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-[#F5F0E8]">
                  Recent Production Schedule
                </h2>
                <Link
                  href="/my-bookings"
                  className="text-xs text-[#E7A65A] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>View All Bookings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {loading ? (
                <div className="p-8 rounded-2xl bg-[#24272B] border border-[#32363C] flex items-center justify-center text-[#858A90]">
                  <Loader2 className="w-6 h-6 animate-spin text-[#E7A65A]" />
                </div>
              ) : bookings.length > 0 ? (
                <div className="space-y-3">
                  {bookings.slice(0, 4).map((b) => (
                    <div
                      key={b._id}
                      className="p-5 rounded-2xl bg-[#24272B] border border-[#32363C] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/10 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif font-bold text-[#F5F0E8] text-base">
                            {b.studioTitle}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                              b.status === "Confirmed"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                : b.status === "Pending"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                            }`}
                          >
                            {b.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#858A90]">
                          <span>{b.bookingDate}</span>
                          <span>•</span>
                          <span>
                            {b.startTime} – {b.endTime} ({b.totalHours} hrs)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 justify-between sm:justify-end">
                        <span className="font-serif font-bold text-lg text-[#E7A65A]">
                          ${b.totalPrice}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadBookingInvoicePdf(b)}
                          className="gap-1.5 text-xs text-[#858A90] hover:text-[#F5F0E8]"
                          title="Download PDF Invoice"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-[#24272B] border border-[#32363C] text-center">
                  <Calendar className="w-8 h-8 text-[#858A90] mx-auto mb-2 opacity-50" />
                  <p className="text-xs text-[#858A90]">No active reservations yet.</p>
                  <Link href="/studios" className="inline-block mt-3">
                    <Button variant="outline" size="sm">
                      Explore Spaces
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Right Column: Quick Navigation Portals */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#F5F0E8]">
                Quick Portals
              </h2>

              <div className="space-y-3">
                <Link
                  href="/my-listings"
                  className="p-5 rounded-2xl bg-[#24272B] border border-[#32363C] hover:border-[#E7A65A]/50 transition-all group flex items-center justify-between block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E7A65A]/10 border border-[#E7A65A]/20 flex items-center justify-center text-[#E7A65A]">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-sm text-[#F5F0E8] group-hover:text-[#E7A65A] transition-colors">
                        Host Listings
                      </h3>
                      <p className="text-[11px] text-[#858A90]">
                        {studios.length} active spaces
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#858A90] group-hover:text-[#E7A65A] group-hover:translate-x-1 transition-all" />
                </Link>

                <Link
                  href="/my-bookings"
                  className="p-5 rounded-2xl bg-[#24272B] border border-[#32363C] hover:border-[#E7A65A]/50 transition-all group flex items-center justify-between block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-sm text-[#F5F0E8] group-hover:text-[#E7A65A] transition-colors">
                        Production Bookings
                      </h3>
                      <p className="text-[11px] text-[#858A90]">
                        {bookings.length} reservations
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#858A90] group-hover:text-[#E7A65A] group-hover:translate-x-1 transition-all" />
                </Link>

                <Link
                  href="/studios"
                  className="p-5 rounded-2xl bg-[#24272B] border border-[#32363C] hover:border-[#E7A65A]/50 transition-all group flex items-center justify-between block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-sm text-[#F5F0E8] group-hover:text-[#E7A65A] transition-colors">
                        Explore Workspaces
                      </h3>
                      <p className="text-[11px] text-[#858A90]">
                        Discover new studios
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#858A90] group-hover:text-[#E7A65A] group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
