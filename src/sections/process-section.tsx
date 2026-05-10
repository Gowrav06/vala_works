"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_STEPS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = stepsRef.current?.querySelectorAll("[data-process-step]");
      if (!steps || steps.length === 0) return;

      // Pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${steps.length * 120}%`,
          pin: true,
          scrub: 0.8,
          snap: {
            snapTo: (progress) => {
              const stepSize = 1 / (steps.length);
              return Math.round(progress / stepSize) * stepSize;
            },
            duration: { min: 0.15, max: 0.4 },
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, { scaleX: self.progress });
            }
          },
        },
      });

      steps.forEach((step, index) => {
        const number = step.querySelector(".step-number");
        const title = step.querySelector(".step-title");
        const desc = step.querySelector(".step-desc");
        const line = step.querySelector(".step-line");

        const stepStart = index;
        const stepEnd = index + 1;

        // Initial state
        gsap.set(step, { opacity: 0, y: 40 });
        if (number) gsap.set(number, { opacity: 0, y: 30, scale: 0.9 });
        if (title) gsap.set(title, { opacity: 0, y: 20 });
        if (desc) gsap.set(desc, { opacity: 0, y: 15 });
        if (line) gsap.set(line, { scaleX: 0 });

        // Enter
        tl.to(step, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, stepStart);
        if (number) tl.to(number, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }, stepStart + 0.05);
        if (title) tl.to(title, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }, stepStart + 0.1);
        if (desc) tl.to(desc, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }, stepStart + 0.15);
        if (line) tl.to(line, { scaleX: 1, duration: 0.3, ease: "power2.inOut" }, stepStart + 0.2);

        // Exit (except last)
        if (index < steps.length - 1) {
          tl.to(step, { opacity: 0, y: -30, duration: 0.25, ease: "power2.in" }, stepEnd - 0.15);
        }
      });

      // Header fade
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#0d0d0d]"
    >
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e8d5b5]/[0.06] to-transparent" />

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8d5b5]/[0.015] blur-[150px]" />
      </div>

      {/* Progress bar at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#f2f0e9]/[0.03]">
        <div ref={progressRef} className="h-full bg-gradient-to-r from-[#c4b094]/60 to-[#e8d5b5]/40 origin-left" style={{ transform: "scaleX(0)" }} />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-20 text-center opacity-0">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-8 bg-[#c4b094]/40" />
            <p className="label-accent">How we work</p>
            <span className="h-px w-8 bg-[#c4b094]/40" />
          </div>
          <h2 className="display-xl text-[#f2f0e9]">
            From idea to{" "}
            <span className="text-[#e8d5b5]">impact.</span>
          </h2>
        </div>

        {/* Steps container */}
        <div ref={stepsRef} className="relative mx-auto max-w-3xl w-full">
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.number}
              data-process-step
              className="absolute inset-0 flex flex-col items-center text-center"
              style={{ position: index === 0 ? "relative" : "absolute" }}
            >
              {/* Large number - editorial treatment */}
              <div className="step-number mb-6 text-[8rem] md:text-[12rem] font-medium leading-none text-[#f2f0e9]/[0.03] select-none tracking-tighter">
                {step.number}
              </div>

              {/* Content */}
              <div className="max-w-lg">
                <h3 className="step-title mb-5 text-3xl md:text-4xl font-medium text-[#f2f0e9] tracking-tight">
                  {step.title}
                </h3>
                <p className="step-desc body-xl mx-auto max-w-md">
                  {step.description}
                </p>
              </div>

              {/* Progress line */}
              <div className="step-line mt-12 h-[1px] w-24 origin-left bg-gradient-to-r from-[#c4b094]/60 to-transparent" />

              {/* Step dots */}
              <div className="mt-10 flex items-center gap-3">
                {PROCESS_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-500 ${
                      i === index
                        ? "h-2 w-8 bg-[#c4b094]/60"
                        : "h-1.5 w-1.5 bg-[#f2f0e9]/[0.08]"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
