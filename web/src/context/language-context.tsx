// src/context/language-context.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";
import {
  Lang,
  getLanguageConfig,
  getLocalizedText,
  MultilingualText,
} from "@/types/language";

interface LanguageContextType {
  lang: Lang;
  languageConfig: ReturnType<typeof getLanguageConfig>;
  t: (text: MultilingualText) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: ReactNode;
  lang: Lang;
}

export function LanguageProvider({ children, lang }: LanguageProviderProps) {
  const languageConfig = getLanguageConfig(lang);

  const t = (text: MultilingualText): string => {
    return getLocalizedText(text, lang);
  };

  const value: LanguageContextType = {
    lang,
    languageConfig,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
