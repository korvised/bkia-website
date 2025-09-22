"use client";

import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import {
  ArrowUp,
  Building,
  FileText,
  HelpCircle,
  Newspaper,
  Plane,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    id: "party",
    title: "Airport\nParty\nBuilding",
    icon: Users,
    href: "/about/management"
  },
  {
    id: "news",
    title: "Airport\nNews",
    icon: Newspaper,
    href: "/news"
  },
  {
    id: "bidding",
    title: "Bidding\nInformation",
    icon: FileText,
    href: "/about/procurement"
  },
  {
    id: "flights",
    title: "Flight\nInformation",
    icon: Plane,
    href: "/flights"
  },
  {
    id: "business",
    title: "Business\nInformation",
    icon: Building,
    href: "/services/business"
  },
  {
    id: "help",
    title: "Help &\nSupport",
    icon: HelpCircle,
    href: "/contact"
  }
];

export default function RightSidebar() {
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
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-30 hidden xl:block">
        <div className="flex flex-col space-y-1">

          {/* Navigation Items */}
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "w-[4.5rem] h-16 bg-dark backdrop-blur-md text-white transition-all duration-300 rounded-l-lg",
                  "hover:bg-primary flex flex-col items-center justify-center",
                  "border-l-4 border-transparent hover:border-white/50"
                )}
              >
                <IconComponent className="w-5 h-5 mb-1 transition-transform" />
                <div className="text-[10px] leading-tight font-medium text-center whitespace-pre-line">
                  {item.title}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <div className="fixed bottom-4 right-4 z-30 hidden xl:block">
          <button
            onClick={scrollToTop}
            className={cn(
              "w-12 h-12 bg-gray-700/90 hover:bg-gray-600 text-white rounded-full shadow-lg transition-all duration-300",
              "flex items-center justify-center group backdrop-blur-sm",
              "hover:scale-110 hover:shadow-xl"
            )}
          >
            <ArrowUp className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-1 transition-all" />
          </button>
        </div>
      )}
    </Fragment>
  );
}
