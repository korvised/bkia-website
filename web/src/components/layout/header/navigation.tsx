import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NAVIGATION_ITEMS, type NavigationItem } from "@/lib/constants";

interface NavigationProps {
  isScrolled: boolean;
}

export default function Navigation({ isScrolled }: NavigationProps) {
  return (
    <nav className={`transition-all duration-500 ${
      isScrolled
        ? "bg-white/80 backdrop-blur-sm border-t border-gray-200/50"
        : "bg-white/5 backdrop-blur-sm border-t border-white/10"
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center space-x-8 py-4">
          {NAVIGATION_ITEMS.map((item: NavigationItem) => (
            <div key={item.href} className="relative group">
              {/* Main Navigation Item */}
              <Link
                href={item.href}
                className={`flex items-center font-medium transition-colors duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:text-bokeo-teal-600"
                    : "text-white hover:text-bokeo-teal-200"
                }`}
              >
                <span>{item.title}</span>
                {item.children && item.children.length > 0 && (
                  <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-200" />
                )}
              </Link>

              {/* Dropdown Menu */}
              {item.children && item.children.length > 0 && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-3 text-gray-700 hover:bg-bokeo-teal-50 hover:text-bokeo-teal-700 transition-colors duration-150"
                      >
                        <div className="font-medium">{child.title}</div>
                        <div className="text-xs text-gray-500 font-lao mt-1">
                          {child.titleLao}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
