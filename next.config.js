/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  env: {
    RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
  },
  images: {
    domains: ['d205bpvrqc9yn1.cloudfront.net'],
  },
};

module.exports = nextConfig;
