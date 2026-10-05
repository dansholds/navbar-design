import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Framer served every URL without a trailing slash and 308-redirected the slashed form; Next.js does the same.
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 810, 1000, 1200, 1440, 1920],
    imageSizes: [167, 320, 427, 440, 600, 660, 853],
  },
};

export default nextConfig;
