"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, BRAND } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-[#0a0a0a]/70 backdrop-blur-2xl border-b border-[#f2f0e9]/[0.03]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
        <a href="#" className="text-lg font-medium tracking-tight text-[#f2f0e9]">
          {BRAND.name}
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors duration-300 ${
                activeSection === link.href.replace("#", "")
                  ? "text-[#f2f0e9]"
                  : "text-[#5c5854] hover:text-[#8a8580]"
              }`}
            >
              {link.label}
              {activeSection === link.href.replace("#", "") && (
                <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-[#c4b094]/60 to-transparent" />
              )}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#f2f0e9] px-6 py-2.5 text-sm font-medium text-[#0a0a0a] transition-all duration-300 hover:bg-white"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`h-px w-6 bg-[#f2f0e9] transition-all duration-300 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-[#f2f0e9] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-[#f2f0e9] transition-all duration-300 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-[#f2f0e9]/[0.03] bg-[#0a0a0a]/95 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-3 text-lg font-medium text-[#8a8580] transition-colors hover:text-[#f2f0e9]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 rounded-full bg-[#f2f0e9] px-6 py-3 text-center text-sm font-medium text-[#0a0a0a]"
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
