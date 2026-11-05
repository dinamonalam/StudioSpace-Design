import React from "react";
import Link from "next/link";
import { WorkflowSection } from "@/components/home/WorkflowSection";
import { HostGuaranteeSection } from "@/components/home/HostGuaranteeSection";
import { Button } from "@/components/ui/Button";
import { PlusCircle, Search, Calendar, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "How It Works | StudioSpace",
  description: "Learn how creators book workspaces and hosts monetize their production spaces.",
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#17191C] text-[#F5F0E8] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold text-[#E7A65A] tracking-widest block mb-2">
            The Production Blueprint
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#F5F0E8] leading-tight mb-4">
            How StudioSpace Works
          </h1>
          <p className="text-base text-[#858A90] leading-relaxed">
            Whether you are booking a corner cyclorama for a commercial shoot or listing your film stage during off-hours, StudioSpace makes creative workspace sharing transparent and secure.
          </p>
        </div>

        {/* Dual Roles: Creators vs Hosts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* For Creators */}
          <div className="p-8 rounded-3xl bg-[#24272B] border border-[#32363C] relative overflow-hidden">
            <span className="text-xs uppercase font-bold text-[#E7A65A] tracking-wider block mb-2">
              For Filmmakers & Creators
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#F5F0E8] mb-4">
              Book Production Spaces in Minutes
            </h2>
            <ul className="space-y-3.5 text-sm text-[#858A90] mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E7A65A] shrink-0 mt-0.5" />
                <span><strong className="text-[#F5F0E8]">Filtered Discovery:</strong> Filter by cyc wall dimensions, soundproofing isolation ratings, and power camlocks.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E7A65A] shrink-0 mt-0.5" />
                <span><strong className="text-[#F5F0E8]">Instant Slot Holding:</strong> Select shoot hours and lock in reservations with zero collision risk.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E7A65A] shrink-0 mt-0.5" />
                <span><strong className="text-[#F5F0E8]">Clear Overtime Terms:</strong> Guaranteed transparent hourly rates with no surprise clean-up fees.</span>
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
          <div className="p-8 rounded-3xl bg-[#24272B] border border-[#32363C] relative overflow-hidden">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider block mb-2">
              For Studio Owners & Facility Managers
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#F5F0E8] mb-4">
              Monetize Unused Downtime
            </h2>
            <ul className="space-y-3.5 text-sm text-[#858A90] mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-[#F5F0E8]">$1M Host Protection:</strong> Comprehensive coverage for physical structures and equipment.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-[#F5F0E8]">Calendar Control:</strong> Set minimum call hours, buffer times, and black-out dates easily.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-[#F5F0E8]">Fast Direct Payouts:</strong> Automated earnings transfer directly to your bank upon wrap.</span>
              </li>
            </ul>
            <Link href="/add-studio">
              <Button variant="secondary" size="md" className="border-emerald-500/30 text-emerald-300 hover:border-emerald-500/50">
                <PlusCircle className="w-4 h-4 mr-2" />
                List Your Workspace
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Steps Section */}
        <WorkflowSection />

        {/* Host Guarantee */}
        <HostGuaranteeSection />
      </div>
    </div>
  );
}

