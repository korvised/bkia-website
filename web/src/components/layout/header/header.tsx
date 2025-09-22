"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Home, Globe, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import Sidebar from "./sidebar";
import LanguageSelector from "./language-selector";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check the initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="flex justify-between items-center p-4 w-full px-6">

          {/* Left Section - Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300",
                isScrolled
                  ? "border border-gray-300 hover:bg-gray-100 text-gray-700"
                  : "border border-white/30 hover:bg-white/10 text-white"
              )}
            >
              {isSidebarOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
              <span className="hidden md:inline text-sm font-medium">menu</span>
            </button>

            <Link
              href="/"
              className={cn(
                "p-2 rounded-lg transition-all duration-300",
                isScrolled
                  ? "hover:bg-gray-100"
                  : "hover:bg-white/10"
              )}
            >
              <Home className={cn(
                "w-5 h-5 transition-colors duration-300",
                isScrolled ? "text-gray-700" : "text-white"
              )} />
            </Link>
          </div>

          {/* Center Section - Airport Logo and Name */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="flex items-center space-x-3">
              <div className={cn(
                "flex flex-col items-center text-center transition-colors duration-300",
                isScrolled ? "text-gray-900" : "text-white"
              )}>
                <span className="text-sm tracking-wide md:text-base md:tracking-wider font-lao leading-tight">
                  ສະໜາມບິນສາກົນບໍ່ແກ້ວ
                </span>
                <span className="text-xs tracking-tight md:text-sm font-medium">
                  Bokeo International Airport
                </span>
              </div>

              <div className="relative w-11 h-11 md:w-14 md:h-12">
                <Image
                  src={isScrolled ? "/images/logo/logo.png" : "/images/logo/logo_white.png"}
                  alt="Bokeo Airport Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Right Section - Language and Notifications */}
          <div className="flex items-center space-x-3">
            <LanguageSelector isScrolled={isScrolled} />

            <Link
              href="/news?urgent=true"
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300",
                isScrolled
                  ? "hover:bg-gray-100 text-gray-700"
                  : "hover:bg-white/10 text-white"
              )}
            >
              <Bell className="w-4 h-4 text-orange-500" />
              <span className="hidden md:inline text-xs font-medium">
                Important Notice
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
