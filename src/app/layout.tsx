import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/json-ld";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vala Works | AI Marketing Agency",
  description:
    "AI-powered websites, ads, automation, SEO & lead generation for local businesses in Andhra Pradesh & Telangana.",
  keywords: [
    "AI marketing agency",
    "digital marketing",
    "SEO",
    "Google Ads",
    "Meta Ads",
    "WhatsApp automation",
    "CRM automation",
    "lead generation",
    "Andhra Pradesh",
    "Telangana",
  ],
  authors: [{ name: "Vala Works" }],
  creator: "Vala Works",
  metadataBase: new URL("https://valaworks.in"),
  openGraph: {
    title: "Vala Works | AI Marketing Agency",
    description:
      "AI-powered websites, ads, automation, SEO & lead generation for local businesses in Andhra Pradesh & Telangana.",
    url: "https://valaworks.in",
    siteName: "Vala Works",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vala Works - AI Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vala Works | AI Marketing Agency",
    description:
      "AI-powered websites, ads, automation, SEO & lead generation for local businesses in Andhra Pradesh & Telangana.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth antialiased`}
    >
      <body className="grain min-h-full bg-[#0a0a0a] text-[#f2f0e9] font-[family-name:var(--font-inter)] selection:bg-[#e8d5b5]/20 selection:text-white">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
