/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",   // limit for request body (default 1MB)
      allowedOrigins: ["*"],  // allow all origins (or replace with your domain)
    },
  },
  env: {
    RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
  },
  images: {
    domains: [
      "d205bpvrqc9yn1.cloudfront.net", // for exercise API
      "img.spoonacular.com",           // for Spoonacular recipes
    ],
  },
};

module.exports = nextConfig;
