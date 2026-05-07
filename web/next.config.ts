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
