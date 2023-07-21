/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['mydtszgfgutzorcxndeo.supabase.co'],
  },
};

module.exports = nextConfig;
