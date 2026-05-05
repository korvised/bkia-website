import { WelcomePopupConfig } from "@/types/welcome-popup";
import { fetchJSON } from "@/lib/http";

export const apiClient = {
  welcome: {
    // Get welcome popups configuration
    getWelcomePopup(): Promise<WelcomePopupConfig> {
      return fetchJSON<WelcomePopupConfig>("welcome-popup", {
        cache: "no-store",
      });
    },

    // Track popup impression (optional analytics)
    async trackImpression(popupId: string): Promise<void> {
      try {
        // keepalive lets this succeed even if the page is unloading
        await fetch("/api/welcome-popup/track", {
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
        await fetch("/api/welcome-popup/click", {
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
