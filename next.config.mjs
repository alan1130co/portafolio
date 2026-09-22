/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  agentRules: false,
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
