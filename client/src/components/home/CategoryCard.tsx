"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface CategoryCardProps {
  id?: string;
  name: string;
  slug?: string;
  description: string;
  imageUrl?: string;
  image?: string;
  count?: number | string;
  icon?: string;
}

export function CategoryCard({
  name,
  description,
  imageUrl,
  image,
  count,
}: CategoryCardProps) {
  const displayImage = imageUrl || image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop";

  return (
    <Link
      href={`/studios?category=${encodeURIComponent(name)}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/12 dark:border-white/10 p-5 shadow-sm hover:shadow-xl hover:border-[#C5A66A] transition-all duration-300"
    >
      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 bg-[#F4F0E5] dark:bg-[#123C32]" style={{ position: "relative" }}>
        <Image
          src={displayImage}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {count !== undefined && (
          <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[10px] font-semibold text-[#F4F0E5] border border-white/10">
            {typeof count === "number" ? `${count}+ Available` : `${count} Available`}
          </span>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-serif text-base font-bold text-[#123C32] dark:text-[#F4F0E5] group-hover:text-[#C5A66A] transition-colors">
            {name}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-[#123C32]/40 dark:text-[#F4F0E5]/40 group-hover:text-[#C5A66A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        <p className="text-xs text-[#123C32]/70 dark:text-[#F4F0E5]/70 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}
