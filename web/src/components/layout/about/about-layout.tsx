"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { aboutUsItems } from "@/data/navigation";
import { Lang } from "@/types/language";
import { cn } from "@/utils/cn";
import { Map, MapPinned } from "lucide-react";

interface AboutLayoutProps {
  lang: Lang;
  children: React.ReactNode;
}

export const AboutLayout: React.FC<AboutLayoutProps> = ({ lang, children }) => {
  const pathname = usePathname();

  // Get the first 7 services for the horizontal menu
  const menuItems = aboutUsItems.slice(0, 7);

  return (
    <div>
      <div className="relative h-72 w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/services/passenger_banner.jpg)",
          }}
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col justify-between px-4 sm:px-6 md:px-8 xl:px-16 2xl:px-32">
          {/* Page Title */}
          <div className="flex items-center justify-center pt-40 md:justify-start">
            <h1 className="text-2xl font-bold text-white md:text-4xl">
              {lang === "zh"
                ? "关于我们"
                : lang === "lo"
                  ? "ກ່ຽວກັບພວກເຮົາ"
                  : "About Us"}
            </h1>
          </div>

          {/* Navigation Menu */}
          <div className="hidden pb-4 md:block">
            <nav className="services-nav-scroll horizontal-scroll flex items-center gap-x-4 overflow-x-auto">
              {menuItems.map((item) => {
                const isActive = pathname.includes(item.href);

                return (
                  <Link
                    key={item.id}
                    href={`/${lang}/${item.href}`}
                    className={cn(
                      "group relative flex flex-shrink-0 items-center border-b-2 pb-2 text-sm font-medium whitespace-nowrap transition-all duration-200",
                      isActive
                        ? "border-white text-white"
                        : "border-transparent text-white/80 hover:border-white/50 hover:text-white",
                    )}
                  >
                    {item.title[lang]}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Right side icons */}
        <div className="absolute top-60 right-0 z-20 w-full md:top-46 md:right-8 md:w-fit xl:right-16 2xl:right-32">
          <div className="flex w-full items-center justify-center space-x-4 text-white">
            <Link
              href={`/${lang}/bokeo-visit`}
              className="flex items-center space-x-2 text-sm"
            >
              <MapPinned className="h-5 w-5" />
              <span>
                {lang === "zh"
                  ? "博胶旅游"
                  : lang === "lo"
                    ? "ທ່ອງທ່ຽວບໍ່ແກ້ວ"
                    : "Bokeo Visit"}
              </span>
            </Link>

            <span className="h-5 w-[1px] bg-white" />

            <div className="flex items-center space-x-2 text-sm">
              <Map className="h-5 w-5" />
              <span>
                {lang === "zh"
                  ? "航站楼地图"
                  : lang === "lo"
                    ? "ແຜນທີ່ປາຍທາງ"
                    : "Terminal Map"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
};
