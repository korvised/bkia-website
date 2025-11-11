import { WelcomePopupConfig } from "@/types/welcome-popup";

export const mockWelcomePopupData: WelcomePopupConfig = {
  enabled: true,
  showOnce: true,
  closeDelay: 2000,
  images: [
    {
      id: "welcome-2025",
      imageUrl: "/images/news/placeholder.jpg",
      title: "Welcome to Bokeo International Airport",
      description: "Experience world-class service and comfort",
      link: "/en/about",
      linkText: "Learn More",
      priority: 1,
      startDate: "2025-01-01T00:00:00Z",
      endDate: "2026-12-31T23:59:59Z",
      isActive: true,
    },
    {
      id: "new-route-announcement",
      imageUrl: "/images/dining/bokeo-noodle-house.jpg",
      title: "New Direct Flights to Bangkok",
      description: "Starting March 2025 - Book now!",
      link: "/en/flights",
      linkText: "View Schedule",
      priority: 2,
      startDate: "2025-02-01T00:00:00Z",
      endDate: "2026-11-31T23:59:59Z",
      isActive: true,
    },
    {
      id: "duty-free-promotion",
      imageUrl: "/images/shops/bokeo-duty-free.jpg",
      title: "Duty Free Sale - Up to 50% Off",
      description: "Limited time offer on selected items",
      link: "/en/services/dining-shopping/duty-free",
      linkText: "Shop Now",
      priority: 3,
      startDate: "2025-01-15T00:00:00Z",
      endDate: "2026-12-15T23:59:59Z",
      isActive: true,
    },
  ],
};

// Function to get active welcome images
export function getActiveWelcomeImages() {
  const now = new Date();

  return mockWelcomePopupData.images
    .filter((image) => {
      if (!image.isActive) return false;

      if (image.startDate && new Date(image.startDate) > now) return false;
      if (image.endDate && new Date(image.endDate) < now) return false;

      return true;
    })
    .sort((a, b) => a.priority - b.priority);
}
