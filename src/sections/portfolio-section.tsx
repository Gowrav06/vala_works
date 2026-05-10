"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SHOWCASE_ITEMS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioSection() {
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

      const items = sectionRef.current?.querySelectorAll("[data-showcase-item]");
      if (items) {
        items.forEach((item, index) => {
          const image = item.querySelector(".showcase-image");
          const content = item.querySelector(".showcase-content");

          // Cinematic reveal with clip-path
          gsap.fromTo(
            item,
            { opacity: 0, y: 60 },
            {
              opacity: 1, y: 0, duration: 1, ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );

          // Image scale reveal
          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.1, opacity: 0 },
              {
                scale: 1, opacity: 1, duration: 1.2, ease: "power2.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          // Content stagger
          if (content) {
            gsap.fromTo(
              content,
              { opacity: 0, y: 20 },
              {
                opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 75%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          // Subtle parallax on scroll
          if (image) {
            gsap.to(image, {
              y: -20,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Warm cinematic color grades
  const colorGrades = [
    { bg: "#1a1612", accent: "#c4b094" },
    { bg: "#121416", accent: "#8a9a8a" },
    { bg: "#16121a", accent: "#a090a0" },
    { bg: "#1a1812", accent: "#b0a080" },
    { bg: "#12181a", accent: "#809a9a" },
  ];

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative bg-[#0a0a0a] px-6 py-32 md:px-12 lg:px-20"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e8d5b5]/[0.06] to-transparent" />

      <div className="mx-auto max-w-[1400px]">
        <div ref={headerRef} className="mb-24 flex flex-col gap-8 md:flex-row md:items-end md:justify-between opacity-0">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-[#c4b094]/40" />
              <p className="label-accent">Selected work</p>
            </div>
            <h2 className="display-xl text-[#f2f0e9]">
              Designs that{" "}
              <span className="text-[#e8d5b5]">convert.</span>
            </h2>
          </div>
          <p className="body-xl max-w-sm md:text-right">
            Crafted for businesses across industries. Each one built with purpose.
          </p>
        </div>

        {/* Asymmetric masonry grid with cinematic reveals */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          {SHOWCASE_ITEMS.map((item, index) => {
            const isLarge = index === 0;
            const grade = colorGrades[index];

            return (
              <div
                key={item.title}
                data-showcase-item
                className={`group relative overflow-hidden rounded-2xl opacity-0 ${
                  isLarge ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                {/* Background with cinematic grade */}
                <div
                  className={`showcase-image relative flex items-end overflow-hidden ${isLarge ? "aspect-[4/3] md:aspect-auto md:h-full min-h-[400px] md:min-h-[540px]" : "aspect-[4/3] min-h-[260px]"}`}
                  style={{
                    background: `linear-gradient(160deg, ${grade.bg} 0%, #0a0a0a 100%)`,
                  }}
                >
                  {/* Abstract shapes for visual interest */}
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `radial-gradient(ellipse 80% 60% at 70% 30%, ${grade.accent}08 0%, transparent 60%)`,
                    }}
                  />

                  {/* Geometric accent */}
                  <div 
                    className="absolute top-8 right-8 w-20 h-20 rounded-full border border-[#f2f0e9]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ transform: "rotate(15deg)" }}
                  />

                  {/* Large number watermark - editorial */}
                  <span className={`absolute right-5 top-5 font-medium leading-none text-[#f2f0e9]/[0.03] select-none ${isLarge ? "text-[8rem]" : "text-[5rem]"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Content overlay - cinematic fade from bottom */}
                  <div className="showcase-content relative w-full bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-px w-6 bg-[#c4b094]/50" />
                      <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#5c5854]">
                        {item.category}
                      </span>
                    </div>
                    <h3 className={`mb-2 font-medium text-[#f2f0e9] tracking-tight ${isLarge ? "text-2xl md:text-3xl" : "text-xl"}`}>
                      {item.title}
                    </h3>
                    <p className={`text-[#5c5854] transition-colors duration-500 group-hover:text-[#8a8580] ${isLarge ? "text-base max-w-sm" : "text-sm"}`}>
                      {item.description}
                    </p>
                  </div>

                  {/* Hover overlay - warm tint */}
                  <div className="absolute inset-0 bg-[#e8d5b5]/0 transition-all duration-700 group-hover:bg-[#e8d5b5]/[0.02]" />

                  {/* Border highlight on hover */}
                  <div className="absolute inset-0 rounded-2xl border border-[#f2f0e9]/0 transition-all duration-500 group-hover:border-[#f2f0e9]/[0.06]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
