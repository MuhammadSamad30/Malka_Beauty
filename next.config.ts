import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Replace 'domains' with 'remotePatterns'
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
  
  // Enable React strict mode for better development
  reactStrictMode: true,
  
  // Disable x-powered-by header for security
  poweredByHeader: false,
  
  // Compress responses
  compress: true,
  
  // Configure redirects if needed
  async redirects() {
    return [
      // Example redirect (can be removed or modified)
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // }
    ];
  },
  
  // Configure rewrites if needed
  async rewrites() {
    return [
      // Example rewrite (can be removed or modified)
      // {
      //   source: '/api/:path*',
      //   destination: 'https://api.example.com/:path*',
      // }
    ];
  },
  
  // Environment variables that will be available in the browser
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://malkabeauty.com',
  },
  
  // Webpack configuration (for when using --webpack flag)
  webpack: (config, { isServer }) => {
    // Add any custom webpack configuration here
    if (!isServer) {
      // Client-side only configuration
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
