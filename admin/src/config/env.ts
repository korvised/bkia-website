function getEnvVar(key: string, fallback?: string): string {
  const v = (import.meta.env as never)[key] ?? fallback;
  if (v === undefined) throw new Error(`Missing environment variable: ${key}`);
  return v;
}

// === API base URL ===
export const API_BASE_URL = getEnvVar('VITE_API_URL', 'http://localhost:8080');

// === Asset / Image hosting ===
// Optional CDN domain (e.g. cdn.example.com)
export const CDN_DOMAIN =
  (import.meta.env.VITE_CDN_DOMAIN as string | undefined) ?? '';

// S3 bucket/region (from your existing vars)
export const S3_BUCKET =
  (import.meta.env.VITE_AWS_S3_BUCKET as string | undefined) ?? '';
export const S3_REGION =
  (import.meta.env.VITE_AWS_S3_REGION as string | undefined) ?? '';

// Optional explicit asset base URL, or auto-build from bucket + region
export const ASSET_BASE_URL =
  (import.meta.env.VITE_ASSET_BASE_URL as string | undefined) ??
  (S3_BUCKET && S3_REGION
    ? `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com`
    : '');

// === Misc ===
export const NODE_ENV = import.meta.env.MODE ?? 'development';
export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;

export const APP_VERSION =
  (import.meta.env.VITE_APP_VERSION as string | undefined) ?? 'dev';

export const MAIL_DOMAIN =
  (import.meta.env.VITE_MAIL_DOMAIN as string | undefined) ?? '';
