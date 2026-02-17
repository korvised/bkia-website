"use client";

import { Fragment, useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight, ChevronRight } from "lucide-react";
import { GoSearch } from "react-icons/go";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { PiWheelchairDuotone } from "react-icons/pi";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib";
import { useApp } from "@/context/app-context";
import { navigation } from "@/data/navigation";
import { SearchDialog } from "@/components/common";
import { LanguageSelector } from "./language-selector";
import { Sidebar } from "./sidebar";

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { lang, isScrolled, openSearch } = useApp();
  const pathname = usePathname();
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

  const handleMenuItemClick = () => {
    setActiveMenu(null);
  };

  // Check if menu item is active based on current pathname
  const isMenuActive = (href: string) => {
    // Remove language prefix from pathname for comparison
    const pathWithoutLang = pathname.replace(`/${lang}`, "") || "/";

    // Exact match for home
    if (href === "/" && pathWithoutLang === "/") return true;

    // Check if current path starts with menu href (for sub-pages)
    if (href !== "/" && pathWithoutLang.startsWith(href)) return true;

    return false;
  };

  const isHeaderWhite = useMemo(
    () => isScrolled || activeMenu !== null,
    [isScrolled, activeMenu],
  );

  return (
    <Fragment>
      <motion.header
        className={cn(
          "fixed top-0 right-0 left-0 z-50",
          isHeaderWhite ? "shadow-md" : "",
        )}
        initial={{ backgroundColor: "transparent" }}
        animate={{
          backgroundColor: isHeaderWhite ? "#ffffff" : "transparent",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className="mx-auto max-w-[1920px]">
          <div className="flex items-center justify-between px-4 sm:px-6 xl:px-12">
            {/* Mobile Menu Button */}
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
                      ? "https://bkia-website.s3.ap-southeast-7.amazonaws.com/logo/bokeo.png"
                      : "https://bkia-website.s3.ap-southeast-7.amazonaws.com/logo/bokeo_white.png"
                  }
                  alt="Bokeo Airport"
                  fill
                  className="object-contain transition-opacity duration-200 group-hover:opacity-80"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:ml-8 lg:block xl:absolute xl:top-1/2 xl:left-1/2 xl:ml-0 xl:-translate-x-1/2 xl:-translate-y-1/2">
              <ul className="flex items-center">
                {navigation.map((item) => {
                  return (
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

                        {/* Active/Hover Underline */}
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
                  );
                })}
              </ul>
            </nav>

            {/* Right Actions */}
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

              <Link
                className={cn(
                  "hidden rounded-lg p-2 transition-all duration-200 sm:block",
                  isHeaderWhite
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10",
                )}
                href={`/${lang}/guides/custom-services`}
                title="Custom Services"
                aria-label="Custom Services"
              >
                <PiWheelchairDuotone className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>

              <button
                onClick={openSearch}
                className={cn(
                  "rounded-lg p-2 transition-all duration-200 outline-none",
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

        {/* Mega Menu Dropdown - Quick Exit Animation */}
        <AnimatePresence mode="wait">
          {activeMenu && (
            <motion.div
              className="absolute right-0 left-0 w-full bg-white shadow-xl"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.25, ease: "easeOut" },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.15, ease: "easeIn" },
                  opacity: { duration: 0.1, ease: "easeIn" },
                },
              }}
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <motion.div
                className="overflow-hidden"
                initial={{ opacity: 0, y: -8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.2, delay: 0.1 },
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  transition: { duration: 0.1 },
                }}
              >
                <div className="mx-auto max-w-[1920px]">
                  {navigation
                    .filter((item) => item.hasDropdown)
                    .map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          activeMenu === item.id ? "block" : "hidden",
                        )}
                      >
                        {/* Separator Line */}
                        <div className="h-px bg-gray-200" />

                        {/* Grid Layout */}
                        <div className="grid grid-cols-[1fr_auto_1fr] gap-8 px-6 py-10 lg:px-12">
                          {/* Column 1: Page Title & Description */}
                          <div className="flex justify-end">
                            <div className="max-w-xs">
                              <h2 className="text-2xl font-bold text-gray-900">
                                {item.label[lang]}
                              </h2>
                              {item.description && (
                                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                  {item.description[lang]}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Column 2: Menu Items List */}
                          <div className="flex w-80 flex-col gap-y-1 border-l border-gray-200 px-6">
                            {item.menuItems?.map((menuItem, idx) => {
                              const isActive = isMenuActive(menuItem.href);

                              return (
                                <Link
                                  key={idx}
                                  href={`/${lang}${menuItem.href}`}
                                  onClick={handleMenuItemClick}
                                  className={cn(
                                    "group/link flex items-center justify-between gap-x-4 rounded-lg py-3 pr-2 pl-4 transition-all duration-200 sm:pr-4 sm:pl-6",
                                    isActive
                                      ? "bg-primary-50 hover:bg-primary-100"
                                      : "hover:bg-gray-50",
                                  )}
                                >
                                  <div className="grid flex-1">
                                    <span
                                      className={cn(
                                        "text-base font-semibold transition-colors duration-200",
                                        isActive
                                          ? "text-primary-600"
                                          : "group-hover/link:text-primary-600 text-gray-700",
                                      )}
                                    >
                                      {menuItem.label[lang]}
                                    </span>

                                    {menuItem.description && (
                                      <span className="mt-1 text-xs leading-relaxed text-gray-500">
                                        {menuItem.description[lang]}
                                      </span>
                                    )}
                                  </div>
                                  <ChevronRight
                                    className={cn(
                                      "text-primary-600 h-4 w-4 flex-shrink-0 transition-all duration-200",
                                      isActive
                                        ? "translate-x-0 opacity-100"
                                        : "-translate-x-1 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100",
                                    )}
                                  />
                                </Link>
                              );
                            })}
                          </div>

                          {/* Column 3: Featured Content Card */}
                          {item.featuredContent && (
                            <div className="flex items-start">
                              <div className="w-80">
                                <div className="group/card hover:border-primary-200 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                                  {/* Featured Image */}
                                  <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                                    <Image
                                      src={item.featuredContent.image}
                                      alt={item.featuredContent.title[lang]}
                                      fill
                                      className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                                      sizes="320px"
                                    />
                                  </div>

                                  {/* Content */}
                                  <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-900">
                                      {item.featuredContent.title[lang]}
                                    </h3>

                                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                      {item.featuredContent.description[lang]}
                                    </p>

                                    {/* CTA Link */}
                                    {item.featuredContent.link && (
                                      <Link
                                        href={`/${lang}${item.featuredContent.link.href}`}
                                        onClick={handleMenuItemClick}
                                        className="group/cta text-primary-600 hover:text-primary-700 mt-4 inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                                      >
                                        <span>
                                          {
                                            item.featuredContent.link.label[
                                              lang
                                            ]
                                          }
                                        </span>
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                                      </Link>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Search Dialog */}
      <SearchDialog />
    </Fragment>
  );
}
