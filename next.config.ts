import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, // disables vercel images optimization. Please you can choose a different one like cloudinary if you want to
  },
  swcMinify: true,
  eslint: {
     // Allow production builds to successfully complete even when there is ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allows production builds to successfully complete even when there is TypeScript errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
