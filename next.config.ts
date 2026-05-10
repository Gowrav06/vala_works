import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export" REMOVED — Vercel handles Next.js natively
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
