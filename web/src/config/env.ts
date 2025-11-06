// src/config/env.ts
function getEnvVar(key: string, fallback?: string): string {
  const v = process.env[key] ?? fallback;
  if (v === undefined) throw new Error(`Missing environment variable: ${key}`);
  return v;
}

// Public API URL (as before)
export const NEXT_PUBLIC_API_BASE_URL = getEnvVar(
  "NEXT_PUBLIC_API_BASE_URL",
  "http://localhost:8080"
);

// === Asset / Image hosting ===
// Prefer a CDN domain if you have CloudFront (e.g. cdn.example.com)
// Example: NEXT_PUBLIC_CDN_DOMAIN=cdn.example.com
export const NEXT_PUBLIC_CDN_DOMAIN = process.env.NEXT_PUBLIC_CDN_DOMAIN ?? "";

// If not using a CDN domain, build an S3 URL from bucket + region, or provide a full base url
// Examples:
//   NEXT_PUBLIC_ASSET_BASE_URL=https://my-bucket.s3.ap-southeast-1.amazonaws.com
//   (or let it be auto-built from bucket + region)
export const NEXT_PUBLIC_S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET ?? "";
export const NEXT_PUBLIC_S3_REGION = process.env.NEXT_PUBLIC_S3_REGION ?? "";
export const NEXT_PUBLIC_ASSET_BASE_URL =
  process.env.NEXT_PUBLIC_ASSET_BASE_URL ??
  (NEXT_PUBLIC_S3_BUCKET && NEXT_PUBLIC_S3_REGION
    ? `https://${NEXT_PUBLIC_S3_BUCKET}.s3.${NEXT_PUBLIC_S3_REGION}.amazonaws.com`
    : "");

// Misc
export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const IS_PROD = NODE_ENV === "production";
export const IS_DEV = NODE_ENV === "development";
export const NEXT_PUBLIC_APP_VERSION =
  process.env.NEXT_PUBLIC_APP_VERSION ?? "dev";
