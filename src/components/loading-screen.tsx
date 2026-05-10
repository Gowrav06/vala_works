"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    tl.fromTo(
      ".loader-char",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.05 }
    )
      .fromTo(
        ".loader-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
        "-=0.2"
      )
      .to(".loader-line", {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.6,
        ease: "power2.in",
      })
      .to(".loader-overlay", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      }, "-=0.3");

    return () => { tl.kill(); };
  }, []);

  if (!visible) return null;

  return (
    <div className="loader-overlay fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]">
      <div className="flex overflow-hidden">
        {"Vala Works".split("").map((char, i) => (
          <span
            key={i}
            className="loader-char inline-block text-4xl font-bold tracking-tight text-[#F5F5F5] md:text-6xl"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      <div className="mt-8 h-[1px] w-32 overflow-hidden bg-white/[0.06]">
        <div className="loader-line h-full w-full origin-left bg-gradient-to-r from-[#7C3AED] to-[#00D4FF]" />
      </div>
    </div>
  );
}
