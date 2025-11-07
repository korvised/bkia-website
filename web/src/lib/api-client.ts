import { WelcomePopupConfig } from "@/types/welcome-popup";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

async function fetchJSON<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, {
    // for live-ish boards: don't cache; adjust to `revalidate: 30` if you prefer
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText} – ${text}`);
  }
  return res.json() as Promise<T>;
}

export const apiClient = {
  welcome: {
    // Get welcome popups configuration
    getWelcomePopup(): Promise<WelcomePopupConfig> {
      return fetchJSON<WelcomePopupConfig>(`${API_BASE_URL}/welcome-popup`, {
        cache: "no-store",
      });
    },

    // Track popup impression (optional analytics)
    async trackImpression(popupId: string): Promise<void> {
      try {
        // keepalive lets this succeed even if the page is unloading
        await fetch(`${API_BASE_URL}/welcome-popup/track`, {
          method: "POST",
          keepalive: true,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            popupId,
            timestamp: new Date().toISOString(),
            event: "impression",
          }),
        });
      } catch (err) {
        // Non-fatal: log and continue
        console.error("Error tracking popup impression:", err);
      }
    },

    // Track popup click (optional analytics)
    async trackClick(popupId: string, link: string): Promise<void> {
      try {
        await fetch(`${API_BASE_URL}/welcome-popup/click`, {
          method: "POST",
          keepalive: true,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            popupId,
            link,
            timestamp: new Date().toISOString(),
            event: "click",
          }),
        });
      } catch (err) {
        // Non-fatal: log and continue
        console.error("Error tracking popup click:", err);
      }
    },
  },
};
