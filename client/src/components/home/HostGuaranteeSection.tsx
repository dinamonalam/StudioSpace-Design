import React from "react";
import { ShieldCheck, UserCheck, Wrench, Headphones, CheckCircle2 } from "lucide-react";

const ASSURANCES = [
  {
    title: "$1,000,000 Host Liability Protection",
    description:
      "Every confirmed studio reservation includes comprehensive general liability protection for studio premises and physical fixtures.",
    icon: ShieldCheck,
    badge: "Full Coverage",
  },
  {
    title: "100% Vetted Creator Profiles",
    description:
      "All directors, photographers, and audio engineers undergo identity verification and production credit checks before booking spaces.",
    icon: UserCheck,
    badge: "Verified Community",
  },
  {
    title: "Gear Safety & Facility Checks",
    description:
      "Detailed lighting gear condition logs and high-voltage power checks completed prior to crew arrival to prevent downtime.",
    icon: Wrench,
    badge: "Zero Downtime",
  },
  {
    title: "24/7 Priority Production Support",
    description:
      "Dedicated creative coordinators on standby via phone and real-time chat for lock-out assistance, overtime extensions, and equipment help.",
    icon: Headphones,
    badge: "Round-the-Clock",
  },
];

export function HostGuaranteeSection() {
  return (
    <section className="py-24 sm:py-28 bg-[#EBE5D6]/40 dark:bg-[#0E3028] border-t border-[#123C32]/10 dark:border-white/10 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Platform Trust Statement */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs uppercase font-semibold text-[#C5A66A] tracking-widest block">
              Creator & Host Protections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#123C32] dark:text-[#F4F0E5] leading-tight">
              Create With Complete Confidence
            </h2>
            <p className="text-xs sm:text-sm text-[#123C32]/75 dark:text-[#F4F0E5]/75 leading-relaxed">
              We eliminate the friction and vulnerability of traditional studio leasing. Whether you manage a cinema stage or run a daylight loft, our built-in protections keep productions safe.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-[#123C32] dark:text-[#F4F0E5] font-medium">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C5A66A] shrink-0" />
                <span>Automatic security deposit pre-authorizations</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C5A66A] shrink-0" />
                <span>Standardized peer-to-peer production license agreement</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C5A66A] shrink-0" />
                <span>Transparent hourly overtime and equipment rates</span>
              </li>
            </ul>
          </div>

          {/* Right Column: 4 Guarantee Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ASSURANCES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/12 dark:border-white/10 hover:border-[#C5A66A] transition-all duration-300 shadow-sm hover:shadow-xl group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F4F0E5] dark:bg-[#123C32] border border-[#123C32]/10 dark:border-white/10 flex items-center justify-center text-[#C5A66A] group-hover:bg-[#C5A66A] group-hover:text-[#123C32] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold text-[#123C32] dark:text-[#C5A66A] bg-[#C5A66A]/15 px-2.5 py-0.5 rounded-full border border-[#C5A66A]/30">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#123C32] dark:text-[#F4F0E5] mb-2 group-hover:text-[#C5A66A] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#123C32]/70 dark:text-[#F4F0E5]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
