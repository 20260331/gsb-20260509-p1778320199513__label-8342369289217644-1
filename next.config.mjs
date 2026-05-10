/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: [],
  },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
