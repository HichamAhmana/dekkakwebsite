import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security headers
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },

          // ✅ FIXED CSP (Chatbase + Turnstile + Google + Resend)
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';

              script-src 'self' 'unsafe-inline' 'unsafe-eval'
                https://www.chatbase.co
                https://challenges.cloudflare.com
                https://www.googletagmanager.com
                https://www.google-analytics.com
                https://js.cloudflare.com;

              style-src 'self' 'unsafe-inline';

              img-src 'self' data: https:;

              font-src 'self' data:;

              connect-src 'self'
                https://www.chatbase.co
                https://api.resend.com
                https://challenges.cloudflare.com
                https://www.google-analytics.com;

              frame-src 'self'
                https://www.chatbase.co
                https://challenges.cloudflare.com;
            `.replace(/\n/g, " "),
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "live.staticflickr.com",
      },
    ],
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);