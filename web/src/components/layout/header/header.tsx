"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, Home, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context";
import { LanguageSelector } from "./language-selector";
import { Sidebar } from "./sidebar";

const translations = {
  menu: {
    en: "Menu",
    lo: "ເມນູ",
    zh: "菜单",
  },
  importantNotice: {
    en: "Important Notice",
    lo: "ປະກາດສຳຄັນ",
    zh: "重要通知",
  },
  airportName: {
    en: "Bokeo International Airport",
    lo: "ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "博胶国际机场",
  },
  airportNameLao: {
    en: "Bokeo International Airport",
    lo: "ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "博胶国际机场",
  },
};

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check the initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Fragment>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 shadow-lg backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="flex w-full items-center justify-between p-4 px-6">
          {/* Left Section - Menu Button */}
          <div className="flex items-center gap-x-4">
            <button
              onClick={toggleSidebar}
              className={cn(
                "flex items-center gap-x-2 rounded-lg px-2.5 py-2 transition-all duration-300 md:px-4",
                isScrolled
                  ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
                  : "border border-white/30 text-white hover:bg-white/10",
              )}
            >
              <Menu className="h-4 w-4" />
              <span className="hidden text-sm font-medium md:inline">
                {t(translations.menu)}
              </span>
            </button>

            <Link
              href={`/${lang}`}
              className={cn(
                "hidden rounded-lg p-2 transition-all duration-300 sm:flex",
                isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10",
              )}
            >
              <Home
                className={cn(
                  "h-5 w-5 transition-colors duration-300",
                  isScrolled ? "text-gray-700" : "text-white",
                )}
              />
            </Link>
          </div>

          {/* Center Section - Airport Logo and Name */}
          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <Link href={`/${lang}`} className="flex items-center space-x-3">
              <div
                className={cn(
                  "flex flex-col items-center text-center transition-colors duration-300",
                  isScrolled ? "text-gray-900" : "text-white",
                )}
              >
                <span
                  className={cn(
                    "font-lao text-sm leading-tight md:text-base md:tracking-wider",
                    lang === "zh" ? "tracking-tight" : "tracking-wider",
                  )}
                >
                  ສະໜາມບິນສາກົນບໍ່ແກ້ວ
                </span>

                {lang === "zh" ? (
                  <span className="font-lao! text-sm leading-tight tracking-widest md:text-base">
                    {t(translations.airportName)}
                  </span>
                ) : (
                  <span className="text-xs leading-tight font-medium tracking-tight md:text-sm">
                    Bokeo International Airport
                  </span>
                )}
              </div>

              <div className="relative hidden h-11 w-11 sm:block md:h-12 md:w-14">
                <Image
                  src={
                    isScrolled
                      ? "/images/logo/logo.png"
                      : "/images/logo/logo_white.png"
                  }
                  alt="Bokeo Airport Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Right Section - Language and Notifications */}
          <div className="flex items-center gap-x-1">
            <LanguageSelector isScrolled={isScrolled} />

            <Link
              href={`/${lang}/news?urgent=true`}
              className={cn(
                "hidden items-center gap-x-2 rounded-lg px-2 py-2 transition-all duration-300 md:flex",
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10",
              )}
            >
              <Bell className="h-4 w-4 text-orange-500" />
              <span className="hidden text-xs font-medium md:inline">
                {t(translations.importantNotice)}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </Fragment>
  );
}
