"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarItems } from "@/data/sidebar";
import { Lang } from "@/types/language";

interface RightSidebarProps {
  lang: Lang;
}

export default function RightSidebar({ lang }: RightSidebarProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                href={item.href}
                className={cn(
                  "h-16 w-[4.5rem] rounded-l-lg backdrop-blur-md transition-all duration-300",
                  "flex flex-col items-center justify-center",
                  "bg-bokeo-teal-600/90 text-white shadow-lg",
                  "hover:bg-bokeo-teal-500 hover:shadow-xl",
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
              "group relative h-12 w-12 cursor-pointer rounded-xl backdrop-blur-md transition-all duration-300",
              "bg-bokeo-teal-500 text-white",
              "shadow-bokeo-teal-600/20 shadow-lg",
              "hover:shadow-bokeo-teal-600/30 hover:scale-105 hover:shadow-xl",
              "flex flex-col items-center justify-center overflow-hidden",
              "border border-white/10",
            )}
          >
            {/* Animated background pulse */}
            <div className="bg-bokeo-teal-500 absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Flight path trail */}
            <div className="absolute bottom-0 left-1/2 h-0 w-0.5 -translate-x-1/2 transform rounded-full bg-white/20 transition-all duration-500 group-hover:h-8 group-hover:bg-white/40" />

            {/* Plane icon - flies up on hover */}
            <Plane className="relative z-10 mb-0.5 h-5 w-5 -rotate-45 transform transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110" />

            {/* TOP text - hides on hover */}
            <span className="relative z-10 text-[8px] leading-none font-medium opacity-90 transition-all duration-300 group-hover:opacity-0">
              TOP
            </span>

            {/* Subtle glow effect */}
            <div className="bg-bokeo-teal-400/20 absolute inset-0 rounded-xl opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </div>
      )}
    </Fragment>
  );
}
