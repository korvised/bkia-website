"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Lang, MultilingualText } from "@/types/language";
import { getLanguageConfig, getLocalizedText } from "@/lib";

interface AppContextType {
  // Language state
  lang: Lang;
  languageConfig: ReturnType<typeof getLanguageConfig>;
  t: (text: MultilingualText) => string;

  // Search state
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;

  // Scroll state
  scrollY: number;
  isScrolled: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  lang: Lang;
  scrollThreshold?: number;
}

export function AppProvider({
  children,
  lang,
  scrollThreshold = 50,
}: AppProviderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const languageConfig = getLanguageConfig(lang);

  const t = (text: MultilingualText): string => {
    return getLocalizedText(text, lang);
  };

  const openSearch = useCallback(
    () => setIsSearchOpen(true),
    [setIsSearchOpen],
  );
  const closeSearch = useCallback(
    () => setIsSearchOpen(false),
    [setIsSearchOpen],
  );
  const toggleSearch = useCallback(
    () => setIsSearchOpen((prev) => !prev),
    [setIsSearchOpen],
  );

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > scrollThreshold);
    };

    // Set initial scroll position
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openSearch]);

  const value: AppContextType = {
    lang,
    languageConfig,
    t,
    isSearchOpen,
    openSearch,
    closeSearch,
    toggleSearch,
    scrollY,
    isScrolled,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

// Backward compatibility - export as useLanguage
export const useLanguage = useApp;
