export function withQuery<T extends object>(base: string, params?: T) {
  if (!params) return base;

  const url = new URL(base, "http://x"); // dummy origin for searchParams

  (Object.entries(params) as Array<[string, unknown]>).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    url.searchParams.set(k, String(v));
  });

  return base + (url.search ? `?${url.searchParams.toString()}` : "");
}
