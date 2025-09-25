"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { passengerItems } from "@/data/navigation";
import { Lang } from "@/types/language";
import { cn } from "@/lib/utils";
import { Map, MapPinned } from "lucide-react";

interface ServicesHeroProps {
  lang: Lang;
  children: React.ReactNode;
}

export const ServicesLayout: React.FC<ServicesHeroProps> = ({
  lang,
  children,
}) => {
  const pathname = usePathname();

  // Get the first 7 services for the horizontal menu
  const menuItems = passengerItems.slice(0, 7);

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
        <div className="relative z-10 flex h-full flex-col justify-between">
          {/* Page Title */}
          <div className="flex items-center justify-center pt-40 pl-4 md:justify-start md:pt-36 lg:px-8 xl:px-16">
            <h1 className="text-2xl font-bold text-white md:text-4xl">
              {lang === "zh"
                ? "旅客服务"
                : lang === "lo"
                  ? "ບໍລິການຜູ້ໂດຍສານ"
                  : "Passenger Services"}
            </h1>
          </div>

          {/* Navigation Menu */}
          <div className="hidden px-4 pb-4 md:block lg:px-8 xl:px-16">
            <nav className="services-nav-scroll flex items-center gap-x-4 overflow-x-auto">
              {menuItems.map((item) => {
                const isActive = pathname.includes(item.href);

                return (
                  <Link
                    key={item.id}
                    href={item.href}
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
        <div className="absolute top-60 right-0 z-20 w-full md:top-46 md:right-16 md:w-fit">
          <div className="flex w-full items-center justify-center space-x-4 text-white">
            <div className="flex items-center space-x-2 text-sm">
              <MapPinned className="h-5 w-5" />
              <span>
                {lang === "zh"
                  ? "文化活动"
                  : lang === "lo"
                    ? "ກິດຈະກຳວັດທະນະທຳ"
                    : "Cultural Activities"}
              </span>
            </div>

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
      {children}
    </div>
  );
};
