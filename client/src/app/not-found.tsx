import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StudioLogo } from "@/components/ui/StudioLogo";
import { Home, Compass, CameraOff } from "lucide-react";

export const metadata = {
  title: "404 - Studio Not Found | StudioSpace",
  description: "The creative space or production page you requested could not be located.",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-[#17191C] text-[#F5F0E8]">
      <div className="max-w-md mx-auto space-y-6">
        {/* Creative Studio 404 Visual Icon */}
        <div className="relative mx-auto w-24 h-24 rounded-3xl bg-gradient-to-br from-[#24272B] to-[#17191C] border border-[#32363C] flex items-center justify-center text-[#E7A65A] shadow-2xl">
          <CameraOff className="w-12 h-12 stroke-[1.5]" />
          <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[#E7A65A] text-[#17191C] text-[10px] font-bold uppercase tracking-wider">
            Cut!
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-semibold text-[#E7A65A] tracking-widest block">
            Error 404 — Scene Missing
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F0E8]">
            This Studio Slot Doesn't Exist
          </h1>
          <p className="text-sm text-[#858A90] leading-relaxed">
            The workspace URL you followed may have moved, wrapped production, or was temporarily unlisted by its host.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full gap-2">
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </Button>
          </Link>
          <Link href="/studios" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="w-full gap-2">
              <Compass className="w-4 h-4" />
              <span>Explore All Studios</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

