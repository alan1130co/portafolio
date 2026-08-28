/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  agentRules: false,
  images: {
    // The only next/image usage today is the Hero photo, which never
    // renders wider than 320px (desktop) / ~78vw (mobile, capped at 767px
    // viewports). The framework default deviceSizes tops out at 3840 "just
    // in case", which forces the fallback <img src> to the largest variant
    // and wastes on-demand-optimizer cycles generating sizes nothing ever
    // requests. Capped to what this box can actually need.
    deviceSizes: [384, 480, 640, 750, 828, 960],
  },
};

export default nextConfig;
