import { config } from "@/config";

export function withQuery<T extends object>(base: string, params?: T) {
  if (!params) return base;

  const url = new URL(base, "http://x");

  (Object.entries(params) as Array<[string, unknown]>).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    url.searchParams.set(k, String(v));
  });

  return base + (url.search ? `?${url.searchParams.toString()}` : "");
}

export async function fetchJSON<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${config.apiBaseUrl}/api/${path}`, {
    cache: "no-store",
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText} – ${text}`);
  }
  return res.json() as Promise<T>;
}

// For JSON POST/PATCH/DELETE
export async function postJSON<T>(
  path: string,
  body: unknown,
  method: "POST" | "PATCH" | "PUT" | "DELETE" = "POST",
): Promise<T> {
  return fetchJSON<T>(path, {
    method,
    body: JSON.stringify(body),
  });
}

// For multipart/form-data (file uploads) — do NOT set Content-Type, browser sets boundary
export async function postForm<T>(
  path: string,
  body: FormData,
  method: "POST" | "PATCH" = "POST",
): Promise<T> {
  const res = await fetch(`${config.apiBaseUrl}/api/${path}`, {
    method,
    body,
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText} – ${text}`);
  }
  return res.json() as Promise<T>;
}
