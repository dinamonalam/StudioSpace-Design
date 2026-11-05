import React from "react";
import { Search, Clock, Zap, Clapperboard } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Discover Spaces",
    description:
      "Explore curated cyc walls, cinema sound stages, and podcast rooms with verified acoustic and lighting specifications.",
    icon: Search,
  },
  {
    step: "02",
    title: "Select Shoot Hours",
    description:
      "Choose your preferred production date, call times, and wrap hours with transparent hourly pricing and zero hidden fees.",
    icon: Clock,
  },
  {
    step: "03",
    title: "Book Instantly",
    description:
      "Reserve studio slots with immediate confirmation and atomic double-booking protection against conflicting reservations.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Create & Produce",
    description:
      "Arrive on set with access codes, on-site host assistance, and dedicated freight access ready for your crew and cast.",
    icon: Clapperboard,
  },
];

export function WorkflowSection() {
  return (
    <section className="py-24 sm:py-28 bg-[#F4F0E5] dark:bg-[#123C32] border-t border-[#123C32]/10 dark:border-white/10 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold text-[#C5A66A] tracking-widest block mb-2">
            Seamless Reservation Workflow
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#123C32] dark:text-[#F4F0E5] leading-tight mb-3">
            How StudioSpace Powers Your Next Shoot
          </h2>
          <p className="text-xs sm:text-sm text-[#123C32]/70 dark:text-[#F4F0E5]/70 leading-relaxed">
            From discovering sunlit architectural cyc walls to rolling sound on an acoustically treated stage, book your workspace in four frictionless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative p-6 rounded-2xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/12 dark:border-white/10 hover:border-[#C5A66A] transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl font-bold text-[#C5A66A]">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F4F0E5] dark:bg-[#123C32] border border-[#123C32]/10 dark:border-white/10 flex items-center justify-center text-[#C5A66A] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#123C32] dark:text-[#F4F0E5] mb-2 group-hover:text-[#C5A66A] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#123C32]/70 dark:text-[#F4F0E5]/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white dark:bg-[#123C32] border border-[#123C32]/15 dark:border-white/15 text-[#123C32] dark:text-[#F4F0E5] text-center leading-6 text-xs font-bold shadow-sm">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
