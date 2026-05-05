import { config } from "@/config";

/**
 * Typed API error — thrown by fetchJSON / postForm whenever the server
 * responds with a non-2xx status code.
 *
 * Usage in catch blocks:
 *   if (err instanceof ApiError && err.isNotFound) return null;
 *   throw err; // re-throw 500s → propagates to error.tsx boundary
 */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    /** Raw response body (may be JSON string from NestJS e.g. '{"statusCode":500,...}') */
    public readonly body: string,
  ) {
    super(`${status} ${statusText}`);
    this.name = "ApiError";
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }

  get isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  get isServerError(): boolean {
    return this.status >= 500;
  }

  /** Try to parse the server's JSON body (NestJS error shape). */
  get serverMessage(): string | undefined {
    try {
      const parsed = JSON.parse(this.body) as { message?: string };
      return typeof parsed.message === "string" ? parsed.message : undefined;
    } catch {
      return undefined;
    }
  }
}

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
    const body = await res.text().catch(() => "");
    throw new ApiError(res.status, res.statusText, body);
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
    throw new ApiError(res.status, res.statusText, text);
  }
  return res.json() as Promise<T>;
}
