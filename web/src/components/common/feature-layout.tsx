"use client";

import { Fragment, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Home } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { MenuItem } from "@headlessui/react";
import { useApp } from "@/context";
import { cn } from "@/lib";
import { Lang } from "@/types/language";
import { navigation, MenuItem as IMenuItem } from "@/data/navigation";
import { BreadcrumbDropdown } from "./breadcrumb-dropdown";

interface FeatureLayoutProps {
  lang: Lang;
  title: string;
  menuItems: IMenuItem[];
  preserveQuery?: boolean | string[];
  children: React.ReactNode;
}

export function FeatureLayout({
  lang,
  title,
  menuItems,
  children,
  preserveQuery = false,
}: FeatureLayoutProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useApp();

  const activeMenu = useMemo(
    () => menuItems.find((item) => pathname.includes(item.href)),
    [pathname, menuItems],
  );

  // Helper function to build URL with query params
  const buildUrl = (href: string) => {
    if (!preserveQuery) {
      return href;
    }

    const params = new URLSearchParams();

    if (preserveQuery === true) {
      // Preserve all query params
      searchParams.forEach((value, key) => {
        params.set(key, value);
      });
    } else if (Array.isArray(preserveQuery)) {
      // Preserve only specified query params
      preserveQuery.forEach((key) => {
        const value = searchParams.get(key);
        if (value !== null) {
          params.set(key, value);
        }
      });
    }

    const queryString = params.toString();
    return queryString ? `${href}?${queryString}` : href;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 w-full overflow-hidden sm:h-72">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://bkia-website.s3.ap-southeast-7.amazonaws.com/carousel/001.jpg)",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col">
          <div className="container flex flex-1 flex-col justify-center gap-y-4 pt-28 sm:gap-y-6">
            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                {title}
              </h1>
            </div>

            {/* Breadcrumb Navigation */}
            <nav
              className="relative z-[100] flex items-center gap-3 text-base text-white/90 sm:text-lg"
              aria-label="Breadcrumb"
            >
              {/* Home Link */}
              <Link
                href={buildUrl(`/${lang}`)}
                className="flex items-center transition-colors hover:text-white"
                aria-label="Home"
              >
                <Home className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>

              <ChevronRight className="h-4 w-4 text-white/60" />

              {/* Section Dropdown */}
              <BreadcrumbDropdown
                trigger={(open: boolean) => (
                  <Fragment>
                    <span className="font-medium">{title}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200 sm:h-5 sm:w-5",
                        open && "rotate-180",
                      )}
                    />
                  </Fragment>
                )}
                items={navigation.map((item) => (
                  <MenuItem key={item.id}>
                    <Link
                      href={buildUrl(`/${lang}${item.href}`)}
                      className={cn(
                        "flex w-full items-center rounded-md px-3 py-2.5 text-sm transition-colors",
                        "hover:bg-[#f0fbfc] hover:text-[#00AAAC]",
                        "focus:bg-[#f0fbfc] focus:text-[#00AAAC] active:bg-[#e0f5f6]",
                        pathname.includes(item.href)
                          ? "bg-[#f0fbfc] text-[#00AAAC] font-medium"
                          : "text-gray-900",
                      )}
                    >
                      {t(item.label)}
                    </Link>
                  </MenuItem>
                ))}
              />

              <ChevronRight className="h-3.5 w-3.5 text-white/40" />

              {/* Sub-section Dropdown */}
              <BreadcrumbDropdown
                trigger={(open: boolean) => (
                  <>
                    <span className="font-medium">
                      {activeMenu
                        ? activeMenu.label[lang]
                        : menuItems[0].label[lang]}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200 sm:h-5 sm:w-5",
                        open && "rotate-180",
                      )}
                    />
                  </>
                )}
                items={menuItems.map((item) => (
                  <MenuItem key={item.href}>
                    <Link
                      href={buildUrl(`/${lang}${item.href}`)}
                      className={cn(
                        "flex w-full items-center rounded-md px-3 py-2.5 text-sm transition-colors",
                        "hover:bg-[#f0fbfc] hover:text-[#00AAAC]",
                        "focus:bg-[#f0fbfc] focus:text-[#00AAAC] active:bg-[#e0f5f6]",
                        pathname.includes(item.href)
                          ? "bg-[#f0fbfc] text-[#00AAAC] font-medium"
                          : "text-gray-900",
                      )}
                    >
                      {t(item.label)}
                    </Link>
                  </MenuItem>
                ))}
              />
            </nav>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="bg-white border-b border-[#d0eeef] shadow-[0_2px_12px_rgba(0,170,172,0.08)]">
        <div className="container">
          <nav
            className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Section navigation"
          >
            {menuItems.map((item) => {
              const isActive = pathname.includes(item.href);
              return (
                <Link
                  key={item.href}
                  href={buildUrl(`/${lang}${item.href}`)}
                  className={cn(
                    "relative flex-shrink-0 px-6 py-4 text-base font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-none",
                    isActive
                      ? "text-[#00AAAC]"
                      : "text-gray-600 hover:text-gray-900",
                  )}
                >
                  {t(item.label)}
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#00AAAC]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50">{children}</div>
    </div>
  );
}
