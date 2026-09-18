import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Locale paths are built from a runtime value (`/${locale}/menu`), which the
  // typed-routes checker cannot narrow to a literal route.
  typedRoutes: false,

  images: {
    // The shipped photographs are already the derivatives that
    // `scripts/optimize-images.js` produces — nothing in `public/images/`
    // exceeds 400 KB. Cloudflare Workers has no sharp binary behind
    // `/_next/image`, so the optimizer is off and the files are served
    // straight from the edge. `next/image` still handles the layout,
    // aspect ratio and lazy loading.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    qualities: [75, 88, 92],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },

  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
