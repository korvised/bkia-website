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
 * Returns a public URL for an image/file stored on S3 or CDN.
 * - If VITE_CDN_DOMAIN is set, uses https://<cdnDomain>/<path>
 * - Else falls back to VITE_ASSET_BASE_URL or auto-built S3 URL
 * - Automatically strips/normalizes slashes
 * - Optionally appends app version (?v=...) for cache-busting
 */
export function asset(path: string, opts?: { cacheBust?: boolean }) {
  if (!path) return '';

  const version = opts?.cacheBust ? config.appVersion : undefined;

  // Prefer CDN domain
  if (config.cdnDomain) {
    return joinUrl(`https://${config.cdnDomain}`, path, version);
  }

  // Missing base URL → warn only in development
  if (!config.assetBaseUrl) {
    if (config.isDev) {
      console.warn(
        '[asset] Missing asset base URL. Set VITE_CDN_DOMAIN or VITE_ASSET_BASE_URL or S3 bucket + region.'
      );
    }
    // Use relative path fallback
    return joinUrl('/', path, version);
  }

  // Use configured asset base URL
  return joinUrl(config.assetBaseUrl, path, version);
}
