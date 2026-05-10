import { BRAND } from "@/lib/constants";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    description:
      "AI-powered websites, ads, automation, SEO & lead generation for local businesses in Andhra Pradesh & Telangana.",
    url: "https://valaworks.in",
    telephone: BRAND.phone,
    email: BRAND.email,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Andhra Pradesh & Telangana",
      addressCountry: "IN",
    },
    sameAs: [BRAND.instagram],
    offers: {
      "@type": "Offer",
      description: "Digital marketing and AI automation services",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
