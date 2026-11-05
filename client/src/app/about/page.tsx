import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StudioLogo } from "@/components/ui/StudioLogo";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Sparkles, Film, Compass, HeartHandshake, Award } from "lucide-react";

export const metadata = {
  title: "About Us | StudioSpace",
  description: "Learn more about StudioSpace's mission to empower creative productions worldwide.",
};

const STATS = [
  { label: "Vetted Creative Spaces", value: "350+" },
  { label: "Successful Productions", value: "14,200+" },
  { label: "Verified Crew Members", value: "28,000+" },
  { label: "Host Protection Coverage", value: "$1,000,000" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#17191C] text-[#F5F0E8] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-xs uppercase font-semibold text-[#E7A65A] tracking-widest block mb-3">
            Our Purpose & Vision
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#F5F0E8] leading-tight mb-6">
            Connecting Visionary Creators With Exceptional Spaces
          </h1>
          <p className="text-lg text-[#858A90] leading-relaxed">
            StudioSpace was founded by filmmakers and photographers who grew exhausted with opaque rental brokers, hidden generator fees, and prohibitive commercial lease terms. We built the marketplace we always wished existed.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-[#24272B] border border-[#32363C] text-center"
            >
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#E7A65A] mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-[#858A90] uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-semibold text-[#E7A65A] tracking-widest block mb-2">
              Platform Values
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F0E8]">
              Built for Creators, Run by Creators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#24272B] border border-[#32363C]">
              <div className="w-12 h-12 rounded-xl bg-[#17191C] border border-white/5 flex items-center justify-center text-[#E7A65A] mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F5F0E8] mb-3">
                Uncompromising Quality
              </h3>
              <p className="text-sm text-[#858A90] leading-relaxed">
                Every space listed on StudioSpace is verified for acoustic compliance, electrical headroom, and genuine production readiness before going live.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#24272B] border border-[#32363C]">
              <div className="w-12 h-12 rounded-xl bg-[#17191C] border border-white/5 flex items-center justify-center text-[#E7A65A] mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F5F0E8] mb-3">
                Radical Transparency
              </h3>
              <p className="text-sm text-[#858A90] leading-relaxed">
                No hidden disposal fees, no surprise generator surcharges, and no guesswork. What you see is exactly what your production pays.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#24272B] border border-[#32363C]">
              <div className="w-12 h-12 rounded-xl bg-[#17191C] border border-white/5 flex items-center justify-center text-[#E7A65A] mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F5F0E8] mb-3">
                Protected Communities
              </h3>
              <p className="text-sm text-[#858A90] leading-relaxed">
                We back every host with $1,000,000 in comprehensive property and liability protection and vet all creators for peaceful production sessions.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-12 rounded-3xl bg-gradient-to-r from-[#24272B] to-[#1E2125] border border-[#32363C]">
          <h2 className="font-serif text-3xl font-bold text-[#F5F0E8] mb-4">
            Ready to Discover Your Next Production Base?
          </h2>
          <p className="text-base text-[#858A90] max-w-xl mx-auto mb-8">
            Explore hundreds of verified creative facilities or monetize your studio during open calendar slots.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/studios">
              <Button variant="primary" size="lg">
                <Compass className="w-5 h-5 mr-2" />
                Explore Studios
              </Button>
            </Link>
            <Link href="/add-studio">
              <Button variant="secondary" size="lg">
                Host a Studio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

