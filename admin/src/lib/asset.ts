import { config } from '@/config';

/**
 * Joins base + path safely and optionally appends a version for cache-busting.
 */
function joinUrl(base: string, path: string, v?: string) {
  const b = base.replace(/\/+$/, '');
  const p = path.replace(/^\/+/, '');
  const url = `${b}/${p}`;
  return v ? `${url}?v=${encodeURIComponent(v)}` : url;
}

/**
 * Returns a public URL for an image/file stored on CDN, custom asset base, or S3.
 */
export function asset(path: string, opts?: { cacheBust?: boolean }) {
  if (!path) return '';

  const version = opts?.cacheBust ? config.appVersion : undefined;

  /** 1) CDN domain → highest priority */
  if (config.cdnDomain) {
    return joinUrl(`https://${config.cdnDomain}`, path, version);
  }

  /** 2) Asset base URL (custom static/CDN) */
  if (config.assetBaseUrl) {
    return joinUrl(config.assetBaseUrl, path, version);
  }

  /** 3) Auto-build S3 URL if bucket + region exist */
  if (config.s3Bucket && config.s3Region) {
    const s3Base = `https://${config.s3Bucket}.s3.${config.s3Region}.amazonaws.com`;
    return joinUrl(s3Base, path, version);
  }

  /** 4) Final fallback: relative path */
  if (config.isDev) {
    console.warn('[asset] No CDN/asset/S3 config found. Using relative path.');
  }

  return joinUrl('/', path, version);
}
