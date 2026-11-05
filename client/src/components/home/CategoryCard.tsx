"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Camera, Clapperboard, Mic, Music, Palette, ArrowRight } from "lucide-react";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  count: string;
  icon: string;
  image: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Camera: <Camera className="w-5 h-5" />,
  Clapperboard: <Clapperboard className="w-5 h-5" />,
  Mic: <Mic className="w-5 h-5" />,
  Music: <Music className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
};

export function CategoryCard({
  id,
  name,
  description,
  count,
  icon,
  image,
}: CategoryCardProps) {
  return (
    <Link
      href={`/studios?category=${encodeURIComponent(id)}`}
      className="group relative flex flex-col justify-end h-80 rounded-2xl overflow-hidden border border-[#32363C] hover:border-[#E7A65A]/60 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-black/50"
      style={{ position: "relative" }}
    >
      {/* Background Image with Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ position: "absolute" }}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay for high-contrast text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#17191C] via-[#17191C]/70 to-[#17191C]/20 group-hover:via-[#17191C]/60 transition-all duration-300" />
      </div>

      {/* Floating Category Icon & Count badge */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-[#17191C]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#E7A65A] group-hover:bg-[#E7A65A] group-hover:text-[#17191C] transition-colors duration-300 shadow-md">
          {ICON_MAP[icon] || <Camera className="w-5 h-5" />}
        </div>
        <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#F5F0E8] border border-white/10">
          {count}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 p-5">
        <h3 className="font-serif text-xl font-bold text-[#F5F0E8] mb-1.5 group-hover:text-[#E7A65A] transition-colors flex items-center justify-between">
          <span>{name}</span>
          <ArrowRight className="w-4 h-4 text-[#E7A65A] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </h3>
        <p className="text-xs text-[#858A90] line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}

