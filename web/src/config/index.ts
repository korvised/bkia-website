// src/config/index.ts
import {
  NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_ASSET_BASE_URL,
  NEXT_PUBLIC_CDN_DOMAIN,
  NEXT_PUBLIC_S3_BUCKET,
  NEXT_PUBLIC_S3_REGION,
  NEXT_PUBLIC_APP_VERSION,
  NODE_ENV,
  IS_DEV,
  IS_PROD,
} from "./env";

export const config = {
  env: NODE_ENV,
  isDev: IS_DEV,
  isProd: IS_PROD,

  apiBaseUrl: NEXT_PUBLIC_API_BASE_URL,

  // Image/CDN settings
  cdnDomain: NEXT_PUBLIC_CDN_DOMAIN,         // e.g. "cdn.example.com"
  assetBaseUrl: NEXT_PUBLIC_ASSET_BASE_URL,  // e.g. "https://bucket.s3.region.amazonaws.com"
  s3Bucket: NEXT_PUBLIC_S3_BUCKET,
  s3Region: NEXT_PUBLIC_S3_REGION,

  appVersion: NEXT_PUBLIC_APP_VERSION,       // for cache-busting if desired
} as const;
