import React from "react";
import Link from "next/link";
import { PlusCircle, ArrowRight, DollarSign, CalendarCheck, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function BecomeHostSection() {
  return (
    <section className="py-20 bg-[#17191C] border-t border-[#32363C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#24272B] via-[#2A2E35] to-[#1E2125] border border-[#32363C] p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#E7A65A]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase font-semibold text-[#E7A65A] tracking-widest block mb-3">
              Monetize Production Downtime
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F0E8] leading-tight mb-4">
              Have an Underutilized Creative Space?
            </h2>

            <p className="text-base text-[#858A90] leading-relaxed mb-8">
              Join hundreds of vetted studio owners who earn thousands each month by sharing their photography lofts, podcast lounges, and cinema stages with verified creators.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2.5 text-xs text-[#F5F0E8]">
                <DollarSign className="w-4 h-4 text-[#E7A65A] shrink-0" />
                <span>Zero Upfront Listing Fees</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#F5F0E8]">
                <CalendarCheck className="w-4 h-4 text-[#E7A65A] shrink-0" />
                <span>100% Calendar Control</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#F5F0E8]">
                <Shield className="w-4 h-4 text-[#E7A65A] shrink-0" />
                <span>$1M Host Protection</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/add-studio">
                <Button variant="primary" size="lg" className="shadow-lg group">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  List Your Studio Now
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="secondary" size="lg">
                  Learn How Hosting Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

