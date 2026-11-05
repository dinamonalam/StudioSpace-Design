"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import {
  Building2,
  Calendar,
  PlusCircle,
  TrendingUp,
  Star,
  Compass,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#17191C] text-[#F5F0E8] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase font-semibold text-[#E7A65A] tracking-widest block mb-1">
              Creator & Host Control Center
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F0E8]">
              Welcome, {user?.name || "Creative Director"}
            </h1>
            <p className="text-xs sm:text-sm text-[#858A90] mt-1">
              Monitor your studio listings, upcoming reserved production slots, and activity.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/add-studio">
              <Button variant="primary" size="md" className="gap-2 font-semibold">
                <PlusCircle className="w-4 h-4" />
                <span>Add Studio</span>
              </Button>
            </Link>
            <Link href="/studios">
              <Button variant="secondary" size="md" className="gap-2">
                <Compass className="w-4 h-4" />
                <span>Explore</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="p-6 rounded-2xl bg-[#24272B] border border-[#32363C]">
            <div className="flex items-center justify-between text-xs text-[#858A90] mb-2 font-medium">
              <span>Active Listings</span>
              <Building2 className="w-4 h-4 text-[#E7A65A]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#F5F0E8]">3</div>
            <span className="text-[10px] text-emerald-400 mt-1 block">
              All spaces verified
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#24272B] border border-[#32363C]">
            <div className="flex items-center justify-between text-xs text-[#858A90] mb-2 font-medium">
              <span>Upcoming Bookings</span>
              <Calendar className="w-4 h-4 text-[#E7A65A]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#F5F0E8]">2</div>
            <span className="text-[10px] text-[#858A90] mt-1 block">
              1 Pending, 1 Confirmed
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#24272B] border border-[#32363C]">
            <div className="flex items-center justify-between text-xs text-[#858A90] mb-2 font-medium">
              <span>Production Hours</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#F5F0E8]">36 hrs</div>
            <span className="text-[10px] text-[#858A90] mt-1 block">
              This month
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#24272B] border border-[#32363C]">
            <div className="flex items-center justify-between text-xs text-[#858A90] mb-2 font-medium">
              <span>Host Rating</span>
              <Star className="w-4 h-4 fill-[#E7A65A] text-[#E7A65A]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#F5F0E8]">4.96</div>
            <span className="text-[10px] text-emerald-400 mt-1 block">
              Top Host Status
            </span>
          </div>
        </div>

        {/* Quick Action Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/my-listings"
            className="p-8 rounded-3xl bg-[#24272B] border border-[#32363C] hover:border-[#E7A65A]/50 transition-all duration-300 group flex justify-between items-center"
          >
            <div>
              <Building2 className="w-8 h-8 text-[#E7A65A] mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-2xl font-bold text-[#F5F0E8] mb-1">
                Manage Studio Listings
              </h3>
              <p className="text-xs text-[#858A90]">
                Update hourly pricing, amenities, and delete or edit existing spaces.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-[#E7A65A] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href="/my-bookings"
            className="p-8 rounded-3xl bg-[#24272B] border border-[#32363C] hover:border-[#E7A65A]/50 transition-all duration-300 group flex justify-between items-center"
          >
            <div>
              <Calendar className="w-8 h-8 text-[#E7A65A] mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-serif text-2xl font-bold text-[#F5F0E8] mb-1">
                Manage Reservations
              </h3>
              <p className="text-xs text-[#858A90]">
                Inspect shoot dates, cancel pending slots, and download PDF receipts.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-[#E7A65A] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>
      </div>
    </ProtectedRoute>
  );
}

