npm install -g vercel
vercel
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ['cdn.simpleicons.org', 'meolf.com'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

export default nextConfig;