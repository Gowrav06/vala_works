"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/navbar";
import ScrollProgress from "@/components/scroll-progress";
import CustomCursor from "@/components/custom-cursor";
import HeroSection from "@/sections/hero-section";
import MarqueeSection from "@/sections/marquee-section";
import ServicesSection from "@/sections/services-section";
import WhySection from "@/sections/why-section";
import AutomationSection from "@/sections/automation-section";
import ProcessSection from "@/sections/process-section";
import PortfolioSection from "@/sections/portfolio-section";
import FaqSection from "@/sections/faq-section";
import CtaSection from "@/sections/cta-section";
import FooterSection from "@/sections/footer-section";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="grain">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <ServicesSection />
        <WhySection />
        <AutomationSection />
        <ProcessSection />
        <PortfolioSection />
        <FaqSection />
        <CtaSection />
      </main>
      <FooterSection />
    </div>
  );
}
