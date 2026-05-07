import type { NextConfig } from "next";

// Node.js 22+ exposes a built-in `localStorage` global when Next.js passes
// `--localstorage-file` (even without a valid path). The resulting object has
// `getItem`/`setItem` missing or broken, crashing SSR. We replace it with a
// safe no-op so server-side code never throws.
if (typeof globalThis.localStorage !== "undefined") {
  const _store: Record<string, string> = {};
 
  globalThis.localStorage = {
    getItem: (key: string) => _store[key] ?? null,
    setItem: (key: string, value: string) => { _store[key] = value; },
    removeItem: (key: string) => { delete _store[key]; },
    clear: () => { Object.keys(_store).forEach((k) => delete _store[k]); },
    key: (index: number) => Object.keys(_store)[index] ?? null,
    get length() { return Object.keys(_store).length; },
  };
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
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
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
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

export default nextConfig;

