import React from "react";
import Link from "next/link";
import { HeroSlider } from "@/components/home/HeroSlider";
import { QuickSearchBar } from "@/components/home/QuickSearchBar";
import { CategoryCard } from "@/components/home/CategoryCard";
import { StudioCard } from "@/components/studios/StudioCard";
import { WorkflowSection } from "@/components/home/WorkflowSection";
import { HostGuaranteeSection } from "@/components/home/HostGuaranteeSection";
import { BecomeHostSection } from "@/components/home/BecomeHostSection";
import { FEATURED_STUDIOS, STUDIO_CATEGORIES } from "@/data/mockStudios";
import { getStudios } from "@/services/studioService";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export default async function HomePage() {
  const featuredStudios = await getStudios({ limit: 6 });

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F0E5] dark:bg-[#123C32] text-[#123C32] dark:text-[#F4F0E5] overflow-hidden transition-colors">
      {/* 1. Hero Slider with Swiper.js */}
      <HeroSlider />

      {/* 2. Interactive Quick Search Filter Bar */}
      <QuickSearchBar />

      {/* 3. Browse by Studio Categories Section */}
      <section className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold text-[#C5A66A] tracking-wider block mb-2">
            Curated Workspace Categories
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#123C32] dark:text-[#F4F0E5] leading-snug">
            Spaces Engineered for Every Discipline
          </h2>
          <p className="text-sm text-[#123C32]/75 dark:text-[#F4F0E5]/75 mt-2 max-w-xl mx-auto">
            From daylight photography lofts to Dolby Atmos mixing studios, find the perfect space for your production.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {STUDIO_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/studios">
            <Button variant="ghost" size="sm" className="text-[#123C32] dark:text-[#C5A66A] hover:text-[#C5A66A] group">
              <span>View All Spaces</span>
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 4. Featured Studios Section (6 Top-Rated Spaces) */}
      <section className="py-24 sm:py-28 bg-white/70 dark:bg-[#1A4D41]/30 border-y border-[#123C32]/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A66A]/15 border border-[#C5A66A]/30 text-xs font-semibold text-[#123C32] dark:text-[#C5A66A] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A66A]" />
              <span>Premier Handpicked Studios</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#123C32] dark:text-[#F4F0E5] leading-snug">
              Featured Creative Workspaces
            </h2>
            <p className="text-sm text-[#123C32]/75 dark:text-[#F4F0E5]/75 mt-2 max-w-xl mx-auto">
              Highest-rated sound stages, photography daylight lofts, and Dolby Atmos audio environments across top creative hubs.
            </p>
          </div>

          {/* Grid of 6 Featured Studio Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStudios.slice(0, 6).map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/studios">
              <Button variant="outline" size="md" className="group">
                <span>Explore All Studios</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Extra Section 1: How Booking Works (4 Steps) */}
      <WorkflowSection />

      {/* 6. Extra Section 2: Host Guarantee & Creator Support */}
      <HostGuaranteeSection />

      {/* 7. Become a Host CTA Section */}
      <BecomeHostSection />
    </div>
  );
}
