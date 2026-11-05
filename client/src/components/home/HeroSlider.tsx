"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { ArrowRight, Sparkles, Compass, PlusCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const SLIDES = [
  {
    id: 1,
    tag: "Cinema & Sound Stages",
    headline: "Where Cinematic Vision Meets Production Scale",
    subtext:
      "Access acoustically certified sound stages, motorized lighting grids, and camlock power distribution directly from production studio hosts.",
    ctaText: "Explore Sound Stages",
    href: "/studios?category=Film%20Stage",
    imageUrl:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    tag: "High-End Photo Cyc Walls",
    headline: "Architectural Daylight Lofts & Seamless Cycloramas",
    subtext:
      "Book pristine corner cyc walls, Profoto strobe ecosystems, and north-facing skylight lofts tailored for editorial fashion and campaign productions.",
    ctaText: "Explore Photo Lofts",
    href: "/studios?category=Photo%20Studio",
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    tag: "Dolby Atmos & Audio Lounges",
    headline: "Pure Sonic Mastery & Broadcast-Ready Lounges",
    subtext:
      "Produce multi-mic 4K podcasts and mix in Dolby Atmos acoustic environments equipped with pristine outboard analog preamps and vocal booths.",
    ctaText: "Explore Audio Suites",
    href: "/studios?category=Music%20Suite",
    imageUrl:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2000&auto=format&fit=crop",
  },
];

export function HeroSlider() {
  return (
    <section className="relative w-full h-[620px] md:h-[720px] lg:h-[780px] bg-[#17191C] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !w-3 !h-3 !bg-white/40 !opacity-100 [&.swiper-pagination-bullet-active]:!bg-[#E7A65A] [&.swiper-pagination-bullet-active]:!w-8 !rounded-full !transition-all !duration-300"></span>`;
          },
        }}
        loop={true}
        className="w-full h-full"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full select-none" style={{ position: "relative" }}>
            {/* Background Image with Dark Vignette Overlays */}
            <div className="absolute inset-0 z-0 overflow-hidden" style={{ position: "absolute" }}>
              <Image
                src={slide.imageUrl}
                alt={slide.headline}
                fill
                priority={slide.id === 1}
                sizes="100vw"
                className="object-cover object-center scale-105"
              />
              {/* Gradient Overlays for optimal readability and mood */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#17191C] via-[#17191C]/75 to-[#17191C]/40 z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#17191C] via-[#17191C]/80 to-transparent z-10" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 max-w-7xl mx-auto h-full px-6 md:px-12 flex flex-col justify-center">
              <div className="max-w-3xl">
                <Badge
                  variant="primary"
                  className="mb-5 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase border-[#E7A65A]/40 bg-[#E7A65A]/15 text-[#E7A65A]"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-2" />
                  {slide.tag}
                </Badge>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F0E8] leading-[1.12] mb-6 drop-shadow-md">
                  {slide.headline}
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-[#F5F0E8]/85 max-w-2xl mb-8 leading-relaxed font-normal">
                  {slide.subtext}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link href={slide.href}>
                    <Button variant="primary" size="lg" className="shadow-xl group">
                      <Compass className="w-5 h-5 mr-2" />
                      {slide.ctaText}
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>

                  <Link href="/add-studio">
                    <Button variant="secondary" size="lg" className="backdrop-blur-md bg-[#24272B]/80 hover:bg-[#24272B]">
                      <PlusCircle className="w-5 h-5 mr-2 text-[#E7A65A]" />
                      Host Your Space
                    </Button>
                  </Link>
                </div>

                {/* Trust guarantee pill */}
                <div className="mt-8 flex items-center gap-3 text-xs sm:text-sm text-[#858A90]">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>$1M Host Protection</span>
                  </div>
                  <span>•</span>
                  <span>Instant Slot Reservation</span>
                  <span>•</span>
                  <span>Zero Hidden Studio Fees</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

