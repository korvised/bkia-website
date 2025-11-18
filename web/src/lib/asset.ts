import { config } from "@/config";

/**
 * Joins base + path safely and optionally appends a version for cache-busting.
 */
function joinUrl(base: string, path: string, v?: string) {
  const b = base.replace(/\/+$/, "");
  const p = path.replace(/^\/+/, "");
  const url = `${b}/${p}`;
  return v ? `${url}?v=${encodeURIComponent(v)}` : url;
}

/**
 * Returns a public URL for an image/file stored on S3 (or your CDN if configured).
 * - If NEXT_PUBLIC_CDN_DOMAIN is set, uses https://<cdnDomain>/<path>
 * - Else falls back to NEXT_PUBLIC_ASSET_BASE_URL
 * - Automatically strips/normalizes slashes
 * - Optionally appends app version (?v=...) to bust stale caches on deploys
 */
export function asset(path: string, opts?: { cacheBust?: boolean }) {
  if (!path) return "";

  // Prefer CDN domain if provided
  if (config.cdnDomain) {
    return joinUrl(
      `https://${config.cdnDomain}`,
      path,
      opts?.cacheBust ? config.appVersion : undefined,
    );
  }

  if (!config.assetBaseUrl) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[asset] Missing base URL. Set NEXT_PUBLIC_CDN_DOMAIN or NEXT_PUBLIC_ASSET_BASE_URL or S3 bucket+region.",
      );
    }
    // Fallback to relative path (works if you serve statics yourself)
    return joinUrl("/", path, opts?.cacheBust ? config.appVersion : undefined);
  }

  return joinUrl(
    config.assetBaseUrl,
    path,
    opts?.cacheBust ? config.appVersion : undefined,
  );
}
