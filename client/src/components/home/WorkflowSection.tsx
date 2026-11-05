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
    <section className="py-24 bg-[#17191C] border-t border-[#32363C] relative overflow-hidden">
      {/* Decorative ambient spotlight glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E7A65A]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold text-[#E7A65A] tracking-widest block mb-2">
            Seamless Reservation Workflow
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F0E8] leading-tight mb-4">
            How StudioSpace Powers Your Next Shoot
          </h2>
          <p className="text-base text-[#858A90] leading-relaxed">
            From discovering sunlit architectural cyc walls to rolling sound on an acoustically treated stage, book your workspace in four frictionless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative p-6 rounded-2xl bg-[#24272B] border border-[#32363C] hover:border-[#E7A65A]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl font-bold text-[#E7A65A]/50 group-hover:text-[#E7A65A] transition-colors">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#17191C] border border-white/5 flex items-center justify-center text-[#E7A65A] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#F5F0E8] mb-2.5 group-hover:text-[#E7A65A] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#858A90] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Subtitle indicator arrow for non-last items */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-[#17191C] border border-[#32363C] text-[#858A90] text-center leading-6 text-xs font-bold">
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

