// Public API URL
export const NEXT_PUBLIC_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

// === Asset / Image hosting ===
export const NEXT_PUBLIC_CDN_DOMAIN = process.env.NEXT_PUBLIC_CDN_DOMAIN ?? "";
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
