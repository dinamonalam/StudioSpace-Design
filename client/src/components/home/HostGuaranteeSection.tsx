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
    <section className="py-24 bg-[#121316] border-t border-[#32363C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Platform Trust Statement */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase font-semibold text-[#E7A65A] tracking-widest block">
              Creator & Host Protections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F0E8] leading-tight">
              Create With Complete Confidence
            </h2>
            <p className="text-base text-[#858A90] leading-relaxed">
              We eliminate the friction and vulnerability of traditional studio leasing. Whether you manage a multi-million-dollar cinema stage or run a boutique daylight loft, our built-in protections keep productions safe.
            </p>

            <ul className="space-y-3 pt-2 text-sm text-[#F5F0E8]">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E7A65A] shrink-0" />
                <span>Automatic security deposit pre-authorizations</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E7A65A] shrink-0" />
                <span>Standardized peer-to-peer production license agreement</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E7A65A] shrink-0" />
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
                  className="p-6 rounded-2xl bg-[#17191C] border border-[#32363C] hover:border-[#E7A65A]/40 transition-all duration-300 shadow-md group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#24272B] border border-white/5 flex items-center justify-center text-[#E7A65A] group-hover:bg-[#E7A65A] group-hover:text-[#17191C] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-semibold text-[#858A90] tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#F5F0E8] mb-2 group-hover:text-[#E7A65A] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#858A90] leading-relaxed">
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

