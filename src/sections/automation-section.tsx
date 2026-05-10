"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AUTOMATION_STEPS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function AutomationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }

      // Animate connecting line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Animate steps
      const steps = stepsRef.current?.querySelectorAll("[data-auto-step]");
      if (steps) {
        gsap.fromTo(
          steps,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.15,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
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

      <div className="absolute left-0 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#e8d5b5]/[0.015] blur-[150px]" />

      <div className="relative mx-auto max-w-[1400px]">
        <div ref={headerRef} className="mb-24 text-center opacity-0">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-8 bg-[#c4b094]/40" />
            <p className="label-accent">Automation</p>
            <span className="h-px w-8 bg-[#c4b094]/40" />
          </div>
          <h2 className="display-xl text-[#f2f0e9]">
            Your business.{" "}
            <span className="text-[#e8d5b5]">Running itself.</span>
          </h2>
          <p className="body-xl mx-auto mt-8 max-w-xl">
            From lead capture to conversion. Fully automated. Fully tracked. Fully yours.
          </p>
        </div>

        {/* Workflow */}
        <div ref={stepsRef} className="relative mx-auto max-w-5xl">
          {/* Connecting line - desktop only */}
          <div className="absolute top-[52px] left-[10%] right-[10%] hidden h-[1px] md:block">
            <div
              ref={lineRef}
              className="h-full w-full origin-left bg-gradient-to-r from-[#c4b094]/30 via-[#e8d5b5]/20 to-[#c4b094]/30"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
            {AUTOMATION_STEPS.map((step, index) => (
              <div
                key={step.title}
                data-auto-step
                className="group relative opacity-0"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Number circle */}
                  <div className="relative z-10 mb-5 flex h-[104px] w-[104px] items-center justify-center rounded-full border border-[#f2f0e9]/[0.05] bg-[#111111] transition-all duration-500 group-hover:border-[#c4b094]/20 group-hover:bg-[#141414]">
                    <span className="text-2xl font-medium text-[#f2f0e9] tracking-tight">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mb-2 text-base font-medium text-[#f2f0e9] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#5c5854]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature tags */}
        <div className="mt-20 flex flex-wrap justify-center gap-2.5">
          {[
            "Auto Replies",
            "Lead Capture",
            "Appointment Booking",
            "CRM Sync",
            "WhatsApp Reminders",
            "AI Chatbot",
          ].map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-[#f2f0e9]/[0.04] bg-[#f2f0e9]/[0.015] px-5 py-2 text-sm text-[#5c5854] transition-all duration-300 hover:border-[#c4b094]/15 hover:text-[#8a8580]"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
