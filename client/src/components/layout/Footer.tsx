"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StudioLogo } from "@/components/ui/StudioLogo";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Send, Mail, ShieldCheck } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      toast.success("Thank you for subscribing to StudioSpace Creative Dispatch!");
    }, 600);
  };

  return (
    <footer className="w-full bg-[#121316] border-t border-[#32363C] text-[#F5F0E8] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#32363C]">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <StudioLogo size="md" />
            <p className="text-sm text-[#858A90] leading-relaxed max-w-sm">
              StudioSpace is the premier peer-to-peer workspace marketplace engineered for filmmakers, photographers, podcasters, and sonic creators to discover and book vetted production facilities.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E7A65A]">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Creator Community & Host Guarantee</span>
            </div>

            {/* Social Icons including the NEW X LOGO */}
            <div className="flex items-center gap-3 pt-2">
              {/* Official New X Logo SVG */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StudioSpace on X (formerly Twitter)"
                className="w-9 h-9 rounded-xl bg-[#24272B] border border-[#32363C] flex items-center justify-center text-[#858A90] hover:text-[#F5F0E8] hover:border-[#E7A65A]/50 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram SVG */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StudioSpace on Instagram"
                className="w-9 h-9 rounded-xl bg-[#24272B] border border-[#32363C] flex items-center justify-center text-[#858A90] hover:text-[#F5F0E8] hover:border-[#E7A65A]/50 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 rounded-[4px]" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* LinkedIn SVG */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StudioSpace on LinkedIn"
                className="w-9 h-9 rounded-xl bg-[#24272B] border border-[#32363C] flex items-center justify-center text-[#858A90] hover:text-[#F5F0E8] hover:border-[#E7A65A]/50 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                </svg>
              </a>

              {/* GitHub SVG */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StudioSpace GitHub Source"
                className="w-9 h-9 rounded-xl bg-[#24272B] border border-[#32363C] flex items-center justify-center text-[#858A90] hover:text-[#F5F0E8] hover:border-[#E7A65A]/50 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-semibold text-[#F5F0E8] tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#858A90]">
              <li>
                <Link href="/" className="hover:text-[#E7A65A] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/studios" className="hover:text-[#E7A65A] transition-colors">
                  Explore Studios
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#E7A65A] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#E7A65A] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/add-studio" className="hover:text-[#E7A65A] transition-colors">
                  Host Your Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-semibold text-[#F5F0E8] tracking-wider">
              Popular Spaces
            </h4>
            <ul className="space-y-2 text-sm text-[#858A90]">
              <li>
                <Link
                  href="/studios?category=Photo%20Studio"
                  className="hover:text-[#E7A65A] transition-colors"
                >
                  Cyclorama Photo Studios
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=Film%20Stage"
                  className="hover:text-[#E7A65A] transition-colors"
                >
                  Soundproof Film Stages
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=Podcast%20Room"
                  className="hover:text-[#E7A65A] transition-colors"
                >
                  4-Mic 4K Podcast Lounges
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=Music%20Suite"
                  className="hover:text-[#E7A65A] transition-colors"
                >
                  Dolby Atmos Music Suites
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=Art%20Workshop"
                  className="hover:text-[#E7A65A] transition-colors"
                >
                  Daylight Ceramic & Art Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Input */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-semibold text-[#F5F0E8] tracking-wider">
              Creator Dispatch
            </h4>
            <p className="text-xs text-[#858A90] leading-relaxed">
              Curated studio drops, special host rates, and production equipment insights delivered monthly.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#858A90]" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#17191C] border border-[#32363C] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#F5F0E8] placeholder:text-[#858A90] focus:outline-none focus:border-[#E7A65A]/60 transition-colors"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isSubmitting}
                className="w-full text-xs font-semibold gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Subscribe to Dispatch</span>
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#858A90] gap-4">
          <p>&copy; 2026 StudioSpace Platform. Engineered for Creative Excellence. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#E7A65A] transition-colors">
              Host Terms
            </Link>
            <Link href="/about" className="hover:text-[#E7A65A] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-[#E7A65A] transition-colors">
              Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
