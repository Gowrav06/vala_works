"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const decorLeftRef = useRef<HTMLDivElement>(null);
  const decorRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const children = contentRef.current.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Decorative elements drift
      if (decorLeftRef.current) {
        gsap.fromTo(
          decorLeftRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 1.2, ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" },
          }
        );
        gsap.to(decorLeftRef.current, {
          y: -10,
          rotation: 2,
          duration: 6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      if (decorRightRef.current) {
        gsap.fromTo(
          decorRightRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1, x: 0, duration: 1.2, ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" },
          }
        );
        gsap.to(decorRightRef.current, {
          y: 10,
          rotation: -2,
          duration: 7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0a] px-6 py-32 md:px-12 lg:px-20"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e8d5b5]/[0.06] to-transparent" />

      {/* Ambient glow - warm, asymmetric */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[400px] w-[400px] rounded-full bg-[#e8d5b5]/[0.03] blur-[150px]" />
      </div>

      {/* Decorative elements */}
      <div
        ref={decorLeftRef}
        className="absolute top-20 left-10 md:left-20 w-24 h-24 rounded-full border border-[#e8d5b5]/[0.06] opacity-0"
      />
      <div
        ref={decorRightRef}
        className="absolute bottom-20 right-10 md:right-20 w-16 h-16 rounded-full border border-[#e8d5b5]/[0.06] opacity-0"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <div ref={contentRef}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-10 bg-[#c4b094]/40" />
            <p className="label-accent">Ready when you are</p>
            <span className="h-px w-10 bg-[#c4b094]/40" />
          </div>

          <h2 className="display-xl text-[#f2f0e9]">
            Let&apos;s build something{" "}
            <span className="text-[#e8d5b5]">meaningful.</span>
          </h2>
          <p className="body-xl mx-auto mt-8 max-w-lg">
            A conversation about your business. No pitch decks. No pressure. 
            Just honest advice on what could work for you.
          </p>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-5">
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full bg-[#f2f0e9] px-10 py-5 text-sm font-medium text-[#0a0a0a] transition-all duration-500 hover:shadow-[0_0_50px_rgba(242,240,233,0.06)]"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Book a free call
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </span>
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 text-sm text-[#5c5854]">
            <a href={`tel:${BRAND.phone}`} className="transition-colors duration-300 hover:text-[#8a8580]">
              {BRAND.phone}
            </a>
            <span className="h-1 w-1 rounded-full bg-[#3d3a37]" />
            <a href={`mailto:${BRAND.email}`} className="transition-colors duration-300 hover:text-[#8a8580]">
              {BRAND.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
