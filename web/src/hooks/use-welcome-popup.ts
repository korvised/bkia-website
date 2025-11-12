"use client";

import { useCallback, useEffect, useState } from "react";
import { WelcomePopupConfig, WelcomePopupImage } from "@/types/welcome-popup";
import {
  mockWelcomePopupData,
  getActiveWelcomeImages,
} from "@/data/welcome-popup-data";
import { apiClient } from "@/lib/api-client";

const STORAGE_KEY = "bokeo-airport-welcome-popup-shown";

type ShowFrequency = "once" | "daily" | "session" | "always";

interface UseWelcomePopupReturn {
  isOpen: boolean;
  images: WelcomePopupImage[];
  currentIndex: number;
  canClose: boolean;
  isLoading: boolean;
  closeDelay: number;
  setIsOpen: (open: boolean) => void;
  setCurrentIndex: (index: number) => void;
  handleClose: () => void;
  trackImpression: () => void;
  trackClick: (link: string) => void;
}

export function useWelcomePopup(
  frequency: ShowFrequency = "daily",
): UseWelcomePopupReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<WelcomePopupImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canClose, setCanClose] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [closeDelay, setCloseDelay] = useState(2000);

  const trackImpression = useCallback(() => {
    if (images.length > 0 && images[currentIndex]) {
      apiClient.welcome.trackImpression(images[currentIndex].id).catch(() => {
        // Silently fail
      });
    }
  }, [images, currentIndex]);

  useEffect(() => {
    const initializePopup = async () => {
      // Check if we should show the popup based on frequency
      if (!shouldShowPopup(frequency)) {
        setIsLoading(false);
        return;
      }

      try {
        // Try to fetch from API first, fallback to mock data
        const config: WelcomePopupConfig = mockWelcomePopupData;

        /*        try {
          config = await apiClient.welcome.getWelcomePopup();
        } catch (error) {
          console.warn("Using mock welcome popup data");
          config = mockWelcomePopupData;
        }*/

        if (!config.enabled) {
          setIsLoading(false);
          return;
        }

        // Get active images
        const activeImages = getActiveWelcomeImages();

        if (activeImages.length > 0) {
          setImages(activeImages);
          setIsOpen(true);
          setCloseDelay(config.closeDelay || 2000);

          // Set close delay
          setTimeout(() => {
            setCanClose(true);
          }, config.closeDelay || 2000);

          // Track impression
          trackImpression();
        }
      } catch (error) {
        console.error("Error initializing welcome popup:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializePopup();
  }, [frequency, trackImpression]);

  const shouldShowPopup = (freq: ShowFrequency): boolean => {
    const lastShown = localStorage.getItem(STORAGE_KEY);

    switch (freq) {
      case "always":
        return true;

      case "session":
        return !sessionStorage.getItem(STORAGE_KEY);

      case "daily":
        const today = new Date().toDateString();
        return lastShown !== today;

      case "once":
        return !lastShown;

      default:
        return true;
    }
  };

  const handleClose = () => {
    if (!canClose) return;

    setIsOpen(false);

    // Store based on frequency
    const now = new Date();
    switch (frequency) {
      case "session":
        sessionStorage.setItem(STORAGE_KEY, now.toISOString());
        break;
      case "daily":
        localStorage.setItem(STORAGE_KEY, now.toDateString());
        break;
      case "once":
        localStorage.setItem(STORAGE_KEY, now.toISOString());
        break;
    }
  };

  const trackClick = (link: string) => {
    if (images.length > 0 && images[currentIndex]) {
      apiClient.welcome.trackClick(images[currentIndex].id, link).catch(() => {
        // Silently fail
      });
    }
  };

  return {
    isOpen,
    images,
    currentIndex,
    canClose,
    isLoading,
    closeDelay,
    setIsOpen,
    setCurrentIndex,
    handleClose,
    trackImpression,
    trackClick,
  };
}
