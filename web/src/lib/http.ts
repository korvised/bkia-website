import { config } from "@/config";

export function withQuery<T extends object>(base: string, params?: T) {
  if (!params) return base;

  const url = new URL(base, "http://x"); // dummy origin for searchParams

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
