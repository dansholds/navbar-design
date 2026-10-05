import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Framer served every URL without a trailing slash and 308-redirected the slashed form; Next.js does the same.
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Only the widths the layouts actually request, so each image is transformed a handful of times, not dozens.
    deviceSizes: [390, 810, 1000, 1200, 1440, 1920],
    imageSizes: [167, 220, 420, 440, 660, 853],
    // Sources never change in place (a new navbar is a new file), so optimised variants can be cached for a year.
    // Screenshots tolerate lower quality at small sizes: 60 for ticker tiles, 70 for cards, 75 for hero/share images.
    qualities: [60, 70, 75],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
