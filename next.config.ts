import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    // Enable optimization for production, disable for development
    unoptimized: process.env.NODE_ENV !== 'production',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
    ],
  },
  // Production optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Turbopack config (Next.js 16 default)
  turbopack: {
    // Empty config - Prisma works fine with Turbopack defaults
  },
  // Webpack config (fallback for webpack builds)
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client');
    }
    return config;
  },
};

export default nextConfig;
