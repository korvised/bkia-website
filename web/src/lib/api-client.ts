import { WelcomePopupConfig } from "@/types/welcome-popup";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export const apiClient = {
  // ... existing API methods ...

  welcome: {
    // Get welcome popup configuration
    getWelcomePopup: async (): Promise<WelcomePopupConfig> => {
      try {
        const response = await fetch(`${API_BASE_URL}/welcome-popup`, {
          cache: "no-store", // Always get fresh data
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error("Error fetching welcome popup:", error);
        // Return default/mock data on error
        throw error;
      }
    },

    // Track popup impression (optional analytics)
    trackImpression: async (popupId: string): Promise<void> => {
      try {
        await fetch(`${API_BASE_URL}/welcome-popup/track`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            popupId,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error("Error tracking popup impression:", error);
      }
    },

    // Track popup click (optional analytics)
    trackClick: async (popupId: string, link: string): Promise<void> => {
      try {
        await fetch(`${API_BASE_URL}/welcome-popup/click`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            popupId,
            link,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error("Error tracking popup click:", error);
      }
    },
  },
};
