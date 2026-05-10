"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/constants";
import {
  Globe, Search, Target, Share2, Film, Users, Bot, MessageCircle, Database, Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Globe, Search, Target, Share2, Film, Users, Bot, MessageCircle, Database, Zap,
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal with blur
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50, filter: "blur(6px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: titleRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }

      // Cards stagger with spring-like easing
      const cards = gridRef.current?.querySelectorAll("[data-service-card]");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", stagger: {
              each: 0.08,
              from: "start",
            },
            scrollTrigger: { trigger: gridRef.current, start: "top 75%", toggleActions: "play none none none" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Asymmetric bento grid sizing
  const getGridClass = (index: number) => {
    if (index === 0) return "md:col-span-2 md:row-span-2";
    if (index === 3) return "md:col-span-2";
    return "";
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-[#0a0a0a] px-6 py-32 md:px-12 lg:px-20"
    >
      {/* Warm ambient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e8d5b5]/[0.08] to-transparent" />

      <div className="mx-auto max-w-[1400px]">
        <div ref={titleRef} className="mb-24 max-w-2xl opacity-0">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-[#c4b094]/40" />
            <p className="label-accent">What we do</p>
          </div>
          <h2 className="display-xl text-[#f2f0e9]">
            Everything your business needs to{" "}
            <span className="text-[#e8d5b5]">grow.</span>
          </h2>
          <p className="body-xl mt-8 max-w-lg">
            A complete marketing stack built for local businesses. No outsourcing. 
            No gaps. Just thoughtful work that brings results.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon] || Zap;
            const isLarge = index === 0 || index === 3;

            return (
              <div
                key={service.title}
                data-service-card
                className={`group relative overflow-hidden rounded-2xl border border-[#f2f0e9]/[0.04] bg-[#111111] p-7 opacity-0 transition-all duration-500 hover:border-[#f2f0e9]/[0.1] hover:shadow-physical-hover ${getGridClass(index)}`}
                style={{
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {/* Subtle warm gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e8d5b5]/[0.02] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                {/* Texture overlay */}
                <div className="absolute inset-0 texture-paper opacity-50" />

                <div className="relative flex h-full flex-col">
                  <div className={`mb-6 flex items-center justify-center rounded-xl bg-[#f2f0e9]/[0.02] border border-[#f2f0e9]/[0.04] transition-all duration-500 group-hover:bg-[#e8d5b5]/[0.04] group-hover:border-[#e8d5b5]/[0.08] ${isLarge ? "h-14 w-14" : "h-12 w-12"}`}>
                    <Icon className={`text-[#8a8580] transition-all duration-500 group-hover:text-[#c4b094] ${isLarge ? "h-7 w-7" : "h-6 w-6"}`} strokeWidth={1.5} />
                  </div>

                  <h3 className={`mb-3 font-medium text-[#f2f0e9] tracking-tight ${isLarge ? "text-xl" : "text-lg"}`}>
                    {service.title}
                  </h3>
                  <p className={`mt-auto leading-relaxed transition-colors duration-500 group-hover:text-[#8a8580] ${isLarge ? "text-[0.9375rem] max-w-sm text-[#5c5854]" : "text-sm text-[#5c5854]"}`}>
                    {service.description}
                  </p>

                  {/* Corner accent - warm, subtle */}
                  <div className="absolute top-0 right-0 h-24 w-24 translate-x-12 translate-y-[-48px] rounded-full bg-[#e8d5b5]/[0.03] blur-2xl transition-all duration-700 group-hover:translate-x-8 group-hover:bg-[#e8d5b5]/[0.05]" />

                  {/* Bottom accent line on hover */}
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#c4b094]/0 to-transparent transition-all duration-500 group-hover:via-[#c4b094]/30" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
