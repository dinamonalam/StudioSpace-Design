import React from "react";
import Link from "next/link";
import { WorkflowSection } from "@/components/home/WorkflowSection";
import { HostGuaranteeSection } from "@/components/home/HostGuaranteeSection";
import { Button } from "@/components/ui/Button";
import { PlusCircle, Search, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "How It Works | StudioSpace",
  description: "Learn how creators book workspaces and hosts monetize their production spaces.",
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#F4F0E5] dark:bg-[#123C32] text-[#123C32] dark:text-[#F4F0E5] py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold text-[#C5A66A] tracking-wider block mb-2">
            The Production Blueprint
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#123C32] dark:text-[#F4F0E5] leading-tight mb-4">
            How StudioSpace Works
          </h1>
          <p className="text-sm sm:text-base text-[#123C32]/75 dark:text-[#F4F0E5]/75 leading-relaxed">
            Whether you are booking a corner cyclorama for a commercial shoot or listing your film stage during off-hours, StudioSpace makes creative workspace sharing transparent and secure.
          </p>
        </div>

        {/* Dual Roles: Creators vs Hosts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* For Creators */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/10 dark:border-white/10 shadow-sm relative overflow-hidden">
            <span className="text-xs uppercase font-bold text-[#C5A66A] tracking-wider block mb-2">
              For Filmmakers & Creators
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#123C32] dark:text-[#F4F0E5] mb-4">
              Book Production Spaces in Minutes
            </h2>
            <ul className="space-y-3.5 text-sm text-[#123C32]/75 dark:text-[#F4F0E5]/75 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C5A66A] shrink-0 mt-0.5" />
                <span><strong className="text-[#123C32] dark:text-[#F4F0E5]">Filtered Discovery:</strong> Filter by cyc wall dimensions, soundproofing isolation ratings, and power camlocks.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C5A66A] shrink-0 mt-0.5" />
                <span><strong className="text-[#123C32] dark:text-[#F4F0E5]">Instant Slot Holding:</strong> Select shoot hours and lock in reservations with zero collision risk.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C5A66A] shrink-0 mt-0.5" />
                <span><strong className="text-[#123C32] dark:text-[#F4F0E5]">Clear Overtime Terms:</strong> Guaranteed transparent hourly rates with no surprise clean-up fees.</span>
              </li>
            </ul>
            <Link href="/studios">
              <Button variant="primary" size="md">
                <Search className="w-4 h-4 mr-2" />
                Explore Available Studios
              </Button>
            </Link>
          </div>

          {/* For Hosts */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/10 dark:border-white/10 shadow-sm relative overflow-hidden">
            <span className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider block mb-2">
              For Studio Owners & Facility Managers
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#123C32] dark:text-[#F4F0E5] mb-4">
              Monetize Unused Downtime
            </h2>
            <ul className="space-y-3.5 text-sm text-[#123C32]/75 dark:text-[#F4F0E5]/75 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-[#123C32] dark:text-[#F4F0E5]">$1M Host Protection:</strong> Comprehensive coverage for physical structures and equipment.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-[#123C32] dark:text-[#F4F0E5]">Calendar Control:</strong> Set minimum call hours, buffer times, and black-out dates easily.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-[#123C32] dark:text-[#F4F0E5]">Verified Creator Access:</strong> All booking members are verified with valid payment and identity tokens.</span>
              </li>
            </ul>
            <Link href="/add-studio">
              <Button variant="secondary" size="md">
                <PlusCircle className="w-4 h-4 mr-2" />
                Host Your Creative Space
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Embedded 4-Step Booking Workflow */}
      <WorkflowSection />

      {/* Embedded Host Guarantee */}
      <HostGuaranteeSection />
    </div>
  );
}
