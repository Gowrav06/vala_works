"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHY_US } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }

      const items = sectionRef.current?.querySelectorAll("[data-why-item]");
      if (items) {
        items.forEach((item, index) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0, duration: 1, ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 82%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0d0d0d] px-6 py-32 md:px-12 lg:px-20"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e8d5b5]/[0.06] to-transparent" />

      <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#e8d5b5]/[0.015] blur-[150px]" />

      <div className="relative mx-auto max-w-[1400px]">
        <div ref={headerRef} className="mb-24 flex flex-col gap-8 md:flex-row md:items-end md:justify-between opacity-0">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-[#c4b094]/40" />
              <p className="label-accent">Why us</p>
            </div>
            <h2 className="display-xl max-w-xl text-[#f2f0e9]">
              Built with care.<br />
              <span className="text-[#e8d5b5]">Built for results.</span>
            </h2>
          </div>
          <p className="body-xl max-w-sm md:text-right">
            No vanity metrics. Every strategy, every campaign, every automation is designed to move your business forward.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[#f2f0e9]/[0.03] md:grid-cols-2">
          {WHY_US.map((item, index) => (
            <div
              key={item.title}
              data-why-item
              className="group relative bg-[#0d0d0d] p-10 opacity-0 transition-colors duration-500 hover:bg-[#111111]"
            >
              {/* Large background number */}
              <span className="absolute right-8 top-6 text-[7rem] font-medium leading-none text-[#f2f0e9]/[0.02] transition-colors duration-500 group-hover:text-[#f2f0e9]/[0.04] select-none">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <div className="mb-6 h-px w-10 bg-gradient-to-r from-[#c4b094]/50 to-transparent" />
                <h3 className="mb-4 text-xl font-medium text-[#f2f0e9] tracking-tight">
                  {item.title}
                </h3>
                <p className="max-w-sm leading-relaxed text-[#5c5854] transition-colors duration-500 group-hover:text-[#8a8580]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
