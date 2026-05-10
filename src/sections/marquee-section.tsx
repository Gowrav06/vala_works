"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INDUSTRIES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeSection() {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (track1Ref.current) {
        gsap.to(track1Ref.current, {
          xPercent: -50,
          duration: 35,
          ease: "none",
          repeat: -1,
        });
      }
      if (track2Ref.current) {
        gsap.to(track2Ref.current, {
          xPercent: 50,
          duration: 40,
          ease: "none",
          repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const renderItems = (reverse = false) => {
    const items = reverse ? [...INDUSTRIES].reverse() : INDUSTRIES;
    return (
      <>
        {[...items, ...items, ...items, ...items].map((industry, index) => (
          <div
            key={`${industry}-${index}`}
            className="flex shrink-0 items-center gap-4 px-6"
          >
            <span className="h-1 w-1 rounded-full bg-[#c4b094]/60" />
            <span className="whitespace-nowrap text-base font-medium text-[#5c5854] transition-colors duration-300 hover:text-[#8a8580]">
              {industry}
            </span>
          </div>
        ))}
      </>
    );
  };

  return (
    <section className="relative overflow-hidden border-y border-[#f2f0e9]/[0.03] bg-[#0a0a0a] py-10">
      <div className="mb-5 flex justify-center">
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-[#c4b094]/30" />
          <p className="label-accent">Industries we serve</p>
          <span className="h-px w-6 bg-[#c4b094]/30" />
        </div>
      </div>

      <div className="mb-3 overflow-hidden">
        <div ref={track1Ref} className="flex w-max">
          {renderItems()}
        </div>
      </div>

      <div className="overflow-hidden opacity-30">
        <div ref={track2Ref} className="flex w-max" style={{ transform: "translateX(-50%)" }}>
          {renderItems(true)}
        </div>
      </div>
    </section>
  );
}
