import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages — produces an `out/` directory
  // with pre-rendered HTML/CSS/JS that can be served as static files.
  output: "export",
  // Disable server-side image optimization (not available in static export).
  // Images are already optimized as WebP locally (see scripts/).
  images: {
    unoptimized: true,
  },
  // Add trailing slashes for cleaner URLs on static hosts.
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
