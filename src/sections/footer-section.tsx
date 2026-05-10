import { BRAND, NAV_LINKS } from "@/lib/constants";

export default function FooterSection() {
  return (
    <footer className="relative border-t border-[#f2f0e9]/[0.03] bg-[#0a0a0a] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 grid grid-cols-1 gap-14 md:grid-cols-12">
          {/* Brand - larger share */}
          <div className="md:col-span-5">
            <h3 className="text-xl font-medium tracking-tight text-[#f2f0e9]">
              {BRAND.name}
            </h3>
            <p className="mt-5 max-w-xs leading-relaxed text-[#5c5854] body-md">
              AI-powered marketing systems for local businesses in Andhra Pradesh & Telangana. 
              Built to bring customers, not just clicks.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-[#5c5854]">
              <svg className="h-4 w-4 text-[#3d3a37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {BRAND.location}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="label mb-7">Navigate</h4>
            <ul className="flex flex-col gap-3.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#5c5854] transition-colors duration-300 hover:text-[#f2f0e9]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="label mb-7">Services</h4>
            <ul className="flex flex-col gap-3.5">
              {["Websites", "SEO", "Ads", "WhatsApp Automation", "AI Chatbots"].map((s) => (
                <li key={s}>
                  <span className="text-sm text-[#5c5854]">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="label mb-7">Contact</h4>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a href={`tel:${BRAND.phone}`} className="text-sm text-[#5c5854] transition-colors duration-300 hover:text-[#f2f0e9]">
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="text-sm text-[#5c5854] transition-colors duration-300 hover:text-[#f2f0e9]">
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-[#5c5854] transition-colors duration-300 hover:text-[#f2f0e9]">
                  @vala_works
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom - more refined */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#f2f0e9]/[0.03] pt-8 md:flex-row">
          <p className="text-xs text-[#3d3a37]">
            &copy; {new Date().getFullYear()} {BRAND.name}
          </p>
          <p className="text-xs text-[#3d3a37]">
            Built with care in India
          </p>
        </div>
      </div>
    </footer>
  );
}
