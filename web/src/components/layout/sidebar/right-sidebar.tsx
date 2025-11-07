"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { ChevronUp, Plane } from "lucide-react";
import { cn } from "@/utils/cn";
import { sidebarItems } from "@/data/right-sidebar";
import { Lang } from "@/types/language";

interface RightSidebarProps {
  lang: Lang;
}

export default function RightSidebar({ lang }: RightSidebarProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    setIsClicked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Reset click animation after takeoff
    setTimeout(() => {
      setIsClicked(false);
    }, 800);
  };

  return (
    <Fragment>
      <div className="fixed top-1/2 right-0 z-30 hidden -translate-y-1/2 transform xl:block">
        <div className="flex flex-col space-y-1">
          {/* Navigation Items */}
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;

            return (
              <Link
                key={item.id}
                href={`/${lang}/${item.href}`}
                className={cn(
                  "h-16 w-[3.8rem] rounded-l-lg backdrop-blur-md transition-all duration-300",
                  "flex flex-col items-center justify-center",
                  "bg-primary-600/90 text-white shadow-lg",
                  "hover:bg-primary-500 hover:shadow-xl",
                  "border-l-4 border-transparent hover:border-white/50",
                )}
              >
                <IconComponent className="mb-1 h-5 w-5 transition-transform duration-200 hover:scale-110" />
                <div className="text-center text-[10px] leading-tight font-medium whitespace-pre-line">
                  {item.title[lang]}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Scroll to Top Button - Airport Themed */}
      {showScrollTop && (
        <div className="fixed right-5 bottom-5 z-30 hidden xl:block">
          <button
            onClick={scrollToTop}
            className={cn(
              "group relative h-11 w-11 cursor-pointer rounded-full backdrop-blur-md transition-all duration-300",
              "bg-gray-200/50 text-white",
              "shadow-primary-600/25 shadow-lg",
              "hover:shadow-primary-600/40 hover:scale-105 hover:shadow-xl",
              "flex flex-col items-center justify-center overflow-hidden",
              "border border-white/10",
            )}
          >
            {/* Contrail/flight path */}
            <div
              className={cn(
                "absolute bottom-0 left-1/2 w-0.5 -translate-x-1/2 transform rounded-full transition-all duration-500",
                "bg-gradient-to-t from-white/30 to-transparent",
                "h-0 group-hover:h-6",
                isClicked &&
                  "!h-8 !bg-gradient-to-t !from-white/60 !to-white/20",
              )}
            />

            {/* Plane icon with sophisticated animation */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
              {/* Initial: Up icon */}
              <ChevronUp
                className={cn(
                  "text-[10px] leading-none font-semibold text-white transition-all duration-300",
                  "group-hover:-translate-y-1 group-hover:opacity-0",
                  isClicked ? "opacity-0" : "opacity-90",
                )}
              />

              {/* Hover: Plane flies in from bottom */}
              <Plane
                className={cn(
                  "absolute h-4.5 w-4.5 -rotate-45 transform transition-all duration-500 ease-out",
                  // Initial position (hidden below)
                  "translate-y-6 scale-75 opacity-0",
                  // Hover: flies in and settles
                  "group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100",
                  // Click: takes off dramatically
                  isClicked &&
                    "!-translate-y-6 !scale-125 !-rotate-12 !opacity-0 !duration-800",
                )}
              />
            </div>

            {/* Takeoff blast effect */}
            <div
              className={cn(
                "absolute inset-0 rounded-xl bg-white/20 transition-all duration-300",
                isClicked ? "scale-110 opacity-0" : "scale-100 opacity-0",
              )}
            />

            {/* Sky glow effect on click */}
            <div
              className={cn(
                "absolute inset-0 rounded-xl bg-gradient-to-t from-transparent to-sky-400/20 transition-opacity duration-500",
                isClicked ? "opacity-100" : "opacity-0",
              )}
            />
          </button>
        </div>
      )}
    </Fragment>
  );
}
