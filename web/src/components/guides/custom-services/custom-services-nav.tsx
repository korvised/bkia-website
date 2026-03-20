"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Baby, Accessibility, PawPrint } from "lucide-react";
import { Lang } from "@/types/language";
import { createCustomServicesI18n } from "@/data/i18n/guide";
import { cn } from "@/lib";

const navItems = [
  {
    slug: "pregnancy-and-children",
    icon: Baby,
    titleKey: "pregnancyTitle" as const,
  },
  {
    slug: "mobility-challenges",
    icon: Accessibility,
    titleKey: "mobilityTitle" as const,
  },
  {
    slug: "traveling-with-pets",
    icon: PawPrint,
    titleKey: "petsTitle" as const,
  },
] as const;

interface Props {
  lang: Lang;
}

export const CustomServicesNav = ({ lang }: Props) => {
  const pathname = usePathname();
  const { customServices: t } = createCustomServicesI18n(lang);

  return (
    <div className="sticky top-0 z-20 bg-white">
      <div className="container">
        <nav
          aria-label="Custom services sections"
          className="flex gap-2 overflow-x-auto py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {navItems.map(({ slug, icon: Icon, titleKey }, i) => {
            const isActive = pathname.includes(slug);
            return (
              <Link
                key={slug}
                href={`/${lang}/guides/custom-services/${slug}`}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full px-3 py-2.5 text-sm transition-colors md:px-5",
                  isActive
                    ? "bg-[#00AAAC] font-semibold text-white"
                    : "bg-gray-100 font-medium text-gray-600 hover:bg-gray-200 hover:text-gray-800",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-white text-gray-500",
                  )}
                >
                  {i + 1}
                </span>
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden whitespace-nowrap md:inline">
                  {t[titleKey]}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
