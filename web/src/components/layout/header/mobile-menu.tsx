// src/components/layout/header/mobile-menu.tsx (Updated with scroll state)
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { NAVIGATION_ITEMS, type NavigationItem } from "@/lib/constants";

interface MobileMenuProps {
  isScrolled: boolean;
}

export default function MobileMenu({ isScrolled }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setExpandedItems([]);
    }
  };

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev =>
      prev.includes(href)
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
          isScrolled
            ? "hover:bg-gray-100"
            : "hover:bg-white/10"
        }`}
        aria-label="Toggle mobile menu"
      >
        {isOpen ? (
          <X className={`w-5 h-5 transition-colors duration-300 ${
            isScrolled ? "text-gray-700" : "text-white"
          }`} />
        ) : (
          <Menu className={`w-5 h-5 transition-colors duration-300 ${
            isScrolled ? "text-gray-700" : "text-white"
          }`} />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMenu}
          />

          {/* Menu Panel */}
          <div className="absolute top-0 left-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl animate-slide-in">

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 bg-gradient-to-r from-bokeo-teal-500 to-bokeo-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Menu</div>
                  <div className="text-xs text-gray-500">Navigation</div>
                </div>
              </div>
              <button
                onClick={toggleMenu}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="py-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              {NAVIGATION_ITEMS.map((item: NavigationItem) => (
                <div key={item.href} className="mb-2">

                  {/* Main Item */}
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={toggleMenu}
                      className="flex-1 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-gray-500 font-lao mt-1">
                        {item.titleLao}
                      </div>
                    </Link>

                    {/* Expand Button */}
                    {item.children && item.children.length > 0 && (
                      <button
                        onClick={() => toggleExpanded(item.href)}
                        className="p-3 hover:bg-gray-50 transition-colors"
                      >
                        {expandedItems.includes(item.href) ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Submenu */}
                  {item.children && item.children.length > 0 && expandedItems.includes(item.href) && (
                    <div className="bg-gray-50 border-l-2 border-bokeo-teal-200 ml-6">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={toggleMenu}
                          className="block px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-bokeo-teal-700 transition-colors"
                        >
                          <div className="font-medium text-sm">{child.title}</div>
                          <div className="text-xs text-gray-400 font-lao mt-1">
                            {child.titleLao}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 border-t border-gray-200">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900">
                  Bokeo International Airport
                </div>
                <div className="text-xs text-gray-500 font-lao">
                  ສະໜາມບິນສາກົນບໍ່ແກ້ວ
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
