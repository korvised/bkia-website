"use client";

import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", name: "EN", nativeName: "English", flag: "🇺🇸" },
  { code: "lo", name: "LO", nativeName: "ລາວ", flag: "🇱🇦" }
];

interface LanguageSelectorProps {
  isScrolled: boolean;
}

export default function LanguageSelector({ isScrolled }: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language: typeof languages[0]) => {
    setCurrentLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300",
          isScrolled
            ? "text-gray-700 hover:bg-gray-100"
            : "text-white hover:bg-white/10"
        )}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage.code}</span>
        <ChevronDown className={cn(
          "w-3 h-3 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-40">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                className={cn(
                  "w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg",
                  currentLanguage.code === language.code && "bg-bokeo-teal-50 text-bokeo-teal-700"
                )}
              >
                <span>{language.flag}</span>
                <span className="text-sm">{language.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
