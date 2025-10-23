"use client";

import { Fragment, useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronRight } from "lucide-react";
import { GoSearch } from "react-icons/go";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { PiWheelchairDuotone } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/app-context";
import { mainNavigation } from "@/data/main-navigation";
import { LanguageSelector } from "./language-selector";
import { Sidebar } from "./sidebar";
import { SearchDialog } from "@/components/common";

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { lang, isScrolled, openSearch } = useApp();
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    };
  }, []);

  const handleMenuEnter = (id: string, hasDropdown: boolean) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    if (hasDropdown) setActiveMenu(id);
  };

  const handleMenuLeave = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const handleDropdownEnter = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
  };

  const handleDropdownLeave = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const isHeaderWhite = isScrolled || activeMenu !== null;

  return (
    <Fragment>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-100 ease-in-out",
          isHeaderWhite ? "bg-white shadow-md" : "bg-transparent",
        )}
      >
        <div className="mx-auto max-w-[1920px]">
          <div className="flex items-center justify-between px-4 sm:px-6 xl:px-12">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={cn(
                "rounded-lg p-2 transition-all duration-200 sm:hidden",
                isHeaderWhite
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10",
              )}
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Logo */}
            <Link
              href={`/${lang}`}
              className="group relative z-10 flex items-center outline-none"
            >
              <div
                className={cn(
                  "relative flex-shrink-0 transition-all duration-300 ease-in-out",
                  isScrolled
                    ? "h-12 w-12 sm:h-16 sm:w-16"
                    : "h-16 w-16 sm:h-24 sm:w-24",
                )}
              >
                <Image
                  src={
                    isHeaderWhite
                      ? "/images/logo/bokeo.png"
                      : "/images/logo/bokeo_white.png"
                  }
                  alt="Bokeo Airport"
                  fill
                  className="object-contain transition-opacity duration-200 group-hover:opacity-80"
                  priority
                />
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:ml-8 lg:block xl:absolute xl:top-1/2 xl:left-1/2 xl:ml-0 xl:-translate-x-1/2 xl:-translate-y-1/2">
              <ul className="flex items-center">
                {mainNavigation.map((item) => (
                  <li
                    key={item.id}
                    className="relative"
                    onMouseEnter={() =>
                      handleMenuEnter(item.id, item.hasDropdown)
                    }
                    onMouseLeave={handleMenuLeave}
                  >
                    <Link
                      href={`/${lang}${item.href}`}
                      className={cn(
                        "group relative flex h-full flex-col items-center justify-center px-3 transition-all duration-300 ease-in-out lg:px-4 xl:px-5",
                        isHeaderWhite
                          ? "hover:text-primary-600 text-gray-800"
                          : "hover:text-primary-200 text-white",
                        isScrolled ? "py-5" : "py-9",
                      )}
                    >
                      <span className="text-sm font-semibold whitespace-nowrap xl:text-base">
                        {item.label[lang]}
                      </span>

                      {/* Underline Animation - Left to Right */}
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 h-0.5 w-full origin-left transition-transform duration-300 ease-out",
                          activeMenu === item.id
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100",
                          isHeaderWhite ? "bg-primary-600" : "bg-white",
                        )}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSelector isScrolled={isHeaderWhite} isResponsive />

              <button
                className={cn(
                  "hidden rounded-lg p-2 transition-all duration-200 sm:block",
                  isHeaderWhite
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10",
                )}
                title="Airport Location"
                aria-label="Airport Location"
              >
                <LiaMapMarkedAltSolid className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <button
                className={cn(
                  "hidden rounded-lg p-2 transition-all duration-200 sm:block",
                  isHeaderWhite
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10",
                )}
                title="Accessibility"
                aria-label="Accessibility"
              >
                <PiWheelchairDuotone className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <button
                onClick={openSearch}
                className={cn(
                  "rounded-lg p-2 transition-all duration-200",
                  isHeaderWhite
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10",
                )}
                title="Search"
                aria-label="Search"
              >
                <GoSearch className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={cn(
                  "hidden rounded-lg p-2 transition-all duration-200 sm:block lg:hidden",
                  isHeaderWhite
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10",
                )}
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <div
          className={cn(
            "absolute right-0 left-0 w-full border-t border-gray-100 bg-white shadow-lg transition-all duration-300 ease-in-out",
            activeMenu
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-4 opacity-0",
          )}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >
          {mainNavigation
            .filter((item) => item.hasDropdown)
            .map((item) => (
              <div
                key={item.id}
                className={cn(
                  activeMenu === item.id ? "block" : "hidden",
                  "mx-auto max-w-[1920px]",
                )}
              >
                <div className="grid px-4 py-8 sm:px-6 xl:grid-cols-5 xl:px-12">
                  {/* Menu Title */}
                  <div className="hidden xl:block">
                    <h2 className="text-xl font-bold text-gray-700 sm:text-2xl">
                      {item.label[lang]}
                    </h2>
                    {item.subtitle && (
                      <p className="mt-1 text-sm text-gray-500">
                        {item.subtitle[lang]}
                      </p>
                    )}
                  </div>

                  {/* Menu Groups Grid */}
                  <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:col-span-4 xl:grid-cols-4">
                    {item.menuGroups?.map((group, idx) => (
                      <div key={idx}>
                        {/* Group Title - Conditional rendering */}
                        {group.children ? (
                          /* Title WITH children - Not clickable, just a label */
                          <div className="mb-4">
                            <h3 className="text-base font-semibold text-gray-700">
                              {group.label[lang]}
                            </h3>
                          </div>
                        ) : (
                          /* Title WITHOUT children - Clickable with hover effects */
                          <Link
                            href={`/${lang}${group.href}`}
                            className="group/title mb-4 block"
                          >
                            <div className="relative flex w-fit items-center justify-between gap-3">
                              <h3 className="group-hover/title:text-primary-600 text-base font-semibold text-gray-700 transition-colors duration-200">
                                {group.label[lang]}
                              </h3>

                              {/* Icon slides in from right */}
                              <ChevronRight className="text-primary-600 h-4 w-4 flex-shrink-0 -translate-x-2 opacity-0 transition-all duration-200 group-hover/title:translate-x-0 group-hover/title:opacity-100" />

                              {/* Underline Animation - Left to Right */}
                              <span className="bg-primary-600 absolute right-0 bottom-0 left-0 h-[1px] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/title:scale-x-100" />
                            </div>
                          </Link>
                        )}

                        {/* Children List */}
                        {group.children && (
                          <ul className="space-y-2.5">
                            {group.children.map((child, childIdx) => (
                              <li key={childIdx}>
                                <Link
                                  href={`/${lang}${child.href}`}
                                  className="group/child inline-flex items-center gap-2.5 py-1"
                                >
                                  {/* Square Bullet */}
                                  <span className="flex h-1.5 w-1.5 flex-shrink-0 items-center justify-center">
                                    <span className="group-hover/child:bg-primary-600 h-full w-full bg-gray-400 transition-all duration-200" />
                                  </span>

                                  {/* Text with underline matching text width */}
                                  <span className="relative inline-block">
                                    <span className="group-hover/child:text-primary-600 text-sm leading-relaxed text-gray-600 transition-colors duration-200">
                                      {child.label[lang]}
                                    </span>

                                    {/* Underline - matches text width only */}
                                    <span className="bg-primary-600 absolute right-0 bottom-0 left-0 h-[1px] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/child:scale-x-100" />
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </header>

      {/* Mobile Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Search Modal */}
      <SearchDialog />
    </Fragment>
  );
}
