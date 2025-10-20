"use client";

import { createContext, ReactNode, useContext, useState } from "react";
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  lang: Lang;
}

export function AppProvider({ children, lang }: AppProviderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const languageConfig = getLanguageConfig(lang);

  const t = (text: MultilingualText): string => {
    return getLocalizedText(text, lang);
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  const value: AppContextType = {
    lang,
    languageConfig,
    t,
    isSearchOpen,
    openSearch,
    closeSearch,
    toggleSearch,
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
