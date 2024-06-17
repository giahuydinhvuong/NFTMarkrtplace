/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["turquoise-given-kiwi-99.mypinata.cloud"],
    // formats: ["image/webp"],
  },
};


module.exports = nextConfig
