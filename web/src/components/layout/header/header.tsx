"use client";

import { Fragment, useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight } from "lucide-react";
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
import { MENU_ICONS } from "./menu-icons";
import { tHeader } from "@/data/i18n/layout";

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
    if (hasDropdown) {
      setActiveMenu(id);
    } else {
      // Standalone link — close any open dropdown immediately
      setActiveMenu(null);
    }
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

  const isMenuActive = (href: string) => {
    const pathWithoutLang = pathname.replace(`/${lang}`, "") || "/";
    if (href === "/" && pathWithoutLang === "/") return true;
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
                      {item.hasDropdown ? (
                        /* ── Dropdown trigger — underline animation ── */
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

                          {/* Underline bar — expands on hover / stays while dropdown is open */}
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
                      ) : (
                        /* ── Standalone link (Careers) — pill hover animation ── */
                        <Link
                          href={`/${lang}${item.href}`}
                          className={cn(
                            "relative flex h-full items-center justify-center px-3 transition-all duration-300 ease-in-out lg:px-4 xl:px-5",
                            isScrolled ? "py-5" : "py-9",
                          )}
                        >
                          <span
                            className={cn(
                              "text-sm font-semibold whitespace-nowrap transition-colors duration-200 xl:text-base",
                              isHeaderWhite
                                ? "text-gray-800 hover:text-[#00AAAC]"
                                : "text-white hover:text-white/70",
                              isMenuActive(item.href) && isHeaderWhite
                                ? "text-[#00AAAC]"
                                : "",
                            )}
                          >
                            {item.label[lang]}
                          </span>
                        </Link>
                      )}
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

        {/* ── Mega Menu Dropdown ── */}
        <AnimatePresence mode="wait">
          {activeMenu && (
            <motion.div
              className="absolute right-0 left-0 w-full bg-white"
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
                className="overflow-hidden border-t border-gray-100"
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
                <div>
                  {navigation
                    .filter((item) => item.hasDropdown)
                    .map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          activeMenu === item.id ? "block" : "hidden",
                        )}
                      >
                        <div className="container py-7">
                          {/* Section header */}
                          <div className="mb-5 flex items-start justify-between gap-4">
                            <div>
                              <h2 className="text-base font-bold text-gray-900 lg:text-lg">
                                {item.label[lang]}
                              </h2>
                              {item.description && (
                                <p className="mt-0.5 text-xs text-gray-500 lg:text-sm">
                                  {item.description[lang]}
                                </p>
                              )}
                            </div>
                            <Link
                              href={`/${lang}${item.href}`}
                              onClick={handleMenuItemClick}
                              className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#e6f7f8] px-3 py-1.5 text-xs font-semibold text-[#00AAAC] transition-colors duration-200 hover:bg-[#00AAAC] hover:text-white"
                            >
                              <span className="hidden sm:inline">{tHeader("viewAll", lang)}</span>
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>

                          {/* Content row: items + featured card */}
                          <div className="flex items-stretch gap-5 xl:gap-8">
                            {/* Menu items — 2-column grid */}
                            <div className="flex-1 grid grid-cols-2 gap-1 content-start">
                              {item.menuItems?.map((menuItem, idx) => {
                                const Icon =
                                  MENU_ICONS[menuItem.href] ?? ArrowRight;
                                const isActive = isMenuActive(menuItem.href);

                                return (
                                  <Link
                                    key={idx}
                                    href={`/${lang}${menuItem.href}`}
                                    onClick={handleMenuItemClick}
                                    className={cn(
                                      "group/link flex items-start gap-3 rounded-xl p-3 transition-all duration-200",
                                      isActive
                                        ? "bg-[#e6f7f8]"
                                        : "hover:bg-gray-50",
                                    )}
                                  >
                                    {/* Icon tile */}
                                    <div
                                      className={cn(
                                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
                                        isActive
                                          ? "bg-[#00AAAC]"
                                          : "bg-[#f0fbfc] group-hover/link:bg-[#e6f7f8]",
                                      )}
                                    >
                                      <Icon
                                        className={cn(
                                          "h-4 w-4",
                                          isActive
                                            ? "text-white"
                                            : "text-[#00AAAC]",
                                        )}
                                      />
                                    </div>

                                    {/* Text */}
                                    <div className="min-w-0">
                                      <span
                                        className={cn(
                                          "block text-sm font-semibold leading-snug transition-colors duration-200",
                                          isActive
                                            ? "text-[#007a7c]"
                                            : "text-gray-800 group-hover/link:text-[#00AAAC]",
                                        )}
                                      >
                                        {menuItem.label[lang]}
                                      </span>
                                      {menuItem.description && (
                                        <span className="mt-0.5 block text-xs leading-relaxed text-gray-500">
                                          {menuItem.description[lang]}
                                        </span>
                                      )}
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>

                            {/* Featured card — full-height image with overlay */}
                            {item.featuredContent && (
                              <div className="relative hidden w-52 shrink-0 self-stretch min-h-44 xl:block xl:w-60">
                                <Link
                                  href={`/${lang}${item.href}`}
                                  onClick={handleMenuItemClick}
                                  className="group/card absolute inset-0 block overflow-hidden rounded-2xl"
                                >
                                  <Image
                                    src={item.featuredContent.image}
                                    alt={item.featuredContent.title[lang]}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                                    sizes="240px"
                                  />
                                  {/* Gradient overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                                  {/* Text overlay */}
                                  <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h3 className="text-sm font-bold leading-snug text-white">
                                      {item.featuredContent.title[lang]}
                                    </h3>
                                    <p className="mt-1 text-xs leading-relaxed text-white/70">
                                      {item.featuredContent.description[lang]}
                                    </p>
                                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#4dd8da] transition-all duration-200 group-hover/card:gap-2">
                                      {tHeader("explore", lang)}{" "}
                                      <ArrowRight className="h-3 w-3" />
                                    </span>
                                  </div>
                                </Link>
                              </div>
                            )}
                          </div>
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
