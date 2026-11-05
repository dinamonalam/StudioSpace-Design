"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Sparkles, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SLIDES = [
  {
    id: 1,
    title: "Apex Sound Stage & Virtual Production Suite",
    category: "Film Stage",
    tagline: "Ultra-Quiet Soundproofing & Camlock 3-Phase Power",
    description:
      "Engineered specifically for feature films, music videos, and commercial shoots. Fully isolated NC-20 acoustic isolation with motorized lighting grid.",
    location: "Culver City Arts Corridor, Los Angeles, CA",
    price: "$195 / hr",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1920&auto=format&fit=crop",
    features: ["NC-20 Soundproofing", "Drive-in Loading Bay", "Motorized Grid"],
  },
  {
    id: 2,
    title: "The Prism Cyclorama & Daylight Loft",
    category: "Photo Studio",
    tagline: "3-Wall Infinity Cyc & North-Facing Architectural Skylights",
    description:
      "A 2,400 sq.ft sunlit photography studio boasting curved seamless cyclorama, double-height ceilings, and full motorized blackout shades.",
    location: "SoHo Arts District, New York, NY",
    price: "$85 / hr",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1920&auto=format&fit=crop",
    features: ["Infinity Cyc Wall", "Profoto Lighting Grid", "Skylights"],
  },
  {
    id: 3,
    title: "Velvet Analog & Dolby Atmos Mixing Suite",
    category: "Music Suite",
    tagline: "Dolby Atmos 7.1.4 Monitoring & Vintage Neve Console",
    description:
      "Premier tracking and spatial audio haven featuring acoustic treatment by Walters-Storyk Design Group, tube microphones, and grand piano.",
    location: "East Nashville Historic District, Nashville, TN",
    price: "$110 / hr",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1920&auto=format&fit=crop",
    features: ["Dolby Atmos 7.1.4", "Steinway Model B", "Neve 1073"],
  },
];

export function HeroSlider() {
  return (
    <section className="relative w-full overflow-hidden bg-[#123C32]">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (_index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        loop={true}
        className="w-full h-[580px] sm:h-[620px] lg:h-[660px]"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image with Dark Emerald Vignette */}
            <div className="absolute inset-0 w-full h-full" style={{ position: "relative" }}>
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center transform scale-105 transition-transform duration-[6000ms] ease-out motion-safe:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#123C32] via-[#123C32]/75 to-[#123C32]/35" />
            </div>

            {/* Slide Content Overlay */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="max-w-2xl space-y-4">
                {/* Badges Bar */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#C5A66A] text-[#123C32]">
                    {slide.category}
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#F4F0E5]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A66A]" />
                    <span>{slide.price}</span>
                  </div>
                  <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#F4F0E5]/80">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A66A]" />
                    <span>{slide.location}</span>
                  </div>
                </div>

                {/* Heading (sized for elegance and legibility) */}
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F0E5] tracking-tight leading-tight">
                  {slide.title}
                </h1>

                {/* Paragraph */}
                <p className="text-xs sm:text-sm text-[#F4F0E5]/85 leading-relaxed">
                  {slide.description}
                </p>

                {/* Micro Features */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {slide.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#F4F0E5]/90 bg-[#123C32]/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A66A]" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>

                {/* Primary & Secondary Action CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <Link href="/studios">
                    <Button variant="primary" size="md" className="gap-2 font-semibold">
                      <span>Explore Production Spaces</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  <Link href="/add-studio">
                    <Button
                      variant="outline"
                      size="md"
                      className="border-white/30 text-white hover:bg-white/10 hover:border-[#C5A66A]"
                    >
                      <span>Host Your Facility</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
