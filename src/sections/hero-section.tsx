"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        delay: 0.2,
        defaults: { ease: "power3.out" }
      });

      // Label fades in with subtle drift
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9 }
      );

      // Headline character stagger with slight rotation for organic feel
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".word");
        tl.fromTo(
          words,
          { opacity: 0, y: 60, rotateX: -40, skewY: 2 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            skewY: 0,
            duration: 1.1,
            stagger: 0.08,
          },
          "-=0.5"
        );
      }

      // Subheadline with softer entrance
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 24, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2 },
        "-=0.7"
      );

      // CTA buttons with spring-like stagger
      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 20, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(1.4)" },
        "-=0.8"
      );

      // Visual card with depth
      tl.fromTo(
        visualRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power2.out" },
        "-=1.1"
      );

      // Decorative element
      tl.fromTo(
        decorRef.current,
        { opacity: 0, scale: 0.8, rotation: -10 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.6, ease: "power2.out" },
        "-=1"
      );

      // Organic floating animation for visual
      gsap.to(visualRef.current, {
        y: -8,
        rotation: 0.4,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Decorative drift
      gsap.to(decorRef.current, {
        y: -12,
        x: 6,
        rotation: 3,
        duration: 7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = ["Your", "business", "deserves", "more", "than", "posts."];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0a] px-6 pt-28 pb-20 md:px-12 md:pt-32 lg:px-20 lg:pt-36"
    >
      {/* Warm ambient light - asymmetric placement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] h-[60vh] w-[55vh] rounded-full bg-[#e8d5b5]/[0.04] blur-[160px]" />
        <div className="absolute bottom-[10%] left-[-10%] h-[40vh] w-[40vh] rounded-full bg-[#c4b094]/[0.03] blur-[120px]" />
      </div>

      {/* Asymmetric layout - 55/45 split */}
      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-20 lg:flex-row lg:items-start lg:gap-12 lg:pt-12">
        {/* Left: Typography - slightly larger share */}
        <div className="flex flex-[1.15] flex-col lg:pr-8">
          <div
            ref={labelRef}
            className="mb-10 inline-flex w-fit items-center gap-3 opacity-0"
          >
            <span className="h-px w-8 bg-[#c4b094]/60" />
            <span className="label-accent">
              AI Marketing Agency
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="display-hero max-w-[720px] text-[#f2f0e9]"
            style={{ perspective: "1000px" }}
          >
            {headlineWords.map((word, index) => (
              <span
                key={index}
                className="word inline-block mr-[0.25em] opacity-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            ref={subRef}
            className="body-xl mt-10 max-w-[460px] opacity-0"
          >
            We build marketing systems that bring real leads, automate follow-ups, 
            and grow local businesses across Andhra Pradesh & Telangana.
          </p>

          <div ref={ctaRef} className="mt-12 flex flex-wrap items-center gap-5 opacity-0">
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full bg-[#f2f0e9] px-8 py-4 text-sm font-medium text-[#0a0a0a] transition-all duration-500 hover:shadow-[0_0_50px_rgba(242,240,233,0.08)]"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Start a conversation
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </span>
            </a>
            <a
              href="#services"
              className="group flex items-center gap-2.5 text-sm font-medium text-[#8a8580] transition-colors duration-300 hover:text-[#f2f0e9]"
            >
              <span className="h-10 w-10 rounded-full border border-[#3d3a37] flex items-center justify-center transition-colors duration-300 group-hover:border-[#5c5854]">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </span>
              Explore services
            </a>
          </div>

          {/* Trust indicator - more human, less generic */}
          <div className="mt-20 flex items-center gap-5">
            <div className="flex -space-x-2.5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0a0a0a]"
                  style={{
                    background: `linear-gradient(135deg, hsl(${35 + i * 8}, 25%, ${22 + i * 6}%) 0%, hsl(${40 + i * 5}, 20%, ${18 + i * 5}%) 100%)`,
                  }}
                >
                  <span className="text-[10px] font-semibold text-[#c4b094]/70">{String.fromCharCode(65 + i)}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-[#8a8580]">
                Trusted by growing brands
              </p>
              <p className="text-xs text-[#5c5854]">
                across Andhra Pradesh & Telangana
              </p>
            </div>
          </div>
        </div>

        {/* Right: Visual - offset upward, asymmetric */}
        <div className="relative flex flex-1 items-start justify-center lg:justify-end lg:pt-8">
          {/* Decorative floating element behind */}
          <div
            ref={decorRef}
            className="absolute -top-4 -right-4 lg:right-8 h-32 w-32 rounded-full border border-[#e8d5b5]/[0.08] opacity-0"
          />

          <div
            ref={visualRef}
            className="relative w-full max-w-[440px] opacity-0"
          >
            {/* Main card with texture */}
            <div className="relative overflow-hidden rounded-2xl border border-[#f2f0e9]/[0.06] bg-[#111111] p-7 shadow-depth texture-paper">
              {/* Subtle warm accent at top */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c4b094]/30 to-transparent" />

              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="label mb-1.5">Campaign Performance</p>
                  <p className="text-2xl font-medium text-[#f2f0e9]">Meta Ads</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8d5b5]/[0.06] border border-[#e8d5b5]/[0.08]">
                  <svg className="h-5 w-5 text-[#c4b094]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>
                </div>
              </div>

              {/* Metrics - offset grid */}
              <div className="mb-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#f2f0e9]/[0.02] border border-[#f2f0e9]/[0.04] p-5">
                  <p className="label mb-2">ROAS</p>
                  <p className="text-3xl font-medium text-[#f2f0e9] tracking-tight">4.2x</p>
                  <p className="mt-1.5 text-xs text-emerald-500/80 font-medium">+28% this month</p>
                </div>
                <div className="rounded-xl bg-[#f2f0e9]/[0.02] border border-[#f2f0e9]/[0.04] p-5">
                  <p className="label mb-2">Leads</p>
                  <p className="text-3xl font-medium text-[#f2f0e9] tracking-tight">2.4K</p>
                  <p className="mt-1.5 text-xs text-emerald-500/80 font-medium">+156 vs last</p>
                </div>
              </div>

              {/* Chart */}
              <div className="relative h-28 overflow-hidden rounded-xl bg-[#f2f0e9]/[0.01] border border-[#f2f0e9]/[0.03]">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#c4b094" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#c4b094" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,100 C40,85 80,60 120,65 C160,70 200,30 240,35 C280,40 320,15 360,20 C380,22 400,10 400,10 L400,120 L0,120 Z"
                    fill="url(#chartGrad)"
                  />
                  <path
                    d="M0,100 C40,85 80,60 120,65 C160,70 200,30 240,35 C280,40 320,15 360,20 C380,22 400,10 400,10"
                    fill="none"
                    stroke="#c4b094"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Secondary floating element - offset and rotated slightly */}
            <div className="absolute -bottom-5 -left-5 rounded-xl border border-[#f2f0e9]/[0.06] bg-[#141414] p-4 shadow-physical texture-paper">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8d5b5]/[0.06] border border-[#e8d5b5]/[0.08]">
                  <svg className="h-4 w-4 text-[#c4b094]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#f2f0e9]">WhatsApp Auto</p>
                  <p className="text-xs text-[#5c5854]">1,847 replies sent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
