import {
  API_BASE_URL,
  ASSET_BASE_URL,
  CDN_DOMAIN,
  S3_BUCKET,
  S3_REGION,
  APP_VERSION,
  NODE_ENV,
  IS_DEV,
  IS_PROD,
  MAIL_DOMAIN,
} from "./env";

export const config = {
  env: NODE_ENV,
  isDev: IS_DEV,
  isProd: IS_PROD,

  apiBaseUrl: API_BASE_URL,

  // Image/CDN settings
  cdnDomain: CDN_DOMAIN,          // e.g. "cdn.example.com"
  assetBaseUrl: ASSET_BASE_URL,   // e.g. "https://bucket.s3.region.amazonaws.com"
  s3Bucket: S3_BUCKET,
  s3Region: S3_REGION,

  appVersion: APP_VERSION,        // for cache-busting if desired
  mailDomain: MAIL_DOMAIN,
} as const;
