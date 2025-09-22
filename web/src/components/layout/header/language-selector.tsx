"use client";

import { Fragment } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import { languages, type Lang } from "@/types/language";

interface LanguageSelectorProps {
  isScrolled: boolean;
}

export default function LanguageSelector({
  isScrolled,
}: LanguageSelectorProps) {
  const { lang, languageConfig } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLang: Lang) => {
    // Replace the current language in the pathname with the new one
    const segments = pathname.split("/");
    segments[1] = newLang; // Replace the language segment
    const newPath = segments.join("/");

    router.push(newPath);
  };

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <MenuButton
            className={cn(
              "flex items-center space-x-2 rounded-lg border-0 px-3 py-2 transition-all duration-300 outline-none",
              isScrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10",
            )}
          >
            <Globe className="h-4 w-4" />
            <span className="min-w-[2rem] text-sm font-medium">
              {languageConfig.code.toUpperCase()}
            </span>
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </MenuButton>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems
              className="absolute top-full right-0 z-40 mt-2 w-44 overflow-hidden rounded-lg border border-gray-200/50 bg-white shadow-lg focus:outline-none"
              static
            >
              {languages.map((language) => (
                <MenuItem key={language.code}>
                  {({ focus }) => (
                    <button
                      onClick={() => handleLanguageChange(language.code)}
                      className={cn(
                        "flex w-full items-center space-x-3 border-0 px-4 py-3 text-left transition-colors outline-none",
                        focus && "bg-gray-50",
                        lang === language.code &&
                          "bg-bokeo-teal-50 text-bokeo-teal-700",
                      )}
                    >
                      {/*                      <span className="flex-shrink-0 text-lg">
                        {language.flag}
                      </span>*/}
                      <div className="relative flex-shrink-0 overflow-hidden rounded-full">
                        <language.flag className="h-5 w-full" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm font-medium text-gray-900">
                          {language.code.toUpperCase()}
                        </span>
                        <span
                          className={cn(
                            "truncate text-xs text-gray-500",
                            language.code === "lo" && "font-lao",
                          )}
                        >
                          {language.nativeName}
                        </span>
                      </div>
                    </button>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
}
