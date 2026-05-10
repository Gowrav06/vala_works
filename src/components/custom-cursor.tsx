"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isInteractive =
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        t.closest("a") ||
        t.closest("button") ||
        t.classList.contains("cursor-pointer");
      setHovering(Boolean(isInteractive));
    };

    const onLeave = () => setVisible(false);

    // Spring physics constants
    const dotSpring = 0.18;
    const ringSpring = 0.12;
    const dotFriction = 0.75;
    const ringFriction = 0.82;

    let dotVelX = 0, dotVelY = 0;
    let ringVelX = 0, ringVelY = 0;

    const tick = () => {
      // Spring physics for dot
      const dotDx = mx - dotX;
      const dotDy = my - dotY;
      dotVelX += dotDx * dotSpring;
      dotVelY += dotDy * dotSpring;
      dotVelX *= dotFriction;
      dotVelY *= dotFriction;
      dotX += dotVelX;
      dotY += dotVelY;

      // Spring physics for ring (more lag)
      const ringDx = mx - ringX;
      const ringDy = my - ringY;
      ringVelX += ringDx * ringSpring;
      ringVelY += ringDy * ringSpring;
      ringVelX *= ringFriction;
      ringVelY *= ringFriction;
      ringX += ringVelX;
      ringY += ringVelY;

      dot.style.transform = `translate(${dotX - 2.5}px, ${dotY - 2.5}px)`;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;

      requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] h-10 w-10 rounded-full border mix-blend-difference transition-all duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        } ${
          hovering 
            ? "scale-[1.8] border-[#e8d5b5]/40" 
            : "scale-100 border-[#f2f0e9]/15"
        }`}
        style={{ 
          willChange: "transform",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] h-[5px] w-[5px] rounded-full bg-[#f2f0e9] transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        } ${hovering ? "opacity-0" : "opacity-100"}`}
        style={{ willChange: "transform" }}
      />
    </>
  );
}
