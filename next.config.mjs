/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  agentRules: false,
  experimental: {
    inlineCss: true,
  },
  images: {
    // The only next/image usage today is the Hero photo, which never
    // renders wider than 320px (desktop) / ~78vw (mobile, capped at 767px
    // viewports). The framework default deviceSizes tops out at 3840 "just
    // in case", which forces the fallback <img src> to the largest variant
    // and wastes on-demand-optimizer cycles generating sizes nothing ever
    // requests. Capped to what this box can actually need.
    deviceSizes: [384, 480, 640, 750, 828, 960],
    // Next only serves WebP unless AVIF is explicitly opted into. AVIF
    // decodes to ~20-30% smaller than WebP at equivalent visual quality
    // for a photo like this one, which matters on the throttled mobile
    // connection PageSpeed simulates. Listed first so the content
    // negotiation (Accept header) prefers it when the browser supports it.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
