import type { NextConfig } from "next";

// Parse NEXT_PUBLIC_ASSET_BASE_URL at build time so any environment
// (dev, UAT, staging, production) is automatically allowed by Next.js
// image optimization — no hardcoded hostnames needed.
function assetRemotePattern() {
  const raw = process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? "";
  if (!raw) return null;
  try {
    const u = new URL(raw);
    return {
      protocol: u.protocol.replace(":", "") as "http" | "https",
      hostname: u.hostname,
      port: u.port ?? "",
      // Allow any path under the configured base (e.g. /uploads/**)
      pathname: u.pathname ? `${u.pathname.replace(/\/$/, "")}/**` : "/**",
    };
  } catch {
    return null;
  }
}

const dynamicPattern = assetRemotePattern();

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,

  async redirects() {
    return [
      // ── Transport → Services ───────────────────────────────────────────
      // Specific exceptions BEFORE the wildcard
      {
        source: "/:lang/transports/to-from-airport",
        destination: "/:lang/services/taxi",
        permanent: true,
      },
      {
        source: "/:lang/transports/regional",
        destination: "/:lang/guides/regional",
        permanent: true,
      },
      {
        source: "/:lang/transports/contacts",
        destination: "/:lang/about/contact",
        permanent: true,
      },
      // Wildcard: catches /transports/parking and anything else
      {
        source: "/:lang/transports/:path*",
        destination: "/:lang/services/:path*",
        permanent: true,
      },

      // ── Support → split to About / Notices ────────────────────────────
      // Specific exceptions BEFORE the wildcard
      {
        source: "/:lang/support/complaint",
        destination: "/:lang/about/faqs",
        permanent: true,
      },
      {
        source: "/:lang/support/faq",
        destination: "/:lang/about/faqs",
        permanent: true,
      },
      {
        source: "/:lang/support/lost-found",
        destination: "/:lang/about/lost-found",
        permanent: true,
      },
      {
        source: "/:lang/support/lost-found/:path*",
        destination: "/:lang/about/lost-found",
        permanent: true,
      },
      {
        source: "/:lang/support/feedback",
        destination: "/:lang/about/feedback",
        permanent: true,
      },
      {
        source: "/:lang/support/notices",
        destination: "/:lang/notices/airport",
        permanent: true,
      },
      // Wildcard: any other /support/* → /notices/*
      {
        source: "/:lang/support/:path*",
        destination: "/:lang/notices/:path*",
        permanent: true,
      },

      // ── Guides facilities → Services ──────────────────────────────────
      {
        source: "/:lang/guides/facilities",
        destination: "/:lang/services/facilities",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      // S3 bucket (production)
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_S3_BUCKET ?? "bkia-website"}.s3.${process.env.NEXT_PUBLIC_S3_REGION ?? "ap-southeast-7"}.amazonaws.com`,
        port: "",
        pathname: "/**",
      },
      // Development fallback: local NestJS server
      {
        protocol: "http",
        hostname: "localhost",
        port: "9090",
        pathname: "/uploads/**",
      },
      // Dynamic: derived from NEXT_PUBLIC_ASSET_BASE_URL at build time.
      // Covers UAT (http://172.16.14.100/uploads), staging, any custom host.
      ...(dynamicPattern ? [dynamicPattern] : []),
    ],
  },
};

export default nextConfig;
