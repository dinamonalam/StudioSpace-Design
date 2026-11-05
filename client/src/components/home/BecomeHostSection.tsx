import React from "react";
import Link from "next/link";
import { PlusCircle, ArrowRight, DollarSign, CalendarCheck, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function BecomeHostSection() {
  return (
    <section className="py-24 sm:py-28 bg-[#F4F0E5] dark:bg-[#123C32] border-t border-[#123C32]/10 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#123C32] dark:bg-[#1A4D41] border border-[#123C32]/20 dark:border-white/10 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#C5A66A]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase font-semibold text-[#C5A66A] tracking-widest block mb-2">
              Monetize Production Downtime
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F4F0E5] leading-tight mb-3">
              Have an Underutilized Creative Space?
            </h2>

            <p className="text-xs sm:text-sm text-[#F4F0E5]/80 leading-relaxed mb-6">
              Join hundreds of vetted studio owners who earn consistent revenue each month by sharing their photography lofts, podcast lounges, and sound stages with verified creators.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="flex items-center gap-2 text-xs text-[#F4F0E5]">
                <DollarSign className="w-4 h-4 text-[#C5A66A] shrink-0" />
                <span>Zero Upfront Listing Fees</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#F4F0E5]">
                <CalendarCheck className="w-4 h-4 text-[#C5A66A] shrink-0" />
                <span>100% Calendar Control</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#F4F0E5]">
                <Shield className="w-4 h-4 text-[#C5A66A] shrink-0" />
                <span>$1M Host Protection</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/add-studio">
                <Button variant="primary" size="lg" className="shadow-lg group">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  <span>List Your Studio Now</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-[#C5A66A]"
                >
                  <span>Learn How Hosting Works</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
