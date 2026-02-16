"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Baby, Accessibility, PawPrint } from "lucide-react";
import { Lang } from "@/types/language";
import { createCustomServicesI18n } from "@/data/i18n/guide";

const navItems = [
  {
    slug: "pregnancy-and-children",
    icon: Baby,
    titleKey: "pregnancyTitle" as const,
    iconColor: "text-pink-500",
    activeBg: "bg-pink-50",
    activeBorder: "border-pink-400",
    activeText: "text-pink-600",
    activeIcon: "bg-pink-100",
  },
  {
    slug: "mobility-challenges",
    icon: Accessibility,
    titleKey: "mobilityTitle" as const,
    iconColor: "text-blue-500",
    activeBg: "bg-blue-50",
    activeBorder: "border-blue-400",
    activeText: "text-blue-600",
    activeIcon: "bg-blue-100",
  },
  {
    slug: "traveling-with-pets",
    icon: PawPrint,
    titleKey: "petsTitle" as const,
    iconColor: "text-amber-500",
    activeBg: "bg-amber-50",
    activeBorder: "border-amber-400",
    activeText: "text-amber-600",
    activeIcon: "bg-amber-100",
  },
];

interface Props {
  lang: Lang;
}

export const CustomServicesNav = ({ lang }: Props) => {
  const pathname = usePathname();
  const { customServices: t } = createCustomServicesI18n(lang);

  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="container">
        <div className="horizontal-scroll flex overflow-x-auto">
          {navItems.map(
            ({
              slug,
              icon: Icon,
              titleKey,
              iconColor,
              activeBg,
              activeBorder,
              activeText,
              activeIcon,
            }) => {
              const isActive = pathname.includes(slug);
              return (
                <Link
                  key={slug}
                  href={`/${lang}/guides/custom-services/${slug}`}
                  className={`relative flex shrink-0 items-center gap-2.5 px-5 py-4 text-sm font-medium transition-all ${
                    isActive
                      ? `${activeBg} ${activeText}`
                      : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                  }`}
                >
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 w-full ${activeBorder}`}
                    />
                  )}
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
                      isActive ? activeIcon : "bg-gray-100"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 transition-colors ${
                        isActive ? iconColor : "text-gray-400"
                      }`}
                    />
                  </div>
                  <span className="hidden sm:block">{t[titleKey]}</span>
                </Link>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
};
