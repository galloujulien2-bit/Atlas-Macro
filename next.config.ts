import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No "output: standalone" — Render uses standard "next build" + "next start"
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  // Disable the Next.js Dev Tools badge ("N" circle in bottom-left corner)
  devIndicators: false,
};

export default nextConfig;
