"use client";

import { startTransition, useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { useLanguage } from "@/context";
import { setLangCookie } from "@/actions";
import { cn, languages } from "@/lib";
import { type Lang } from "@/types/language";

interface LanguageSelectorProps {
  isScrolled: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  isScrolled,
}) => {
  const { lang, languageConfig } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLang: Lang) => {
    if (newLang === lang) {
      setIsOpen(false);
      return;
    }

    const segments = pathname.split("/");
    segments[1] = newLang;
    const newPath = segments.join("/");

    startTransition(async () => {
      await setLangCookie(newLang);
      router.push(newPath);
    });

    setIsOpen(false);
  };

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Delay closing to allow smooth transition between trigger and dropdown
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowDown":
        case "ArrowUp":
          e.preventDefault();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-x-1.5 rounded-lg border-0 px-2 py-1.5 transition-all duration-300 outline-none sm:px-2.5 sm:py-2",
          "focus-visible:ring-primary-500 focus-visible:ring-2 focus-visible:ring-offset-2",
          isScrolled
            ? "text-gray-700 hover:bg-gray-100"
            : "text-white hover:bg-white/10",
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
      >
        <span className="overflow-hidden rounded-full border border-gray-100 shadow-sm">
          <languageConfig.flag className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
        <span
          className={cn(
            "text-xs font-medium sm:text-sm",
            languageConfig.code === "lo" && "font-lao",
          )}
        >
          {languageConfig.nativeName}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200 sm:h-4 sm:w-4",
            isScrolled
              ? "text-gray-600 group-hover:text-gray-900"
              : "text-white/80 group-hover:text-white",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={cn(
          "absolute top-full right-0 z-40 mt-2 w-36 origin-top-right sm:w-40",
          "overflow-hidden rounded-lg border border-gray-200/50 bg-white shadow-lg",
          "transition-all duration-200 ease-out",
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0",
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="language-menu"
      >
        <div className="py-0.5">
          {languages.map((language) => {
            const isActive = lang === language.code;

            return (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={cn(
                  "flex w-full items-center justify-between gap-x-2 border-0 px-3 py-2.5",
                  "text-left transition-colors outline-none sm:px-4 sm:py-3",
                  "hover:bg-gray-50 focus:bg-gray-50 active:bg-gray-100",
                  isActive && "bg-primary-50",
                )}
                role="menuitem"
              >
                <div className="flex min-w-0 flex-1 items-center gap-x-2 sm:gap-x-2.5">
                  <div className="relative flex-shrink-0 overflow-hidden rounded-full shadow-sm">
                    <language.flag className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span
                    className={cn(
                      "truncate text-xs font-medium sm:text-sm",
                      isActive ? "text-primary-700" : "text-gray-900",
                      language.code === "lo" && "font-lao",
                    )}
                  >
                    {language.nativeName}
                  </span>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <Check className="text-primary-600 h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
