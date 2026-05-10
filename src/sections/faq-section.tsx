"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FAQS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll("[data-faq-item]");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.06,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index: number) => {
    const content = contentRefs.current[index];
    const icon = iconRefs.current[index];
    const isOpening = openIndex !== index;

    // Close previous with spring physics
    if (openIndex !== null && openIndex !== index) {
      const prevContent = contentRefs.current[openIndex];
      const prevIcon = iconRefs.current[openIndex];
      if (prevContent) {
        gsap.to(prevContent, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
      if (prevIcon) {
        gsap.to(prevIcon, {
          rotation: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
        });
      }
    }

    // Toggle current with spring
    if (content) {
      if (isOpening) {
        gsap.to(content, {
          height: "auto",
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    }

    if (icon) {
      gsap.to(icon, {
        rotation: isOpening ? 45 : 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    }

    setOpenIndex(isOpening ? index : null);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative bg-[#0d0d0d] px-6 py-32 md:px-12 lg:px-20"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e8d5b5]/[0.06] to-transparent" />

      <div className="mx-auto max-w-3xl">
        <div className="mb-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-8 bg-[#c4b094]/40" />
            <p className="label-accent">Common questions</p>
            <span className="h-px w-8 bg-[#c4b094]/40" />
          </div>
          <h2 className="display-xl text-[#f2f0e9]">
            Questions?{" "}
            <span className="text-[#e8d5b5]">Answered.</span>
          </h2>
        </div>

        <div className="flex flex-col">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              data-faq-item
              className="opacity-0 border-b border-[#f2f0e9]/[0.04] first:border-t"
            >
              <button
                className="flex w-full items-center justify-between py-7 text-left transition-colors duration-300 hover:bg-[#f2f0e9]/[0.01] group"
                onClick={() => toggleFaq(index)}
                aria-expanded={openIndex === index}
              >
                <span className="pr-8 text-base md:text-lg font-medium text-[#f2f0e9] tracking-tight group-hover:text-[#e8d5b5] transition-colors duration-300">
                  {faq.question}
                </span>
                <span 
                  ref={(el) => { iconRefs.current[index] = el; }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f2f0e9]/[0.06] transition-all duration-300 group-hover:border-[#c4b094]/30"
                >
                  <svg
                    className="h-3.5 w-3.5 text-[#8a8580]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
              <div
                ref={(el) => { contentRefs.current[index] = el; }}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="pb-7 pr-16 text-[#8a8580] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
