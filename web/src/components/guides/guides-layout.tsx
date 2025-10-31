"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "@headlessui/react";
import { ChevronDown, Home } from "lucide-react";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { Lang } from "@/types/language";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/app-context";
import { BreadcrumDropdown } from "@/components/common";
import { mainNavigation, MenuItem as IMenuItem } from "@/data/main-navigation";

interface GuidesLayoutProps {
  lang: Lang;
  children: React.ReactNode;
}

// Guides menu items
const guildeMenuItems: IMenuItem[] = (mainNavigation.find(
  (m) => m.id === "guides"
)?.menuItems || []) as IMenuItem[];

// Translations
const translations = {
  title: {
    en: "Passenger Guide",
    lo: "ຄູ່ມືຜູ້ໂດຍສານ",
    zh: "乘客指南"
  },
  label: {
    en: "Passenger Guide",
    lo: "ຄູ່ມືຜູ້ໂດຍສານ",
    zh: "乘客指南"
  }
};

export function GuidesLayout({ lang, children }: GuidesLayoutProps) {
  const pathname = usePathname();
  const { t } = useApp();

  // Determine the current flight section
  const currentSection = guildeMenuItems.find((item) =>
    pathname.includes(item.href)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background */}
      <div className="relative h-64 w-full overflow-hidden sm:h-72">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/wallpaper/001.jpg)"
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col">
          <div className="container flex flex-1 flex-col justify-center gap-y-4 pt-20 sm:gap-y-6">
            {/* Small label */}
            <div>
              <span className="text-xs font-medium tracking-wider text-white/90 uppercase sm:text-sm">
                {t(translations.label)}
              </span>
            </div>

            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                {t(translations.title)}
              </h1>
            </div>

            {/* Breadcrumb Navigation */}
            <nav
              className="relative z-[100] flex items-center gap-3 text-base text-white/90 sm:text-lg"
              aria-label="Breadcrumb"
            >
              {/* Home Link */}
              <Link
                href={`/${lang}`}
                className="flex items-center transition-colors hover:text-white"
                aria-label="Home"
              >
                <Home className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>

              <HiOutlineChevronRight className="h-4 w-4 text-white/60 sm:h-4.5 sm:w-4.5" />

              {/* Guidess Dropdown */}
              <BreadcrumDropdown
                trigger={(open: boolean) => (
                  <Fragment>
                    <span className="font-medium">
                      {t(translations.title)}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200 sm:h-5 sm:w-5",
                        open && "rotate-180"
                      )}
                    />
                  </Fragment>
                )}
                items={mainNavigation.map((item) => (
                  <MenuItem key={item.id}>
                    <Link
                      href={`/${lang}${item.href}`}
                      className={cn(
                        "flex w-full items-center rounded-md px-3 py-2.5 text-sm transition-colors",
                        "hover:bg-primary-50 hover:text-primary-700",
                        "focus:bg-primary-50 focus:text-primary-700 active:bg-primary-100",
                        pathname.includes(item.href)
                          ? "bg-primary-50 text-primary-700 font-medium"
                          : "text-gray-900"
                      )}
                    >
                      {t(item.label)}
                    </Link>
                  </MenuItem>
                ))}
              />

              <HiOutlineChevronRight className="h-4 w-4 text-white/60 sm:h-4.5 sm:w-4.5" />

              {/* Guides Section Dropdown */}
              <BreadcrumDropdown
                trigger={(open: boolean) => (
                  <>
                    <span className="font-medium">
                      {currentSection
                        ? t(currentSection.label)
                        : t(guildeMenuItems[0].label)}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200 sm:h-5 sm:w-5",
                        open && "rotate-180"
                      )}
                    />
                  </>
                )}
                items={guildeMenuItems.map((item) => (
                  <MenuItem key={item.href}>
                    <Link
                      href={`/${lang}${item.href}`}
                      className={cn(
                        "flex w-full items-center rounded-md px-3 py-2.5 text-sm transition-colors",
                        "hover:bg-primary-50 hover:text-primary-700",
                        "focus:bg-primary-50 focus:text-primary-700 active:bg-primary-100",
                        pathname.includes(item.href)
                          ? "bg-primary-50 text-primary-700 font-medium"
                          : "text-gray-900"
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

      {/* Main Content */}
      <div className="bg-gray-50">
        <div className="container py-8">{children}</div>
      </div>
    </div>
  );
}
